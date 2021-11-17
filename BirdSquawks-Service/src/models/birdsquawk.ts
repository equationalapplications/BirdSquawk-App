import { Schema, model } from "mongoose";

interface BirdSquawk {
    squawk: string;
    squawkId: string;
}

const schema = new Schema<BirdSquawk>({
    squawk: { type: String, required: true },
    squawkId: { type: String, required: true }
});

const BirdSquawkModel = model<BirdSquawk>("BirdSquawk", schema);

export default BirdSquawkModel;