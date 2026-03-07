import Event from "../../domain/models/Event.js";

export const trackEvent = async (req, res) => {
  try {

    const { trackingId, visitorId, event, url, referrer, timestamp } = req.body;

    const newEvent = await Event.create({
      trackingId,
      visitorId,
      event,
      url,
      referrer,
      timestamp: timestamp || Date.now()
    });

    res.status(201).json({
      message: "Event tracked",
      eventId: newEvent._id
    });

  } catch (error) {
    console.error("Tracking error:", error);
    res.status(500).json({ message: "Failed to track event" , error: error.message});
  }
};