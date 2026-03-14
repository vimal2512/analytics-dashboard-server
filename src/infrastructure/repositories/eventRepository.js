import Event from "../../domain/models/Event.js";

/*
SUMMARY
*/

export async function getUniqueVisitors(trackingId) {

  return Event.distinct("visitorId", {
    trackingId
  });

}

export async function getPageViews(trackingId) {

  return Event.countDocuments({
    trackingId,
    event: "page_view"
  });

}

export async function getTotalEvents(trackingId) {

  return Event.countDocuments({
    trackingId
  });

}

/*
TRAFFIC (visitors per day)
*/

export async function getTraffic(trackingId) {

  return Event.aggregate([
    {
      $match: {
        trackingId
      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: { $toDate: "$timestamp" }
          }
        },
        visitors: {
          $addToSet: "$visitorId"
        },
        pageViews: {
          $sum: {
            $cond: [
              { $eq: ["$event", "page_view"] },
              1,
              0
            ]
          }
        }
      }
    },
    {
      $project: {
        day: "$_id",
        visitors: { $size: "$visitors" },
        pageViews: 1,
        _id: 0
      }
    },
    {
      $sort: { day: 1 }
    }
  ]);

}

/*
TOP PAGES
*/

export async function getTopPages(trackingId) {

  return Event.aggregate([
    {
      $match: {
        trackingId,
        event: "page_view"
      }
    },
    {
      $group: {
        _id: "$url",
        views: { $sum: 1 }
      }
    },
    {
      $project: {
        path: "$_id",
        views: 1,
        _id: 0
      }
    },
    {
      $sort: { views: -1 }
    },
    {
      $limit: 10
    }
  ]);

}

export async function getTopEvents(trackingId) {

  return Event.aggregate([
    {
      $match: {
        trackingId
      }
    },
    {
      $group: {
        _id: "$event",
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        event: "$_id",
        count: 1,
        _id: 0
      }
    },
    {
      $sort: {
        count: -1
      }
    },
    {
      $limit: 10
    }
  ]);

}


export async function getTopReferrers(trackingId) {

  return Event.aggregate([
    {
      $match: {
        trackingId,
        event: "page_view"
      }
    },
    {
      $project: {
        referrer: {
          $cond: [
            { $or: [
              { $eq: ["$referrer", ""] },
              { $eq: ["$referrer", null] }
            ]},
            "direct",
            "$referrer"
          ]
        }
      }
    },
    {
      $group: {
        _id: "$referrer",
        visits: { $sum: 1 }
      }
    },
    {
      $project: {
        source: "$_id",
        visits: 1,
        _id: 0
      }
    },
    {
      $sort: { visits: -1 }
    },
    {
      $limit: 10
    }
  ]);

}

export async function getTopCountries(trackingId) {

  return Event.aggregate([
    {
      $match: {
        trackingId,
        event: "page_view"
      }
    },
    {
      $group: {
        _id: "$country",
        visits: { $sum: 1 }
      }
    },
    {
      $project: {
        country: "$_id",
        visits: 1,
        _id: 0
      }
    },
    {
      $sort: { visits: -1 }
    },
    {
      $limit: 10
    }
  ]);

}

export async function createEvent(payload) {

  const event = new Event(payload);

  return event.save();

}