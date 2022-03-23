import express, { Response, Request } from "express";

import { COOKIE_KEY } from "../../config";
import { DataNotFoundError } from "../../errors/data-not-found-error";
import { FindFromPayload } from "../../models/classes/user.class";
import { RequireJWT } from "../../middlewares/jwt-handler";

const router = express.Router();

/**
 * Delete current User
 * 
 * @route /users
 * @method DELETE
 * @require JWT
 * @response { success: boolean! }
 */
router.delete(
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

    await dbUser.destroy();
    res.clearCookie(COOKIE_KEY);

    return res.status(200).json({ success: true });

  }
);

export { router as DeleteUserRouter };
