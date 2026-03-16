import Website from "../../domain/models/Website.js";

/*
CREATE WEBSITE
*/
export async function createWebsite(data) {

  const trackingId =
    "trk_" + Math.random().toString(36).substring(2, 12);

  return Website.create({
    ...data,
    trackingId
  });

}

/*
GET ALL WEBSITES
*/
export async function getWebsites() {

  return Website.find();

}

/*
GET WEBSITE BY ID
*/
export async function getWebsiteById(id) {

  return Website.findById(id);

}

/*
UPDATE WEBSITE
*/
export async function updateWebsite(id, data) {

  return Website.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

}

/*
DELETE WEBSITE
*/
export async function deleteWebsite(id) {

  return Website.findByIdAndDelete(id);

}