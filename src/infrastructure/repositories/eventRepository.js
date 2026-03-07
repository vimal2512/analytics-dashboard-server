import Event from "../../domain/models/Event.js";

export async function createEvent(data) {
    return Event.create(data);
} 


export async function countEvents(filter) {
    return Event.countDocuments(filter);
}

export async function getUniqueVisitors(trackingId) {
    return Event.distinct("visitorId", { trackingId });
}