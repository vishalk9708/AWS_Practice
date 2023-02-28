import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolDetails={
    UserPoolId: "ap-south-1_4hqAynKkX",
    ClientId: "1lj4kvnkr5n70egeed6a7qaq40"
}


export default new CognitoUserPool(poolDetails);