const mediumURL = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@";
const devURL = "https://dev.to/api/articles?username=";
const hashnodeURL = "https://api.hashnode.com/";

const axios = require("axios");

const getMediumData = async (username) => {
    try {
        const result = await axios.get(mediumURL + username);
        const filteredResult = result.data.items.filter(function (item) {
            if (
                !item.thumbnail.includes("stat?event") ||
                !item.thumbnail.includes("&referrerSource")
            ) {
                return true;
            } else {
                return false;
            }
        });
        return filteredResult;
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getDevData = async (username) => {
    try {
        const result = await axios.get(devURL + username);
        const filteredResult = result.data;
        return filteredResult;
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getHashnodeBlog = async (slug, hostname) => {
    try {
        const result = await axios.post(hashnodeURL, {
            query: `query{
        post(slug:"${slug}",hostname:"${hostname}") {
          author{
            username
            name
            photo
          }
          title
          coverImage
          totalReactions
          dateUpdated
          brief
        }
      }`,
        });
        const filteredResult = result.data;
        return filteredResult;
    } catch (error) {
        console.error(error);
        return error;
    }
};

module.exports = { getDevData, getMediumData, getHashnodeBlog };
