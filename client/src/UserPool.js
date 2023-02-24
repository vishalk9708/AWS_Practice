import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolDetails={
    UserPoolId:"xxxxxxxx",
    ClientId:"xxxxxxxxxx"
}


export default new CognitoUserPool(poolDetails);