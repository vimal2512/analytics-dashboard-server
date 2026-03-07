import * as eventRepository from "../../infrastructure/repositories/eventRepository.js"

export async function collectEvent(data) {
    const { trackingId, visitorId, event } = data;

    if(!trackingId || !visitorId || !event) {
        throw new Error("Invalid event payload")
    }

    return eventRepository.createEvent(data);
}


export async function getSummary(trackingId) {
    const visitors = await eventRepository.getUniqueVisitors(trackingId);

    const pageViews = await eventRepository.countEvents({
        trackingId,
        event: "page_view"
    });

    const events = await eventRepository.countEvents({
        trackingId
    });

    return {
        visitors: visitors.length,
        pageViews,
        events
    };
}