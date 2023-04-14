import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    schedule: {
        type: [{
            date: {
                type: Date,
                required: true
            },
            workDone: {
                type: [{
                    place: {
                        type: String,
                        required: true
                    },
                    timeInMin: {
                        type: Number,
                        required: true
                    },
                    description: {
                        type: String,
                    }
                }]

            }
        }]
    }
});

const Worker = mongoose.model('Worker', workerSchema);
export default Worker;