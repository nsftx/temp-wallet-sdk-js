const { each, sortBy } = require('lodash');
const sdk = require('../dist').default;

(async () => {
  const reportAccessKey = new sdk.Reporting.Report({
    environment: 'production',
    authType: 'accessKey',
    authOptions: {
      keyId: 'keyId',
      keySecret: 'keySecret',
    },
  });

  const locationAccessKey = await reportAccessKey.getLocationSummary({
    tenantUuid: '1042c99a-d579-4bee-8c37-03cff3dd6af4',
    dateFrom: '2019-11-28T00:00:00.000000Z',
    dateTo: '2019-11-28T00:00:00.000000Z',
  });

  const reportSummary = [];
  if (locationAccessKey.details) {
    each(locationAccessKey.details.reports, (item) => {
      reportSummary.push({
        poslovnicaID: item.locationDisplayId,
        uplataIznos: item.summary.payment.toFixed(2),
        uplataKom: item.summary.ticketPaidInNumber,
        isplataIznos: item.summary.payout.toFixed(2),
        isplataKom: item.summary.ticketPaidOutNumber,
        stornoIznos: item.summary.cancelledAmount.toFixed(2),
        stornoKom: item.summary.ticketCancelledNumber,
      });
    });
  }

  const sortedReportSummary = sortBy(reportSummary, ['poslovnicaID']);
  
  console.log('LocationAccessKey', JSON.stringify(sortedReportSummary));
})();


