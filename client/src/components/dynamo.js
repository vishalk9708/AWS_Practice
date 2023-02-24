import { DynamoDBClient, BatchExecuteStatementCommand } from "@aws-sdk/client-dynamodb";

const email="v-parag.poddar@kfintech.com"
const firstName="parag"
const lastName="poddar"
const companyName="kfintech"
const imgUrl="ndsnd"
const config={
    region:'us-east-1',
    accessKeyId: 'AKIARG6P3RWPKXR3FWCW',
    secretAccessKey: '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',
}
const client = new DynamoDBClient(config);

const params = {
    TableName:"dynamoDB",
    Item:{
        email:email,
        firstName:firstName,
        lastName:lastName,
        companyName:companyName,
        imgUrl:imgUrl
    },
}