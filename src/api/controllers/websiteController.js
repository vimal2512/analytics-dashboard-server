import {
  createWebsite,
  fetchWebsites,
  fetchWebsite,
  updateWebsite,
  removeWebsite
} from "../../application/services/websiteService.js";



/*
CREATE WEBSITE
*/
export async function createWebsiteController(req, res, next) {
  try {

    const { domain } = req.body;

    const userId = req.user.userId;

    if (!domain) {
      return res.status(400).json({
        message: "domain is required"
      });
    }

    const website = await createWebsite({
      domain,
      userId: userId
    });

    res.status(201).json(website);

  } catch (error) {
    next(error);
  }
}

/*
GET ALL WEBSITES (FILTERED)
*/

export async function getWebsites(req, res, next) {
  try {

    const userId = req.user.userId;

    const websites = await fetchWebsites(userId);

    res.json(websites);

  } catch (error) {
    next(error);
  }
}


/*
DELETE WEBSITE
*/
export async function deleteWebsite(req, res, next) {
  try {

    const { id } = req.params;

    await removeWebsite(id);

    res.json({
      success: true
    });

  } catch (error) {
    next(error);
  }
}

/*
GET SINGLE WEBSITE
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