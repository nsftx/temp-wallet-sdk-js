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
    const balanceResult = await wallet.getBalance('a8fc00d8-452a-4d3a-997c-b8bace76601f',
      {
        locale: 'en',
        uuid: '064920e0-4f52-4348-8a70-0ce303f1ee47',
      },
    );

    console.log(balanceResult);
  } catch (error) {
    console.log(error);
  }
})();


