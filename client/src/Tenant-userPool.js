import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolDetails={
    UserPoolId: "ap-south-1_uAyKrPGVw",
    ClientId: "5h0phmbjubhhpd0h79iougr77t"
}


export default new CognitoUserPool(poolDetails);