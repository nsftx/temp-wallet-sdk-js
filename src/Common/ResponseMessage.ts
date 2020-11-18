import { defaultTo, isNil, isString } from 'lodash';

export class ResponseMessage {
  public code: number | string;

  public httpCode: number;

  public message: string | null;

  public details: any;

  constructor(input: any, httpCode: number, details?: any) {
    const detailsNullable = isNil(details) ? null : details;

    this.code = defaultTo(input.code, -1);
    this.httpCode = httpCode;
    this.message = isString(input.message) ? input.message : null;
    this.details = isNil(input.details) ? detailsNullable : input.details;
  }
}
