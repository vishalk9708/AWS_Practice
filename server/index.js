'use strict';
global.fetch = require('node-fetch')
require('dotenv').config();
const Cognito = require('./cognito/index');

const body = {
    email: "v-parag.poddar@kfintech.com",
    password: "Parag123@"
};

async function Signup() {
    const response = await 
    Cognito.signUp(body.email,body.password);
    console.log(response);
}

async function Verify() {
    const response = await
    Cognito.verify(body.email,'654769');
    console.log(response);
}
async function SignIn() {
    const response = await Cognito.signIn(body.email,body.password);
    console.log(response);
}
// Signup();
// Verify();
SignIn();