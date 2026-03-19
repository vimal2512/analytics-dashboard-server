import * as websiteRepository from "../../infrastructure/repositories/websiteRepository.js";

/*
CREATE WEBSITE
*/
export async function createWebsite(data) {

  return websiteRepository.createWebsite(data);

}

/*
GET ALL WEBSITES
*/
export async function fetchWebsites(userId) {

  return websiteRepository.getWebsites(userId);

}

export async function fetchWebsiteByTrackingId(trackingId) {
  return websiteRepository.getWebsiteByTrackingId(trackingId);
}

/*
GET SINGLE WEBSITE
*/
export async function fetchWebsite(id) {

  return websiteRepository.getWebsiteById(id);

}

/*
UPDATE WEBSITE
*/
export async function updateWebsite(id, data) {

  return websiteRepository.updateWebsite(id, data);

}

/*
DELETE WEBSITE
*/
export async function removeWebsite(id) {

  return websiteRepository.deleteWebsite(id);

}