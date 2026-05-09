import * as dotenv from 'dotenv';

dotenv.config();

export interface Config {
  instanceUrl: string;
  username: string;
  password: string;
  port: number;
  logLevel: string;
}

export function getConfig(): Config {
  return {
    instanceUrl: process.env.SERVICENOW_INSTANCE_URL || 'https://dev12345.service-now.com',
    username: process.env.SERVICENOW_USERNAME || 'admin',
    password: process.env.SERVICENOW_PASSWORD || 'admin',
    port: parseInt(process.env.PORT || '3000'),
    logLevel: process.env.LOG_LEVEL || 'info',
  };
}
