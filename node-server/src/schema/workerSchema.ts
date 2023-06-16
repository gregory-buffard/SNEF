import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    schedule: [{
            date: {
                type: Date,
                required: true,
                default: Date.now
            },
            workDone: [{
                    place: {
                        type: String,
                        required: true
                    },
                    hours: {
                        type: Number,
                        required: true
                    }
                }]
        }]
});

const Worker = mongoose.model('Worker', workerSchema);
export default Worker;