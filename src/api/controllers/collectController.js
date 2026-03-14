// import * as analyticsService from "../../application/services/analyticsService.js"


// export async function collectEvent(req, res, next) {

//     try{
       
//     const payload = req.body;

//     await analyticsService.collectEvent(payload);

//     res.status(201).json({
//         success: true
//     });

//     }catch (error) {
//         next(error);
//     }
    
// }

import * as analyticsService from "../../application/services/analyticsService.js";
import geoip from "geoip-lite";

const activeVisitors = new Map();

export async function collectEvent(req, res, next) {

  try {

    const payload = req.body;

    /*
    Extract real visitor IP
    */

    const ip = (
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      ""
    ).split(",")[0].trim();

    /*
    Convert IP → Country
    */

    const geo = geoip.lookup(ip);

    const country = geo ? geo.country : "Unknown";

    payload.country = country;

    /*
    Save event
    */

    await analyticsService.collectEvent(payload);

    /*
    Update live visitors
    */

    const now = Date.now();

    activeVisitors.set(payload.visitorId, now);

    /*
    Remove inactive visitors (30s timeout)
    */

    for (const [visitorId, lastSeen] of activeVisitors) {

      if (now - lastSeen > 30000) {
        activeVisitors.delete(visitorId);
      }

    }

    /*
    Emit live visitor count
    */

    if (global.io) {
      global.io.emit("liveVisitors", activeVisitors.size);
    }

    res.status(201).json({
      success: true
    });

  } catch (error) {

    next(error);

  }

}