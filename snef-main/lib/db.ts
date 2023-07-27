import mongoose, {ConnectOptions} from 'mongoose';
async function dbConnect() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    const url = process.env.MONGODB_URI as string;
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions);
}
export default dbConnect;
