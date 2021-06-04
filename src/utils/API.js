import axios from "axios";

const BASEURL = "https://randomuser.me/api/";

export default {
  search: function(query) {
    return axios.get(BASEURL + query);
  }
};
