import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpace } from "./UpdateSpace";
import { deleteSpace } from "./DeleteSpace";
import { MissingFieldError } from "../shared/Validator";



const ddbClient = new DynamoDBClient({})

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
 
 let message: string;
 
    try {
        switch (event.httpMethod) {

            case "GET":
                const getResponse = await getSpaces(event, ddbClient);
                return getResponse;
                break;
            case "POST":
                const postResponse = await postSpaces(event, ddbClient);
                return postResponse;
                break;
            case "PUT":
                const putResponse = await updateSpace(event, ddbClient);
                return putResponse;
                break;
            case "DELETE":
                const deleteResponse = await deleteSpace(event, ddbClient);
                return deleteResponse;
                break;
            default:
                break;

        }

    } catch (error) {
        if (error instanceof MissingFieldError) {
        return {
            statusCode: 400,
            body: JSON.stringify(error.message)
        }

        }
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }

    }

}

export {handler}