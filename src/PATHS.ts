const base_url = "https://wbsapi.withings.net";

export const PATHS = {
  WITHINGS: {
    AUTH_CODE: "https://account.withings.com/oauth2_user/authorize2?response_type=code&client_id={{client_id}}&redirect_uri={{oauth2_redirect_uri}}&state={{state}}&scope={{scope}}"
  }
}

export const API = {
  WITHINGS: {
    GET_NONCE: base_url + "/v2/signature",
    GET_ACCESS_TOKEN: base_url + "/v2/oauth2"
  }
}