import { computed, ref } from "vue";
import { useCommonStore } from "@/stores/modules/common";

export const useStationSelect = (options = {}) => {
  const { pageSize = 200, initialKeyword = "" } = options;
  const commonStore = useCommonStore();

  const stationList = computed(() => commonStore.selectStationList);
  const stationLoading = ref(false);

  const loadStationOptions = async ({ keyword = initialKeyword } = {}) => {
    if (stationLoading.value) return;

    stationLoading.value = true;
    try {
      await commonStore.getSelectStationList({
        stationName: keyword,
        pageNumber: 1,
        pageSize,
        append: false
      });
    } finally {
      stationLoading.value = false;
    }
  };

  const initStationOptions = () => {
    return loadStationOptions({ keyword: initialKeyword });
  };

  const handleStationSearch = query => {
    return loadStationOptions({ keyword: (query || "").trim() });
  };

  return {
    stationList,
    stationLoading,
    handleStationSearch,
    initStationOptions
  };
};
