import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const MapApi = {
  // 对坐标点进行逆地理编码
  getGeocoding: params => {
    return http.get(`${PORT2}/geo-map/reverse-geocoding`, params, { loading: false });
  },

  // 关键词查询POI
  getMapPoi: params => {
    return http.get(`${PORT2}/geo-map/poi-keywords`, params, { loading: false });
  }
};

export default MapApi;
