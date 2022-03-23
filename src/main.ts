import { config } from "dotenv";

import { api } from "./api";
import { databaseWrapper } from "./utils/database-wrapper";
import { logWrapper } from "./utils/log-wrapper";

// Load env file
config();

/***
 * Start API
 */
export const start = async () => {

  try { 

    // Check JWT_SECRET key exists in env
    if(!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET KEY Missing !');
    }

    // Sync DB (create if not exists)
    await databaseWrapper.sync();

    // Launch api
    api.listen(3000, () => {
      logWrapper.LogInfo('Listening on port 3000 !');
    });

  } catch (ex) { 
    logWrapper.LogException(ex);
    process.exit();
  }
  
};

start();