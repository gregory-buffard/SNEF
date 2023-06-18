import mongoose, {Schema} from "mongoose";

const workerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    week: {
        type: Number,
        required: true
    },
    schedule: {
        type: [{
            name: String,
            codeNumber: String,
            days: [Number]
        }],
    },
    carDetails: {
        type: {
            origin: String,
            code: String,
        },
        default: {
            origin: "Non-definit",
            code: "Non-definit",
        }
    }
});

const Worker = mongoose.model('Worker', workerSchema);
export default Worker;