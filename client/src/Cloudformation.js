const AWS = require('@aws-sdk/client-cloudformation')
const cloudformationTemplate=require('./ResouceStack.yaml')
var cloudformation = new AWS.CloudFormation({region:"ap-south-1"});

var params = {
  StackName: "Mynewstack", /* required */
  Parameters: [
    {
      ParameterKey: 'AuthName',
      ParameterValue: 'parag'
    }
  ],
  TemplateBody: cloudformationTemplate 
};
cloudformation.createStack(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});