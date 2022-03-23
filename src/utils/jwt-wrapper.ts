import { sign, decode } from "jsonwebtoken";

/**
 * User data to include in JWT
 */
export interface UserPayload {
  id: string;
  email: string;
}

/**
 * Generates a JWT from a payload
 * 
 * @param payload Data to include in JWT
 * @returns JWT
 */
export const GenerateToken = (payload: UserPayload) => {
  return sign(payload, process.env.JWT_SECRET!, { expiresIn: process.env?.JWT_TIME || "1 minute" });
}

/**
 * Decode a JWT, fails if outdated or invalid
 * 
 * @param token JWT to decode
 * @returns Decoded data as UserPayload
 */
export const VerifyToken = (token: string) => {
  return decode(token);
}