import crypto from 'crypto';
import { toUpper } from 'lodash';
import { WalletUserArgs, WalletSecurityArgs } from './Interfaces';

export class WalletHash {
  private sourceId: string;
  private secret: string;

  constructor(sourceId: string, secret: string) {
    this.sourceId = toUpper(sourceId);
    this.secret = secret;
  }

  public getSignature(users: Array<WalletUserArgs>, data: WalletSecurityArgs): string {
    const usersFirst = users[0].uuid;
    const productHashed = crypto.createHash('md5').update(this.sourceId).digest('hex');
    const productHashedEncoded = productHashed.toString();

    const usersFirstLength = usersFirst.length;
    const usersSerialized = `a:1:{i:0;s:${usersFirstLength}:"${usersFirst}";}`;
    const cashPayment = data.cashPayment ? 1 : null;

    const betslipSignatureParts = [
      productHashedEncoded,
      this.secret,
      usersSerialized,
      cashPayment,
      data.cashRegister,
      data.userUuid,
      data.thirdPartyToken,
    ];

    const signature = crypto.createHash('md5').update(betslipSignatureParts.join(''));
    const signatureEncoded = signature.digest('hex');

    return signatureEncoded;
  }
}
