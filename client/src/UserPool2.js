import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolDetails={
    UserPoolId:"ap-south-1_8XLvGtyzw",
    ClientId:"7o9ap1t9pjfvruerj6os589lps"
}


export default new CognitoUserPool(poolDetails);