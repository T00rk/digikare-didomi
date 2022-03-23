import { createSimpleLogger, Logger } from "simple-node-logger";

class LogWrapper {
  private logger: Logger;

  constructor() {
    this.logger = createSimpleLogger({
      autoOpen: true,
      logFilePath: "./application.log",
      timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
    });
  }

  /**
   * Log a DEBUG message to file and console
   * 
   * @param args 
   */
  public LogDebug(...args: any[]) {
    this.logger.log("debug", JSON.stringify(args));
  }

  /**
   * Log an ERROR message to file and console
   * 
   * @param args 
   */
  public LogCustomError(arg: any) {
    this.logger.log("error", JSON.stringify(arg.serializeErrors()));
  }
  
  /**
   * Log a TRACE message to file and console
   * 
   * @param args 
   */
  public LogException(arg: any) {
    this.logger.log("trace", JSON.stringify({ Exception: arg.message }));
  }
  
  /**
   * Log a INFO message to file and console
   * 
   * @param args 
   */
  public LogInfo(...args: any[]) {
    this.logger.log("info", JSON.stringify(args));
  }
}

export const logWrapper = new LogWrapper();