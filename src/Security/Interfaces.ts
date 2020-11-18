import { Environment } from '../Common/Enums';

export interface AuthAccessKeyOptions {
  keyId: string;
  keySecret: string;
}

export interface AuthSapaHmacKeyOptions {
  secret: string;
}

export interface AuthBearerOptions {
  token: string;
}

export interface IamClientOptions {
  environment: Environment;
}
