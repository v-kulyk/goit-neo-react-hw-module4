import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

axios.defaults.headers.common["Authorization"] =
  "Client-ID N_E385x891EfGZtIGeGCgDNx72JPB-6Ho51XfKKWaz0";

const searchImages = async function ({ query, page }) {
  //Access Key
  //N_E385x891EfGZtIGeGCgDNx72JPB-6Ho51XfKKWaz0

  //Secret key
  //QiFrFU4721Mjmo5adK814HQ_GA6U7b6yBIkxdSfpNvA

  const response = await axios.get("/search/photos", {
    params: { query, page },
  });

  return response.data;
};

export { searchImages };
