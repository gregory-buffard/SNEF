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
            days: [Number]
        }],
    }
});

const Worker = mongoose.model('Worker', workerSchema);
export default Worker;