import Event from "../../domain/models/Event.js";

/*
GET /api/analytics/summary
*/

export async function getSummary(req, res, next) {

  try {

    const { trackingId } = req.query;

    if (!trackingId) {
      return res.status(400).json({
        message: "trackingId is required"
      });
    }

    const visitors = await Event.distinct("visitorId", {
      trackingId
    });

    const pageViews = await Event.countDocuments({
      trackingId,
      event: "page_view"
    });

    const events = await Event.countDocuments({
      trackingId
    });

    res.json({
      visitors: visitors.length,
      pageViews,
      events
    });

  } catch (error) {

    next(error);

  }

}

/*
GET /api/analytics/traffic
*/

export async function getTraffic(req, res, next) {

  try {

    const { trackingId } = req.query;

    if (!trackingId) {
      return res.status(400).json({
        message: "trackingId is required"
      });
    }

    const traffic = await Event.aggregate([
      {
        $match: {
          trackingId,
          event: "page_view"
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

    res.json(traffic);

  } catch (error) {

    next(error);

  }

}

/*
GET /api/analytics/top-pages
*/

export async function getTopPages(req, res, next) {

  try {

    const { trackingId } = req.query;

    if (!trackingId) {
      return res.status(400).json({
        message: "trackingId is required"
      });
    }

    const pages = await Event.aggregate([
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

    res.json(pages);

  } catch (error) {

    next(error);

  }

}