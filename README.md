![Publishing](https://github.com/nsftx/seven-sdk-js/workflows/Build%20and%20Publish%20Package/badge.svg?event=release)

# Seven SDK for JavaScript

The official Seven SDK for JavaScript, available for browsers (where applicable), or Node.js backends. Sources for implementation:

- [Wallet API](https://phabricator.nsoft.ba/w/platform/seven-aggregator/product-api/public-doc/)

## Installing

`npm install @nsoft/seven-sdk`

## Usage and Getting Started

Import modules required by your application:

```js
import sdk from '@nsoft/seven-sdk';
```

or using CommonJS:

```js
const sdk = require('@nsoft/seven-sdk').default;
```

Since we use `@babel/plugin-transform-runtime` it is required to use `@babel/runtime` with this library.

```sh
npm install --save @babel/runtime
```

Example of generating access key needed to access some APIs:

```js
const accessKey = new sdk.Security.AccessKey({
  keyId: '00000000-0000-0000-0000-000000000000',
  keySecret: 'abcdefghijklmnopqrst',
});
```

Example of generating betslip barcode:

```js
const betslip = new sdk.Betslip({
  barcodePrefix: 'XX',
  barcodeSalt: 'abcdef0000',
});

const barcode = betslip.getBarcode(1000);
```

## Wallet

To use wallet first create wallet instance:

```js
const wallet = new sdk.Wallets.Wallet({
  environment: 'production',
  dataCenter: 'ro',
  authOptions: {
    keyId: 'keyId',
    keySecret: 'keySecret',
  },
});
```

Then you can use wallet instance to call wallet actions. Debit action requires two parameters, debit payload and requests payload (required for debugging and auditing), for non cash payments:

```js
const debitResult = await wallet.debit(
  {
    // Debit payload
    requests: [{
      uuid: '08e9e088-6ee7-43de-a42f-3f1e59af10b8',
    }],
    paymentId: '00000000-0000-0000-0000-000000000001',
    amount: 10,
    bonusAmount: 0,
    sourceId: 'Roulette',
    refId: '8X1VTSH4D',
    md5Sig: 'md5Signature',
    ticket: {},
    money: {
      subtotal: 950,
      taxApplied: 50,
      total: 1000,
    },
  }, 
  {
    // Request payload
    locale: 'en',
    uuid: '064920e0-4f52-4348-8a70-0ce303f1ee47',
  },
);
```

For cash payments, third parameter is required:

```js
const debitResult = await wallet.debit(
  { // Debit payload ... }, 
  { // Request payload ... },
  {
    // Cash payload
    cashPayment: true,
    cashRegister: '08e9e088-6ee7-43de-a42f-3f1e59af10b8',
    userUuid: '485251bc-73ea-4d20-9903-d35d15044130',
    userUsername: 'buha',
  },
);
```

`md5Sig` property is provided by Betslip API. To generate it for testing purposes, `WalletHash` method can be used.

```js
const hash = new sdk.Wallets.WalletHash('Roulette', 'secret');
const md5Sig = hash.getSignature(requests, {
  cashPayment: true,
  cashRegister: '08e9e088-6ee7-43de-a42f-3f1e59af10b8',
  userUuid: '485251bc-73ea-4d20-9903-d35d15044130',
});
```

## Getting Help

Contact us at Slack channel `#team-seven`;

## Opening Issues

Please create detailed issue on [GitHub Issues](https://github.com/nsftx/seven-sdk-js/issues).

## License

This SDK is distributed under the Apache License, Version 2.0, see LICENSE for more information.
"# seven-sdk-js-temp" 
"# temp-wallet-sdk-js" 
