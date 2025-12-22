import { Schema, model, Document } from "mongoose";

export interface ITodo extends Document {
    title: string;
    completed: boolean;
}

const todosSchema = new Schema<ITodo>(
    {
        title: {
            type: String,
            require: true
        },
        completed: {
            type: Boolean,
            default: false
        }

    }, {
    timestamps: true
}
);
export default model<ITodo>('Todo', todosSchema)