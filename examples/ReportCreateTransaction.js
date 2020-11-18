const sdk = require('../dist').default;

(async () => {
  const report = new sdk.Reporting.Report({
    environment: 'staging',
    authType: 'accessKey',
    authOptions: {
      keyId: 'keyId',
      keySecret: 'keySecret',
    },
  });

  const timestamp = Math.round(Date.now() / 1000);

  const result = await report.createTransaction({
    id: '81356926-ceb1-4ccf-bb9a-d12775b2cf84',
    tenantUuid: 'b99752b3-443c-4c80-b559-945a95c4b805',
    ticketId: 'noTicketId',
    barcode: 'noBarcode',
    type: 'Payin',
    amount: 100,
    tax: 0,
    realPercentage: 100,
    channel: 'Web',
    productId: 'BetGamesTv',
    timestamp,
    source: {
      playerId: 'a8fc00d8-452a-4d3a-997c-b8bace76601f',
    },
  });

  console.log('Result', result);
})();


