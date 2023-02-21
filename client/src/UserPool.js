import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolDetails={
    UserPoolId:"ap-northeast-1_QlyOmFMJv",
    ClientId:"7620bh338hnpdaff3m05n7f7gj"
}


export default new CognitoUserPool(poolDetails);