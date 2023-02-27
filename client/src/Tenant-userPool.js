import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolDetails={
    UserPoolId: process.env.AWS_tenant_userPoolID,
    ClientId: process.env.AWS_tenant_clientId
}


export default new CognitoUserPool(poolDetails);