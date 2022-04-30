import { LoggerService as NestLoggerService, LogLevel } from '@nestjs/common';

export class LoggerService implements NestLoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    console.error(message, ...optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    console.warn(message, ...optionalParams);
  }
  debug?(message: any, ...optionalParams: any[]) {
    console.debug(message, ...optionalParams);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    console.info(message, ...optionalParams);
  }
  setLogLevels?(levels: LogLevel[]) {
    throw new Error('Method not implemented.');
  }
}
