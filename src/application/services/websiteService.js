import * as websiteRepository from "../../infrastructure/repositories/websiteRepository.js";

/*
GET WEBSITE
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