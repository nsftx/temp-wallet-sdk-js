const sdk = require('../dist').default;

const accessKey = new sdk.Security.AccessKey({
  keyId: '00000000-0000-0000-0000-000000000000',
  keySecret: 'abcdefghijklmnopqrst',
});

console.log(accessKey.getSignature());
