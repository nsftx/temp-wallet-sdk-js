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
    const debitConfirmResult = await wallet.confirm(
      {
        paymentId: '00000000-0000-0000-0000-000000000022',
      },
      {
        locale: 'en',
        uuid: '064920e0-4f52-4348-8a70-0ce303f1ee47',
      },
    );

    console.log(debitConfirmResult);
  } catch (error) {
    console.log(error);
  }
})();


