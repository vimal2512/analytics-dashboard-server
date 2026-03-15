// import Event from "../../domain/models/Event.js";

// /*
// SUMMARY
// */

// export async function getUniqueVisitors(trackingId) {

//   return Event.distinct("visitorId", {
//     trackingId
//   });

// }

// export async function getPageViews(trackingId, startTimeStamp) {

//   const filter = {
//     trackingId,
//     event: "page_view"
//   }

//   if(startTimeStamp) {
//     filter.timestamp = { $gte: startTimeStamp };
//   }
  
//    return Event.countDocuments(filter);
// }

// export async function getTotalEvents(trackingId) {

//   return Event.countDocuments({
//     trackingId
//   });

// }

// /*
// TRAFFIC (visitors per day)
// */

// export async function getTraffic(trackingId) {

//   return Event.aggregate([
//     {
//       $match: {
//         trackingId
//       }
//     },
//     {
//       $group: {
//         _id: {
//           $dateToString: {
//             format: "%Y-%m-%d",
//             date: { $toDate: "$timestamp" }
//           }
//         },
//         visitors: {
//           $addToSet: "$visitorId"
//         },
//         pageViews: {
//           $sum: {
//             $cond: [
//               { $eq: ["$event", "page_view"] },
//               1,
//               0
//             ]
//           }
//         }
//       }
//     },
//     {
//       $project: {
//         day: "$_id",
//         visitors: { $size: "$visitors" },
//         pageViews: 1,
//         _id: 0
//       }
//     },
//     {
//       $sort: { day: 1 }
//     }
//   ]);

// }

// /*
// TOP PAGES
// */

// export async function getTopPages(trackingId) {

//   return Event.aggregate([
//     {
//       $match: {
//         trackingId,
//         event: "page_view"
//       }
//     },
//     {
//       $group: {
//         _id: "$url",
//         views: { $sum: 1 }
//       }
//     },
//     {
//       $project: {
//         path: "$_id",
//         views: 1,
//         _id: 0
//       }
//     },
//     {
//       $sort: { views: -1 }
//     },
//     {
//       $limit: 10
//     }
//   ]);

// }

// export async function getTopEvents(trackingId) {

//   return Event.aggregate([
//     {
//       $match: {
//         trackingId
//       }
//     },
//     {
//       $group: {
//         _id: "$event",
//         count: { $sum: 1 }
//       }
//     },
//     {
//       $project: {
//         event: "$_id",
//         count: 1,
//         _id: 0
//       }
//     },
//     {
//       $sort: {
//         count: -1
//       }
//     },
//     {
//       $limit: 10
//     }
//   ]);

// }


// export async function getTopReferrers(trackingId) {

//   return Event.aggregate([
//     {
//       $match: {
//         trackingId,
//         event: "page_view"
//       }
//     },
//     {
//       $project: {
//         referrer: {
//           $cond: [
//             { $or: [
//               { $eq: ["$referrer", ""] },
//               { $eq: ["$referrer", null] }
//             ]},
//             "direct",
//             "$referrer"
//           ]
//         }
//       }
//     },
//     {
//       $group: {
//         _id: "$referrer",
//         visits: { $sum: 1 }
//       }
//     },
//     {
//       $project: {
//         source: "$_id",
//         visits: 1,
//         _id: 0
//       }
//     },
//     {
//       $sort: { visits: -1 }
//     },
//     {
//       $limit: 10
//     }
//   ]);

// }

// export async function getTopCountries(trackingId) {

//   return Event.aggregate([
//     {
//       $match: {
//         trackingId,
//         event: "page_view"
//       }
//     },
//     {
//       $group: {
//         _id: "$country",
//         visits: { $sum: 1 }
//       }
//     },
//     {
//       $project: {
//         country: "$_id",
//         visits: 1,
//         _id: 0
//       }
//     },
//     {
//       $sort: { visits: -1 }
//     },
//     {
//       $limit: 10
//     }
//   ]);

// }

// export async function createEvent(payload) {

//   const event = new Event(payload);

//   return event.save();

// }

// export async function getUniqueSessions(trackingId) {

//   return Event.distinct("sessionId", {
//     trackingId,
//     sessionId: { $exists: true }
//   });

// }

import Event from "../../domain/models/Event.js";

/*
CREATE EVENT
*/

export async function createEvent(payload) {

  return Event.create(payload);

}

/*
UNIQUE VISITORS
*/

export async function getUniqueVisitors(trackingId, startTimestamp) {

  const filter = {
    trackingId
  };

  if (startTimestamp) {
    filter.timestamp = { $gte: startTimestamp };
  }

  return Event.distinct("visitorId", filter);

}

/*
UNIQUE SESSIONS
*/

export async function getUniqueSessions(trackingId, startTimestamp) {

  const filter = {
    trackingId
  };

  if (startTimestamp) {
    filter.timestamp = { $gte: startTimestamp };
  }

  return Event.distinct("sessionId", filter);

}

/*
PAGE VIEWS
*/

export async function getPageViews(trackingId, startTimestamp) {

  const filter = {
    trackingId,
    event: "page_view"
  };

  if (startTimestamp) {
    filter.timestamp = { $gte: startTimestamp };
  }

  return Event.countDocuments(filter);

}

/*
TOTAL EVENTS
*/

export async function getTotalEvents(trackingId, startTimestamp) {

  const filter = {
    trackingId
  };

  if (startTimestamp) {
    filter.timestamp = { $gte: startTimestamp };
  }

  return Event.countDocuments(filter);

}

/*
TRAFFIC (Visitors per day)
*/

export async function getTraffic(trackingId, startTimestamp) {

  const match = {
    trackingId,
    event: "page_view"
  };

  if (startTimestamp) {
    match.timestamp = { $gte: startTimestamp };
  }

  return Event.aggregate([
    {
      $match: match
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
        }
      }
    },
    {
      $project: {
        day: "$_id",
        visitors: { $size: "$visitors" },
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

export async function getTopPages(trackingId, startTimestamp) {

  const match = {
    trackingId,
    event: "page_view"
  };

  if (startTimestamp) {
    match.timestamp = { $gte: startTimestamp };
  }

  return Event.aggregate([
    {
      $match: match
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

/*
TOP EVENTS
*/

export async function getTopEvents(trackingId, startTimestamp) {

  const match = {
    trackingId
  };

  if (startTimestamp) {
    match.timestamp = { $gte: startTimestamp };
  }

  return Event.aggregate([
    {
      $match: match
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
      $sort: { count: -1 }
    }
  ]);

}

/*
TOP REFERRERS
*/

export async function getTopReferrers(trackingId, startTimestamp) {

  const match = {
    trackingId,
    referrer: { $nin: ["", null] }
  };

  if (startTimestamp) {
    match.timestamp = { $gte: startTimestamp };
  }

  return Event.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$referrer",
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        referrer: "$_id",
        count: 1,
        _id: 0
      }
    },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);

}


// get top countries

export async function getTopCountries(trackingId, startTimestamp) {

  const match = {
    trackingId,
    country: { $nin: ["", null] }
  };

  if (startTimestamp) {
    match.timestamp = { $gte: startTimestamp };
  }

  return Event.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$country",
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        country: "$_id",
        count: 1,
        _id: 0
      }
    },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);

}