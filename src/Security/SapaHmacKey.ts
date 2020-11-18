import crypto from 'crypto';
import { isNil } from 'lodash';
import { AuthAccessKeyOptions } from '../Security/Interfaces';
import { RequestHeader } from '../Common/Interfaces';
import { DateTimeUtil } from '../Utility';

export class SapaHmacKey {
  private options: AuthAccessKeyOptions;

  private signaturePrefix: string;

  constructor(options: AuthAccessKeyOptions) {
    this.options = options;
    this.signaturePrefix = 'SAPA-HMAC-SHA256';
  }

  public getSignature(requestUuid: string, timestamp: number): string {
    const signatureTimestamp = isNil(timestamp) ? DateTimeUtil.getUnixTimestamp() : timestamp;
    const signatureInputParts = [requestUuid, signatureTimestamp, this.options.keyId];
    const signatureInput = signatureInputParts.join('|').trim();
    const signatureHash = crypto.createHmac('sha256', this.options.keySecret).update(signatureInput);
    const signatureHashHex = signatureHash.digest('base64');
    const signatureHashEncoded = Buffer.from(`${this.options.keyId}:${signatureHashHex}`).toString('base64');
    const signatureParts = [this.signaturePrefix, signatureHashEncoded];
    const signature = signatureParts.join(' ').trim();

    return signature;
  }

  public getRequestHeader(requestUuid: string, timestamp: number): RequestHeader {
    return {
      key: 'Authorization',
      value: this.getSignature(requestUuid, timestamp),
    };
  }
}
