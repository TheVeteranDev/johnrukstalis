import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

export class Services {
    static client = generateClient<Schema>();

    private constructor() {
    }
}