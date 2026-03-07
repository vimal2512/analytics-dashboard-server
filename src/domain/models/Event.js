import mongoose from "mongoose"

const eventSchema = new mongoose.Schema(
    {
        trackingId: {
            type: String,
            required: true,
            index: true
        },

        websiteId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Website"
        },

        visitorId: {
            type: String,
            required: true,
            index: true
        },

        event: {
            type:String,
            required: true,
            index: true
        },

        url: {
            type: String,
        },

        referrer: {
            type: String,
        },

        timestamp: {
            type: Number,
            required: true,
            index: true
        }
    },

    {
        timestamps: true
    }
)


// compound indexes

eventSchema.index({trackingId: 1, timestamp: -1});
eventSchema.index({trackingId: 1, event: 1});

const Event = mongoose.model("Event", eventSchema);

export default Event;