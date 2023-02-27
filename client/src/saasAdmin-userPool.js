import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolDetails={
    UserPoolId: "ap-south-1_KuQ8zCxzT",
    ClientId: "268gcqdidacdvgjm5i0i26e44f"
}


export default new CognitoUserPool(poolDetails);