import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolDetails={
    UserPoolId:"ap-northeast-1_QlyOmFMJv",
    ClientId:"pi4fhsjlhomh0gflsss7cnlpk"
}


export default new CognitoUserPool(poolDetails);