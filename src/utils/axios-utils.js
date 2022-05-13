//axios interceptor
import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:4000" });

//wrap all axios requests
// recieves all the options that axios receives
export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer Token`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    //optionally catch errors and add additional logging here
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};
