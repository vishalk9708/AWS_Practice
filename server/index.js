'use strict';
global.fetch = require('node-fetch')
require('dotenv').config();
const Cognito = require('./cognito/index');
const { verify } = require('./cognito/index');
const body = {
    email: "onexlab.io@gmail.com",
    password: "Test123456!"
};

async function Signup() {
    const response = await Cognito.signUp(body.email,body.password);
    console.log(response);
}