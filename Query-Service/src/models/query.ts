import { Schema, model } from "mongoose";


interface Query {
    squawk: string;
    squawkId: string;
    peeps: [{ peep: string, peepId: string }];
}

const schema = new Schema<Query>({
    squawk: { type: String, required: true },
    squawkId: { type: String, required: true },
    peeps: { type: [{ peep: String, peepId: String }], required: true }
});

const QueryModel = model<Query>("Query", schema);

export default QueryModel;