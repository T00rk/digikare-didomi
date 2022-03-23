import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import asyncHandler from "express-async-handler";

import { CreateEventRouter } from "./routes/events/create-event";
import { CreateUserRouter } from "./routes/users/create-user";
import { DeleteUserRouter } from "./routes/users/delete-user";
import { ErrorHandler } from "./middlewares/error-handler";
import { GetUserRouter } from "./routes/users/get-user";
import { ParseJWT } from "./middlewares/jwt-handler";
import { RouteNotFoundError } from "./errors/route-not-found-error";

const api = express();

/* Middlewares */
api.use(json());
api.use(cookieParser());
api.use(ParseJWT);

/* Users Routes */
api.use(asyncHandler(CreateUserRouter));
api.use(asyncHandler(DeleteUserRouter));
api.use(asyncHandler(GetUserRouter));

/* Events Routes */
api.use(asyncHandler(CreateEventRouter));

/* Errors */
api.all("*", () => {
  throw new RouteNotFoundError();
});
api.use(ErrorHandler);

export { api };
