import {
  getUniqueVisitors,
  getPageViews,
  getTotalEvents,
  getTraffic,
  getTopPages,
  getTopEvents,
  getTopReferrers,
  getTopCountries,
  getSessionAnalytics
} from "../../infrastructure/repositories/eventRepository.js";

import * as eventRepository from "../../infrastructure/repositories/eventRepository.js";

/*
SUMMARY
*/

export async function fetchSummary(trackingId, days) {

  let startTimestamp = null;

  if(days) {
    startTimestamp = Date.now() - (Number(days) * 24 * 60 * 60 * 1000);
  }

  const visitors = await getUniqueVisitors(trackingId, startTimestamp);

  const sessions = await eventRepository.getUniqueSessions(trackingId, startTimestamp);

  const pageViews = await getPageViews(trackingId, startTimestamp);

  const events = await getTotalEvents(trackingId, startTimestamp);

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

// session analytics

export async function fetchSessionAnalytics(trackingId, days) {

  let startTimestamp = null;

  if (days) {
    startTimestamp = Date.now() - (Number(days) * 24 * 60 * 60 * 1000);
  }

  return getSessionAnalytics(trackingId, startTimestamp);

}