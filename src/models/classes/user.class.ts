import { User } from "../User";

/**
 * Finds a User in database from JWTPayload
 * 
 * @param id User Id
 * @param email User Email
 * @returns User or Null
 */
export const FindFromPayload = async(id: string, email: string): Promise<User | null> => {
  return User.findOne({ where: { id, email: email.toLowerCase().trim() } });
}