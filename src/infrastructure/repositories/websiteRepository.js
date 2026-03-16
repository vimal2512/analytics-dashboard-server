import Website from "../../domain/models/Website.js";

/*
GET WEBSITE BY ID
*/

export const getWebsiteById = (id) => {

  return Website.findById(id);

};

/*
UPDATE WEBSITE
*/

export const updateWebsite = (id, data) => {

  return Website.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

};