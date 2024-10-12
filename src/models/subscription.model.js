import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema({
    subscriber:{ // One who is subscribing
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    channel:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true,
})

export const Subscription = mongoose.model("Subscription", subscriptionSchema) 