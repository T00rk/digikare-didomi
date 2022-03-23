import express, { Request, Response } from "express";
import Joi from "joi";

import { EVENTS_IDS } from "./../../config";
import { DataNotFoundError } from "../../errors/data-not-found-error";
import { Event } from "../../models/Event";
import { FindFromPayload } from "../../models/classes/user.class";
import { FindFromUser } from "../../models/classes/event.class";
import { RequireJWT } from "../../middlewares/jwt-handler";
import { UnprocessableEntityError } from "../../errors/unprocessable-entity-error";
import { validateBody } from "../../middlewares/request-validator";

const router = express.Router();

const bodySchema = Joi.object({
  id: Joi.string().valid(EVENTS_IDS[0], EVENTS_IDS[1]).required(),
  enabled: Joi.boolean().required()
});

/**
 * Create Event
 * 
 * @route /events
 * @method POST
 * @response { success: boolean! }
 */
router.post(
  '/events',
  RequireJWT,
  validateBody(bodySchema, 422),
  async (req: Request, res: Response) => {
    
    const { id: userId, email } = req.jwtPayload!;
    const { id, enabled } = req.body;

    // Find current User from JWT Payload
    const dbUser = await FindFromPayload(userId, email);
    if(!dbUser) {
      throw new DataNotFoundError();
    }

    // Create a new Event in Database
    const newEvent = Event.build({ id, enabled, userId: dbUser.id });
    
    try {      
      await newEvent.save();
    }
    catch(ex) { 
      // Error processing Event, throw new Unprocessable Entity Error (422)
      throw new UnprocessableEntityError();
    }

    // Get User consents
    const consents = await FindFromUser(dbUser.id);

    return res.status(200).json({ id: userId, consents });

  }
);

export { router as CreateEventRouter };
