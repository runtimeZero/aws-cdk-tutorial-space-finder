import { JSONError } from "./Validator";
import { v4 } from "uuid";
import { randomUUID } from "crypto";

export function parseJSON(arg: string) {

    try {
        return JSON.parse(arg);
    } catch (error) {
        throw new JSONError(error.message)
    }
    
}

export function createRandomId() {
    return randomUUID();
}