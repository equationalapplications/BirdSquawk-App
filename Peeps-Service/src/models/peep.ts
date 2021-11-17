import { Schema, model } from "mongoose";


interface Peep {
    squawkId: string;
    peeps: [{ peep: string, peepId: string }];
}

const schema = new Schema<Peep>({
    squawkId: { type: String, required: true },
    peeps: [{ peep: String, peepId: String }]
});

const PeepModel = model<Peep>("Peep", schema);

export default PeepModel;