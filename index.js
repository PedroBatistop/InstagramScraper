"use-strict";
const axios = require("axios");

const querystring = (object) =>
  Object.keys(object)
    .map((key) => `${key}=${object[key]}`)
    .join("&");

function bestQuality(post) {
  let bestQualityPost = [];
  if (post.items[0].media_type == 8) {
    for (let media of post.items[0].carousel_media) {
      let pushPost = {};
      if (media.media_type == 2) {
        pushPost["type"] = "video";
        pushPost["url"] = media.video_versions[0].url;
      } else if (media.media_type == 1) {
        pushPost["type"] = "image";
        pushPost["url"] = media.image_versions2.candidates[0].url;
      } else {
        console.log("error: media_type not found");
      }
      bestQualityPost.push(pushPost);
    }
  } else if (post.items[0].media_type == 2) {
    bestQualityPost.push({ type: "video", url: post.items[0].video_versions[0].url });
  } else if (post.items[0].media_type == 1) {
    bestQualityPost.push({ type: "image", url: post.items[0].image_versions2.candidates[0].url });
  } else {
    console.log("error: media_type not found");
  }
  return bestQualityPost;
}

function handlingError(err) {
  if (err.response && err.response.status === 404) {
    return { error: "private post or not found" };
  }
  if (err.response && err.response.status === 401) {
    return { error: "401 Unauthorized, you must login to see this content" };
  }
  return { error: err };
}

module.exports = class Insta {
  constructor() {
    this.cookies = undefined;
    this.userAgent = undefined;
  }
  async login(cookies, userAgent) {
    var account = {};
    try {
      let { data, error } = await axios.get(
        `https://www.instagram.com/accounts/edit/?__a=1&__d=dis`,
        {
          headers: {
            cookie: cookies,
            "User-Agent": userAgent,
          },
        }
      );
      if (error) {
        throw { error: error };
      } else {
        account = data;
        this.cookies = cookies;
        this.userAgent = userAgent;
      }
      return account;
    } catch (err) {
      throw handlingError(err);
    }
  }

  async getProfile(username) {
    try {
      var profile = {};
      let { data, error } = await axios.get(
        `https://www.instagram.com/${username}/?__a=1&__d=dis`,
        {
          headers: {
            cookie: this.cookies,
            "User-Agent": this.userAgent,
          },
        }
      );
      if (error) {
        throw { error: error };
      }
      profile = data;
      return profile;
    } catch (err) {
      throw handlingError(err);
    }
  }

  async getPost(shortcode) {
    try {
      var post = {};
      let { data, error } = await axios.get(
        `https://www.instagram.com/p/${shortcode}/?__a=1&__d=dis`,
        {
          headers: {
            cookie: this.cookies,
            "User-Agent": this.userAgent,
          },
        }
      );
      post = data;
      post["bestQuality"] = bestQuality(post);
      //console.log(post)
      return post;
    } catch (err) {
      throw handlingError(err);
    }
  }

  async getAllPosts(username, maxPosts) {
    try {
      var allPosts = {};
      var allCodes = [];
      allPosts["bestQuality"] = [];
      let { data, error } = await axios.get(
        `https://www.instagram.com/${username}/?__a=1&__d=dis`,
        {
          headers: {
            cookie: this.cookies,
            "User-Agent": this.userAgent,
          },
        }
      );
      allPosts = data;
      let count = 0;
      allPosts.graphql.user.edge_owner_to_timeline_media.edges = [];
      let end_cursor = "";
      let hasNextPage =
        data.graphql.user.edge_owner_to_timeline_media.page_info.has_next_page;
      while (hasNextPage === true && maxPosts > count) {
        let { data, error } = await axios.get(
          `https://www.instagram.com/graphql/query/?${querystring({
            query_id: 17888483320059182,
            id: allPosts.graphql.user.id,
            first: 12,
            after: end_cursor,
          })}`,
          {
            headers: {
              cookie: this.cookies,
              "User-Agent": this.userAgent,
            },
          }
        );
        allCodes = allCodes.concat(
          data.data.user.edge_owner_to_timeline_media.edges.map((post) => {
            return post.node.shortcode;
          })
        );
        count += data.data.user.edge_owner_to_timeline_media.edges.length;
        end_cursor =
          data.data.user.edge_owner_to_timeline_media.page_info.end_cursor;
        hasNextPage =
          data.data.user.edge_owner_to_timeline_media.page_info.has_next_page;
      }
      let postCount = 0;
      while (allCodes[postCount] && maxPosts > postCount) {
        postCount++;
        let addPost = await this.getPost(allCodes[postCount]);
        allPosts.graphql.user.edge_owner_to_timeline_media.edges.push(
          addPost.items[0]
        );
      }
      return allPosts;
    } catch (err) {
      throw handlingError(err);
    }
  }
  async getAccountNotifications() {
    try {
      var notifications = {};
      let { data, error } = await axios.get(
        `https://www.instagram.com/accounts/activity/?__a=1&__d=dis`,
        {
          headers: {
            cookie: this.cookies,
            "User-Agent": this.userAgent,
          },
        }
      );
      if (error) {
        throw { error: error };
      }
      notifications = data;
      return notifications;
    } catch (err) {
      throw handlingError(err);
    }
  }
  async getPostsByHashtag(hashtag) {
    try {
      var hashtag = {};
      let { data, error } = await axios.get(
        `https://www.instagram.com/explore/tags/${hashtag}/?__a=1&__d=dis`,
        {
          headers: {
            cookie: this.cookies,
            "User-Agent": this.userAgent,
          },
        }
      );
      if (error) {
        throw { error: error };
      }
      hashtag = data;
      return hashtag;
    } catch (err) {
      throw handlingError(err);
    }
  }
  async search(query) {
    try {
      var search = {};
      let { data, error } = await axios.get(
        `https://www.instagram.com/web/search/topsearch/?${querystring({
          context: "blended",
          query: query,
        })}`,
        {
          headers: {
            cookie: this.cookies,
            "User-Agent": this.userAgent,
          },
        }
      );
      if (error) {
        throw { error: error };
      }
      search = data;
      return search;
    } catch (err) {
      throw handlingError(err);
    }
  }
  async getLocationById(id) {
    try {
      var location = {};
      let { data, error } = await axios.get(
        `https://www.instagram.com/explore/locations/${id}/?__a=1&__d=dis`,
        {
          headers: {
            cookie: this.cookies,
            "User-Agent": this.userAgent,
          },
        }
      );
      if (error) {
        throw { error: error };
      }
      location = data;
      return location;
    } catch (err) {
      throw handlingError(err);
    }
  }
};
