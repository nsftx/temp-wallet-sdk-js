const sdk = require('../dist').default;

const betslip = new sdk.Betslip({
  barcodePrefix: 'XX',
  barcodeSalt: 'abcdef0000',
});

console.log(betslip.getBarcode(1000));
