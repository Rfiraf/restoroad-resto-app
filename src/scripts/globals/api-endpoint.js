import CONFIG from "./config";

const API_ENDPOINT = {
  RESTAURANT_LIST: `${CONFIG.BASE_URL}/list`,
  POST_REVIEW: `${CONFIG.BASE_URL}/review`,
  RESTAURANT_DETAIL: `${CONFIG.BASE_URL}/detail/`,
};

export default API_ENDPOINT;
