import {
  fetchSummary,
  fetchTraffic,
  fetchTopPages,
  fetchTopEvents,
  fetchTopReferrers,
  fetchTopCountries
} from "../../application/services/analyticsService.js";

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

    const summary = await fetchSummary(trackingId);

    res.json(summary);

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

    const traffic = await fetchTraffic(trackingId);

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

    const pages = await fetchTopPages(trackingId);

    res.json(pages);

  } catch (error) {

    next(error);

  }

}

export async function getTopEvents(req, res, next) {

  try {

    const { trackingId } = req.query;

    if (!trackingId) {
      return res.status(400).json({
        message: "trackingId is required"
      });
    }

    const events = await fetchTopEvents(trackingId);

    res.json(events);

  } catch (error) {

    next(error);

  }

}


/*
GET /api/analytics/top-referrers
*/

export async function getTopReferrers(req, res, next) {

  try {

    const { trackingId } = req.query;

    if (!trackingId) {
      return res.status(400).json({
        message: "trackingId is required"
      });
    }

    const referrers = await fetchTopReferrers(trackingId);

    res.json(referrers);

  } catch (error) {

    next(error);

  }

}


/*
GET /api/analytics/top-countries
*/

export async function getTopCountries(req, res, next) {

  try {

    const { trackingId } = req.query;

    if (!trackingId) {
      return res.status(400).json({
        message: "trackingId is required"
      });
    }

    const countries = await fetchTopCountries(trackingId);

    res.json(countries);

  } catch (error) {

    next(error);

  }

}