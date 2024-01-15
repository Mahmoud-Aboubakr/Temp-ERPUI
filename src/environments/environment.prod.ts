import { config } from "config";

export const environment = {
  production: true,
  apiURL: config.apiUrl, 
  fileUrl:config.fileUrl,
  paginationList: config.paginationList,
  status:config.status,
};