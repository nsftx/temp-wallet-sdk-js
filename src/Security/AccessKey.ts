import crypto from 'crypto';
import { isNil } from 'lodash';
import { AuthAccessKeyOptions } from '../Security/Interfaces';
import { RequestHeader } from '../Common/Interfaces';

export class AccessKey {
  private options: AuthAccessKeyOptions;

  private signaturePrefix: string;

  constructor(options: AuthAccessKeyOptions) {
    this.options = options;
    this.signaturePrefix = 'AccessKey';
  }

  /*
  Timestamp parameter should be used for testing purposes only.
  Since timestamp is part of the encoded signature, we need this to be fixed for test.
  */
  public getSignature(timestamp?: number): string {
    const signatureTimestamp = isNil(timestamp) ? Math.round((new Date()).getTime() / 1000).toString() : timestamp;
    const signatureInputParts = [this.signaturePrefix, this.options.keyId, signatureTimestamp];
    const signatureInput = signatureInputParts.join(' ').trim();
    const signatureHash = crypto.createHmac('sha256', this.options.keySecret).update(signatureInput);
    const signatureHashHex = signatureHash.digest('hex');
    const signatureHashEncoded = Buffer.from(signatureHashHex).toString('base64');
    const signatureParts = [this.signaturePrefix, this.options.keyId, signatureTimestamp, signatureHashEncoded];
    const signature = signatureParts.join(' ').trim();

    return signature;
  }

  public getRequestHeader(timestamp?: number): RequestHeader {
    return {
      key: 'Authorization',
      value: this.getSignature(timestamp),
    };
  }
}
