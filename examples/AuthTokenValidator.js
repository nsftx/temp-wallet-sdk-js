const sdk = require('../dist').default;

const iam = new sdk.Security.Iam({
  environment: 'production',
});

const validate = iam.validateToken('f0a2c9ff-cbf7-417e-b9ec-867c27bbe9ca', 'AccessKey xyz');

validate.then((validateResult) => {
  console.log(validateResult);
}).catch((validateError) => {
  console.log(validateError.response.data);
});
