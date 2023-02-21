import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolDetails={
    UserPoolId:"us-east-1_mkd9e3LwT",
    ClientId:"5gsjrucm8bl1j27h350jmklcap"
}


export default new CognitoUserPool(poolDetails);