const qs = require('qs');

console.log(qs.stringify({
  date_from: '2019-08-01',
  date_to: '2019-08-15',
  products: ['Roulette', 'LuckySix'],
  channels: ['Web'],
}, { arrayFormat: 'brackets', encodeValuesOnly: true }));
