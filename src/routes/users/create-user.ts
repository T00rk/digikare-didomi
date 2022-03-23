import express, { Request, Response } from "express";
import joi from "joi";

import { COOKIE_KEY } from "../../config";
import { GenerateToken } from "./../../utils/jwt-wrapper";
import { User } from "../../models/User";
import { UnprocessableEntityError } from "../../errors/unprocessable-entity-error";
import { FindFromUser } from "../../models/classes/event.class";
import { validateBody } from "../../middlewares/request-validator";

const router = express.Router();

const bodySchema = joi.object({
  email: joi.string().email().required()
});

/**
 * Login User and set JWT
 * 
 * @route /users
 * @method POST
 * @require JWT
 * @body { lastName: string!, firstName: string!, email: string!, password: string! }
 * @response { success: boolean! }
 */
router.post(
  '/users',
  validateBody(bodySchema, 422),
  async (req: Request, res: Response) => {

    const { email } = req.body;

    // Create a new User in Database
    const newUser = User.build({ email });
    
    try {      
      await newUser.save();

      // Generates a JWT and set cookie
      const token = GenerateToken({ id: newUser.id, email: newUser.email });
      res.cookie(COOKIE_KEY, token);
    }
    catch(ex) { 
      // User already exists, throw new Unprocessable Entity Error (422)
      throw new UnprocessableEntityError();
    }

    // Get User consents
    const consents = await FindFromUser(newUser.id);

    return res.status(200).json({ id: newUser.id, email: newUser.email, consents });

  }
);

export { router as CreateUserRouter };
