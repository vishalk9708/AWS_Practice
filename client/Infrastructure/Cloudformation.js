const AWS = require('@aws-sdk/client-cloudformation')
const cloudformationTemplate=require('./ResouceStack.yaml')
var cloudformation = new AWS.CloudFormation({region:"ap-south-1",credentials:{ accessKeyId:"AKIA3S5XP67EYKCKIQNJ", secretAccessKey:"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"}});

var params = {
  StackName: "Mynewstack", /* required */
  Parameters: [
    {
      ParameterKey: 'AuthName',
      ParameterValue: 'AxisMF'
    }
  ],
  TemplateBody: cloudformationTemplate 
};
cloudformation.createStack(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});