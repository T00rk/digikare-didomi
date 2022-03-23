import { QueryTypes } from "sequelize";

import { databaseWrapper } from "../../utils/database-wrapper";
import { logWrapper } from "../../utils/log-wrapper";

/**
 * Finds a Events in database from UserId
 * 
 * @param userId Id of the user 
 * @returns Array of Events
 */
export const FindFromUser = async(userId: string): Promise<any[]> => {

  let _RESULT: any[] = [];
  
  try {
    const dbConsents = await databaseWrapper.query(`
      SELECT 
        DISTINCT(id), enabled, MAX(createdAt) as createdAt
      FROM 
        Events 
      WHERE 
        userId = '${userId}'
      GROUP BY
        id
      ORDER BY
        id
    `, { type: QueryTypes.SELECT, logging: false });

    _RESULT = dbConsents;
  } catch(ex) { 
    logWrapper.LogException(ex); 
  }
  
  return _RESULT;
}  