import axios from 'axios'

const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})


request.interceptors.request.use(
  function(config) {
    // 增加accesstoken
    if (config.headers.Authorization === undefined) {
      config.headers.Authorization = getSession("token") || ""
    }
    
    // FormData submit
    if (config.method.toLocaleLowerCase() === "post" && config.headers["Content-Type"] === formData) {
      config.data = qs.stringify(config.data);
    }
    return config;
  },

  function (error) {
    return Promise.reject(error)
  }
);

export default request