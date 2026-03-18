import { defineStore } from "pinia";
import piniaPersistConfig from "@/stores/helper/persist";

export const useStationStore = defineStore({
  id: "envertech-station",
  state: () => ({
    // 创建的电站
    createStation: {},
    // 选中的电站
    selectedStation: {}
  }),
  getters: {},
  actions: {
    createStationFn(stationInfo, isAdd = false) {
      console.log("createStationFn", stationInfo);
      if (isAdd) {
        this.createStation = stationInfo;
      } else {
        this.createStation = {
          ...this.createStation,
          ...stationInfo
        };
      }
      console.log(this.createStation);
    },
    selectedStationFn(stationInfo) {
      this.selectedStation = stationInfo;
    }
  },

  persist: piniaPersistConfig("envertech-station")
});
