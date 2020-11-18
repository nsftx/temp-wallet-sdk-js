import { defaultTo, isNil, isString } from 'lodash';

export class ResponseErrorMessage {
  public code: number;

  public httpCode: number;

  public message: string;

  public details: any;

  constructor(input: any) {
    this.httpCode = input.status;

    if (input.data) {
      this.code = input.data.code;
      this.message = isString(input.data.message) ? input.data.message : defaultTo(input.data.msg, input.statusText);
      this.details = isNil(input.data.details) ? null : input.data.details;
    } else {
      this.code = -1;
      this.message = input.statusText;
      this.details = null;
    }
  }
}
