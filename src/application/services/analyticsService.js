import {
  getUniqueVisitors,
  getPageViews,
  getTotalEvents,
  getTraffic,
  getTopPages,
  getTopEvents,
  getTopReferrers,
  getTopCountries,
} from "../../infrastructure/repositories/eventRepository.js";

import * as eventRepository from "../../infrastructure/repositories/eventRepository.js";

/*
SUMMARY
*/

export async function fetchSummary(trackingId) {

  const visitors = await getUniqueVisitors(trackingId);

  const sessions = await Event.distinct("sessionId", {
    trackingId
  });

  const pageViews = await getPageViews(trackingId);

  const events = await getTotalEvents(trackingId);

  return {
    visitors: visitors.length,
    sessions: sessions.length,
    pageViews,
    events
  };

}

/*
TRAFFIC
*/

export async function fetchTraffic(trackingId) {

  return getTraffic(trackingId);

}

/*
TOP PAGES
*/

export async function fetchTopPages(trackingId) {

  return getTopPages(trackingId);

}

export async function fetchTopEvents(trackingId) {

  return getTopEvents(trackingId);

}

// TOP REFERRERS

export async function fetchTopReferrers(trackingId) {

  return getTopReferrers(trackingId);

}

// Top Countries

export async function fetchTopCountries(trackingId) {

  return getTopCountries(trackingId);

}


export async function collectEvent(payload) {

  return eventRepository.createEvent(payload);

}