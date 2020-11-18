const sdk = require('../dist').default;

(async () => {
  const reportAccessKey = new sdk.Reporting.Report({
    environment: 'production',
    authType: 'accessKey',
    authOptions: {
      keyId: 'abc',
      keySecret: 'xyz',
    },
  });

  const productsAccessKey = await reportAccessKey.getProducts({
    tenantUuid: '1d9a58ae-9a22-4ed5-b5d2-4e9eb6664240',
    dateFrom: '2019-08-01',
    dateTo: '2019-08-31',
  });

  console.log('ReportAccessKey', productsAccessKey);

  const reportBearer = new sdk.Reporting.Report({
    environment: 'production',
    authType: 'bearer',
    authOptions: {
      token: 'Bearer xyz',
    },
  });

  const productsBearer = await reportBearer.getProducts({
    tenantUuid: '1d9a58ae-9a22-4ed5-b5d2-4e9eb6664240',
    dateFrom: '2019-08-01',
    dateTo: '2019-08-31',
    products: ['Roulette', 'LuckySix'],
    channels: ['Retail'],
  });

  console.log('ReportBearer', productsBearer);
})();


