import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 } from 'uuid';
import { marshall } from "@aws-sdk/util-dynamodb";
import { validateAsSpaceEntry } from '../shared/Validator';
import { createRandomId, parseJSON } from '../shared/Utils';

export async function postSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
  
    const randomId = createRandomId();
    const item = parseJSON(event.body)    
    const itemToPut = {
        id: randomId,
        ...item
    };
    validateAsSpaceEntry(itemToPut);

    const result = await ddbClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: marshall(itemToPut)
    }))
    console.log(result);

    return {
        statusCode: 201,
        body: JSON.stringify({id: randomId})
    }
}