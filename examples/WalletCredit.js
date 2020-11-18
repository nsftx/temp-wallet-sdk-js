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
    const requests = [{
      uuid: '08e9e088-6ee7-43de-a42f-3f1e59af10b8',
    }];
    
    const creditResults = await wallet.credit(
      {
        requests: requests,
        paymentId: '00000000-0000-0000-0000-000000000001',
        amount: 10,
        bonusAmount: 0,
        sourceId: 'Roulette',
        refId: '8X1VTSH4D',
        ticket: {},
        money: {
          subtotal: 950,
          taxApplied: 50,
          total: 1000,
        },
      },
      {
        locale: 'en',
        uuid: '064920e0-4f52-4348-8a70-0ce303f1ee47',
      },
    );

    console.log(creditResults);
  } catch (error) {
    console.log(error);
  }
})();


