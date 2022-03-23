import express, { Response, Request } from "express";

import { DataNotFoundError } from "../../errors/data-not-found-error";
import { FindFromPayload } from "../../models/classes/user.class";
import { FindFromUser } from "../../models/classes/event.class";
import { RequireJWT } from "../../middlewares/jwt-handler";

const router = express.Router();

/**
 * Get current User data
 * 
 * @route /users
 * @method GET
 * @require JWT
 * @response { id: string!, email: string!, consents: Array({ id: string!, enabled: boolean! })? }
 */
router.get(
  '/users',
  RequireJWT,
  async (req: Request, res: Response) => {
    
    const { id, email } = req.jwtPayload!;

    // Find current User from JWTPayload
    const dbUser = await FindFromPayload(id, email);
    if(!dbUser) {
      // User not found, throw new Data Not Found Error (404)
      throw new DataNotFoundError();
    }

    // Get all consents from User
    const consents = await FindFromUser(dbUser.id);

    return res.status(200).json({ id, email, consents });

  }
);

export { router as GetUserRouter };
