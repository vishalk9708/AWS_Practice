import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolDetails={
    UserPoolId:"",
    ClientId:""
}


export default new CognitoUserPool(poolDetails);