import { Schema, model, Document } from "mongoose";

export interface INotes extends Document {
    title: string;
    content: string;
    category?: string;
    completed: boolean;
}

const notesSchema = new Schema<INotes>(
    {
        title: {
            type: String,
            require: true
        },
        content: {
            type: String,
            require: true
        },
        category: {
            type: String
        },
        completed: {
            type: Boolean,
            default: false
        }

    }, {
    timestamps: true
}
);
export default model<INotes>('Note', notesSchema)