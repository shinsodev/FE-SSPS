import axios from "./customize-axios";

const fetchAllUser = () => {
  return axios.get("/u");
};

export { fetchAllUser };
