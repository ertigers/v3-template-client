import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const PublicApi = {
  getHelpDocList: () => {
    return http.get(`${PORT2}/help-doc/list`);
  }
};

export default PublicApi;
