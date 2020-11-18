import { SapaHmacKey } from './SapaHmacKey';

describe('SapaHmacKey', () => {
  it('should be instanceable', () => {
    const accessKey = new SapaHmacKey({
      keyId: 'keyId',
      keySecret: 'keySecret',
    });

    expect(accessKey).toBeInstanceOf(SapaHmacKey);
  });

  it('should produce valid signature', () => {
    const accessKey = new SapaHmacKey({
      keyId: '00000000-0000-0000-0000-000000000000',
      keySecret: 'abcdefghijklmnopqrst',
    });

    /* eslint-disable-next-line */
    const signatureTarget = 'SAPA-HMAC-SHA256 MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwOmpLaWgrai9STUNSY1JSY2lpUDVhUEE2NUV6dVY0RHp3c0x3elNubkFBQWM9';
    const signatureTimestamp = 1500000000;
    const signatureRequestUuid = '00000000-0000-0000-0000-000000000001';
    const signature = accessKey.getSignature(signatureRequestUuid, signatureTimestamp);

    expect(signature).toEqual(signatureTarget);
  });
});
