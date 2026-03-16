import {
  fetchWebsite,
  updateWebsite
} from "../../application/services/websiteService.js";

/*
GET WEBSITE
*/
export async function getWebsite(req, res, next) {
  try {

    const { id } = req.params;

    const website = await fetchWebsite(id);

    res.json(website);

  } catch (error) {
    next(error);
  }
}

/*
UPDATE WEBSITE
*/
export async function updateWebsiteController(req, res, next) {
  try {

    const { id } = req.params;

    const website = await updateWebsite(id, req.body);

    res.json(website);

  } catch (error) {
    next(error);
  }
}