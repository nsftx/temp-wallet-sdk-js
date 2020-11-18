const sdk = require('../dist').default;

(async () => {
  const wallet = new sdk.Wallets.Wallet({
    environment: 'staging',
    authOptions: {
      keyId: 'keyId',
      keySecret: 'keySecret',
    },
  });

  try {
    const debitResult = await wallet.getPayment('3f06ab2f-5999-4fe3-9a10-eefdd593f43c', {
      locale: 'en',
      uuid: '164920e0-4f52-4348-8a70-0ce303f1ee41',
    },
    );

    console.log(debitResult);
  } catch (error) {
    console.log(error);
  }
})();


