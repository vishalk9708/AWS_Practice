import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolDetails={
    UserPoolId: process.env.AWS_saasAdmin_userPoolID,
    ClientId: process.env.AWS_saasAdmin_clientId
}


export default new CognitoUserPool(poolDetails);