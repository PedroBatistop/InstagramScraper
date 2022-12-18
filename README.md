<p align="center">  
	<h1 align="center">Instagram Scraper</h1>
   A simple JS Instagram Scraper
</p>

### Prerequisites

- NodeJS
- NPM

### Install

From [npm](https://www.npmjs.com/package/@pedrobatistop/instagramscraper)

`npm i @pedrobatistop/instagramscraper`

### looking for another language?  
  
 * [Português](https://github.com/PedroBatistop/InstagramScraper/blob/main/.readme/pt/README.md)

#### Authentication

You must login to see private posts or profiles data.

### Usage

```js
const Insta = require('@pedrobatistop/instagramscraper');
const instgaram = new insta();
```

##### Getting your cookies

- Go to [instagram.com](https://www.instagram.com/);
- Login on your account;
- Open development tools *(`Ctrl` + `Shift` + `I`)*;
- Go to the `Network` tab;
- Reload the page;
- Get the first request called `www.instagram.com`;
- Open the `headers` tab;
- Search for `Request headers`;
- Right click on `cookies` value and copy;

##### Getting your user-agent

- Go to [google.com](https://www.google.com.br/);
- Search for `what's my user-agent`;
- Or simply go to this [link](https://www.google.com.br/search?&q=what%27s+my+user+agent);
- Copy your user-agent;


##### Code

```js
instgaram.login(cookies, userAgent)
	.then(account => console.log(account))
	.catch(err => console.error(err));
```

If authentication is successfull, you'll get the form data from `accounts/edit` :

```json
{
  "form_data": {
    "first_name": "",
    "last_name": "",
    "email": "",
    "is_email_confirmed": boolean,
    "is_phone_confirmed": boolean,
    "username": "",
    "phone_number": "",
    "gender": number,
    "birthday": "",
    "fb_birthday": "",
    "biography": "",
    "bio_links_for_web_edit_only": [],
    "external_url": "",
    "chaining_enabled": boolean,
    "presence_disabled": boolean,
    "business_account": boolean,
    "usertag_review_enabled": boolean,
    "name_disabled": boolean,
    "name_alternate_message": "",
    "name_alternate_cta_message": "",
    "name_alternate_cta_link": "",
    "custom_gender": "",
    "trusted_username": "",
    "trust_days": "",
    "profile_edit_params": {}
  }
}
```

If your cookie is invalid, you'll get error.

## Functions

1. - getProfile - Retrieves information about a profile.

```js
instgaram.getProfile(username)
	.then(profile => console.log(profile))
	.catch(err => console.error(err));
```

Response:

```json
{
	"seo_category_infos": [ ... ],
	"logging_page_id": "",
	"show_suggested_profiles": boolean,
	"graphql": {
		"user": {
			"biography": "",
			"bio_links": [],
			"biography_with_entities": { ... },
			"blocked_by_viewer": boolean,
			"restricted_by_viewer": boolean,
			"country_block": boolean,
			"external_url": null,
			"external_url_linkshimmed": null,
			"edge_followed_by": {
				"count": number
			},
			"fbid": "",
			"followed_by_viewer": boolean,
			"edge_follow": {
				"count": number
			},
			"follows_viewer": boolean,
			"full_name": "",
			"group_metadata": null,
			"has_ar_effects": boolean,
			"has_clips": boolean,
			"has_guides": boolean,
			"has_channel": boolean,
			"has_blocked_viewer": boolean,
			"highlight_reel_count": number,
			"has_requested_viewer": boolean,
			"hide_like_and_view_counts": boolean,
			"id": "",
			"is_business_account": boolean,
			"is_eligible_to_view_account_transparency": boolean,
			"is_professional_account": boolean,
			"is_supervision_enabled": boolean,
			"is_guardian_of_viewer": boolean,
			"is_supervised_by_viewer": boolean,
			"is_supervised_user": boolean,
			"is_embeds_disabled": boolean,
			"is_joined_recently": boolean,
			"guardian_id": null,
			"business_address_json": null,
			"business_contact_method": "",
			"business_email": null,
			"business_phone_number": null,
			"business_category_name": null,
			"overall_category_name": null,
			"category_enum": null,
			"category_name": null,
			"is_private": boolean,
			"is_verified": boolean,
			"edge_mutual_followed_by": {
				"count": number,
				"edges": []
			},
			"profile_pic_url": "",
			"profile_pic_url_hd": "",
			"requested_by_viewer": boolean,
			"should_show_category": boolean,
			"should_show_public_contacts": boolean,
			"transparency_label": null,
			"transparency_product": "",
			"username": "",
			"connected_fb_page": null,
			"pronouns": [],
			"edge_felix_combined_post_uploads": { ... },
			"edge_felix_combined_draft_uploads": { ... },
			"edge_felix_video_timeline": { ... },
			"edge_felix_drafts": { ... },
			"edge_felix_pending_post_uploads": { ... },
			"edge_felix_pending_draft_uploads": { ... },
			"edge_owner_to_timeline_media": {
				"count": number,
				"page_info": { ... },
				"edges": [ array of profile posts ]
			},
			"edge_saved_media": { ... },
			"edge_media_collections": { ... }
		}
	},
	"toast_content_on_load": null,
	"show_qr_modal": boolean,
	"show_view_shop": boolean
}
```

2. - getPost - Retrieve post data.

```js
var link = 'https://www.instagram.com/pedrobatistop/' || 'www.instagram.com/pedrobatistop/' || 'pedrobatistop'
var shortcode = link.includes('http') ? link.split('/')[3] : link.includes('.com') ? link.split('/')[1] : link
instgaram.getPost(shortcode)
	.then(post => console.log(post))
	.catch(err => console.error(err));
```

Response:

```json
{
  "items": [
    {
      "taken_at": number,
      "pk": number,
      "id": "",
      "device_timestamp": number,
      "media_type": number,
      "code": "",
      "client_cache_key": "",
      "filter_type": number,
      "is_unified_video": boolean,
      "should_request_ads": boolean,
      "original_media_has_visual_reply_media": boolean,
      "caption_is_edited": boolean,
      "like_and_view_counts_disabled": boolean,
      "commerciality_status": "",
      "is_paid_partnership": boolean,
      "is_visual_reply_commenter_notice_enabled": boolean,
      "clips_tab_pinned_user_ids": [],
      "has_delayed_metadata": boolean,
      "location": { ... },
      "lat": number,
      "lng": number,
      "comment_likes_enabled": boolean,
      "comment_threading_enabled": boolean,
      "max_num_visible_preview_comments": 2,
      "has_more_comments": boolean,
      "preview_comments": [ ... ],
      "comments": [ ... ],
      "comment_count": 1,
      "photo_of_you": boolean,
      "is_organic_product_tagging_eligible": boolean,
      "can_see_insights_as_brand": boolean,
      "user": { ... },
      "can_viewer_reshare": boolean,
      "like_count": number,
      "has_liked": boolean,
      "top_likers": [""],
      "facepile_top_likers": [ ... ],
      "image_versions2": {
        "candidates": [
          {
            "width": number,
            "height": number,
            "url": ""
          },
          ...
        ]
      },
      "original_width": number,
      "original_height": number,
      "caption": null,
      "comment_inform_treatment": { ... },
      "sharing_friction_info": { ... },
      "fb_user_tags": { "in": [] },
      "can_viewer_save": boolean,
      "is_in_profile_grid": boolean,
      "profile_grid_control_enabled": boolean,
      "organic_tracking_token": "",
      "has_shared_to_fb": number,
      "product_type": "",
      "deleted_reason": number,
      "integrity_review_decision": "",
      "commerce_integrity_review_decision": null,
      "music_metadata": { ... },
      "is_artist_pick": boolean,
      "can_view_more_preview_comments": boolean,
      "inline_composer_display_condition": "",
      "hide_view_all_comment_entrypoint": boolean
    }
  ],
  "num_results": 1,
  "more_available": boolean,
  "auto_load_more_enabled": boolean,
  "showQRModal": boolean
}
```

3. - getAllPosts - Retrieves all posts from a profile.

Use this function carefully so your account doesn't get banned, this makes a request for each `maxPosts` posts from a profile.

```js
instgaram.getAllPosts(username, maxPosts)
	.then(posts => console.log(posts))
	.catch(err => console.error(err));
```

Response:

```json
Same as getProfile
```

4. - getAccountNotifications - Get authenticated account notifications.

You must be logged to use this feature.

```js
instgaram.getAccountNotifications()
	.then(notifications => console.log(notifications))
	.catch(err => console.error(err));
```

Response:

```json
{
  "graphql": {
    "user": {
      "activity_feed": {
        "timestamp": number,
        "edge_web_activity_feed": {
          "count": number,
          "edges": [
            { ... },
            ...
          ]
        }
      },
      "edge_follow_requests": { "edges": [] }
    }
  }
}
```

5. - getPostsByHashtag - Retrieves posts related to the hashtag.

```js
instgaram.getPostsByHashtag(hashtag)
	.then(hashtag => console.log(hashtag))
	.catch(err => console.error(err));
```

Response:

```json
{
  "data": {
    "id": number,
    "name": "",
    "media_count": number,
    "follow_status": number,
    "following": number,
    "allow_following": number,
    "allow_muting_story": boolean,
    "profile_pic_url": "",
    "non_violating": number,
    "related_tags": null,
    "subtitle": [],
    "social_context": "",
    "social_context_profile_links": [],
    "social_context_facepile_users": [],
    "follow_button_text": null,
    "show_follow_drop_down": boolean,
    "formatted_media_count": "",
    "challenge_id": null,
    "destination_info": { ... },
    "description": null,
    "debug_info": null,
    "fresh_topic_metadata": null,
    "promo_banner": null,
    "top": {
      "sections": [
        ...
      ],
      "more_available": boolean,
      "next_max_id": "",
      "next_page": number,
      "next_media_ids": [ ... ]
    },
    "recent": {
      "sections": [
        ...
      ],
      "more_available": boolean,
      "next_max_id": "",
      "next_page": number,
      "next_media_ids": [number]
    },
    "content_advisory": null,
    "warning_message": null
  },
  "showQRModal": boolean
}
```

6. - search - Search profiles, locations and hashtags on Instagram.

```js
instgaram.search(query)
	.then(search => console.log(search))
	.catch(err => console.error(err));
```

Response:

```json
{
  "users": [
    { "position": number, "user": [Object] },
    ...
  ],
  "places": [
     { "position": number, "place": [Object] },
    ...
  ],
  "hashtags": [
    { "position": number, "hashtag": [Object] },
    ...
  ],
  "has_more": boolean,
  "rank_token": "",
  "clear_client_cache": null,
  "status": ""
}
```

7. - getLocationById - Get posts related to the location ID.

You can get the ID by searching the location using `instgaram.search(query)`.

```js
instgaram.getLocationById(id)
	.then(location => console.log(location))
	.catch(err => console.error(err));
```

Response:

```json
{
  "native_location_data": {
    "location_info": {
      "location_id": "",
      "facebook_places_id": "",
      "name": "",
      "phone": "",
      "website": "",
      "category": "",
      "price_range": number,
      "hours": {
        "status": "",
        "current_status": "",
        "hours_today": "",
        "schedule": [],
        "is_open": boolean
      },
      "lat": number,
      "lng": number,
      "location_address": "",
      "location_city": "",
      "location_region": number,
      "location_zip": "",
      "ig_business": {},
      "show_location_page_survey": boolean,
      "num_guides": null,
      "has_menu": boolean,
      "page_effect_info": {
        "num_effects": number,
        "thumbnail_url": null,
        "effect": null
      }
    },
    "ranked": {
      "sections": [
        { ... },
        ...
      ],
      "more_available": boolean,
      "next_page": number,
      "next_media_ids": [],
      "next_max_id": ""
    },
    "recent": {
      "sections": [
        { ... },
        ...
      ],
      "more_available": boolean,
      "next_page": number,
      "next_media_ids": [],
      "next_max_id": ""
    }
  },
  "logging_page_id": "",
  "show_qr_modal": boolean
}
```

## Thanks, Donations and Support
- [Donations](https://github.com/PedroBatistop/InstagramScraper#:~:text=Sponsor%20this%20project) - This project is maintained for free and has no profit focus, donate if you can ❤️
- I thank everyone!