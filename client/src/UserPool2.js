import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolDetails={
    UserPoolId:"xxxxxxx",
    ClientId:"xxxxxxxx"
}


export default new CognitoUserPool(poolDetails);