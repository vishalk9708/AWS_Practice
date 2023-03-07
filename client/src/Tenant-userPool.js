import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolDetails={
    UserPoolId: "ap-south-1_6NACRTmIM",
    ClientId: "4l0o04q36r384l066bgll9bk0n"
}


export default new CognitoUserPool(poolDetails);