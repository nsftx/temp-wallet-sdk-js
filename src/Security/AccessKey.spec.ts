import { AccessKey } from './AccessKey';

describe('AccessKey', () => {
  it('should be instanceable', () => {
    const accessKey = new AccessKey({
      keyId: 'keyId',
      keySecret: 'keySecret',
    });

    expect(accessKey).toBeInstanceOf(AccessKey);
  });

  it('should produce valid signature', () => {
    const accessKey = new AccessKey({
      keyId: '00000000-0000-0000-0000-000000000000',
      keySecret: 'abcdefghijklmnopqrst',
    });

    /* eslint-disable-next-line */
    const signatureTarget = 'AccessKey 00000000-0000-0000-0000-000000000000 1500000000 ZmU0ZTg3NWQ3YWQ4ZDk5NGI2ZTExZjdkYjc5YmFmNmQ0MzgyODdkYzA0NzI3YTQ1ZGZjODcyNGQxNTI3ZmJjMQ==';
    const signatureTimestamp = 1500000000;
    const signature = accessKey.getSignature(signatureTimestamp);

    expect(signature).toEqual(signatureTarget);
  });
});
