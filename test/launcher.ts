import { handler } from "../src/services/spaces/handler";

handler({
    httpMethod: 'POST',
    // queryStringParameters: {
    //     id: 'b0f38bd2-da8d-48f1-9f4b-26ccba66e08b'
    // },
    body: JSON.stringify({
        location: 'Denver'
    }) 
} as any, {} as any);