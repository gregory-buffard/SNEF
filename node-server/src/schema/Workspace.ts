import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    codeNumber: { type: String, required: true },
    days: { type: [Number], required: true }
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;