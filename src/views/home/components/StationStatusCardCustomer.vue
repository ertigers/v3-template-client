<template>
  <statistics-card :title="$t('home.stationStatus.title')">
    <div class="">
      <div class="station-status">
        <div class="status-chart">
          <div class="chart-item">
            <ECharts :option="option" ref="eChartsRef" />
            <div class="total">
              <div>{{ formatW(props.stationInfo.total) }}</div>
              <div>{{ t("home.stationStatus.total") }}</div>
            </div>
          </div>
        </div>
        <div class="status-list">
          <div class="status-header">
            <div>{{ t("home.stationStatus.status") }}</div>
            <div>{{ t("home.stationStatus.number") }}</div>
          </div>
          <div class="status-item">
            <div class="status-info">
              <div class="status-dot normal"></div>
              <div class="status-name" @click="handleStatusClick(1)">{{ t("home.stationStatus.normal") }}</div>
            </div>
            <div class="status-count">{{ props.stationInfo.onlineTotal }}</div>
          </div>
          <div class="status-item">
            <div class="status-info">
              <div class="status-dot offline"></div>
              <div class="status-name" @click="handleStatusClick(0)">{{ t("home.stationStatus.offline") }}</div>
            </div>
            <div class="status-count">{{ props.stationInfo.offlineTotal }}</div>
          </div>
          <div class="status-item">
            <div class="status-info">
              <div class="status-dot building"></div>
              <div class="status-name" @click="handleStatusClick(3)">{{ t("home.stationStatus.building") }}</div>
            </div>
            <div class="status-count">{{ props.stationInfo.buildingTotal }}</div>
          </div>
          <div class="status-item">
            <div class="status-info">
              <div class="status-dot fault"></div>
              <div class="status-name" @click="handleStatusClick(2)">{{ t("home.stationStatus.alarm") }}</div>
            </div>
            <div class="status-count">{{ props.stationInfo.alarmTotal }}</div>
          </div>
        </div>
      </div>
    </div>
  </statistics-card>
</template>

<script setup>
import StatisticsCard from "./StatisticsCard.vue";
import ECharts from "@/components/ECharts/index.vue";
import { ref, reactive, watch } from "vue";
import { formatW } from "@/utils/tools";
import { t } from "@/plugins/i18n.js";
import { useRouter } from "vue-router";

const props = defineProps({
  stationInfo: {
    type: Object,
    default: () => ({})
  }
});

const router = useRouter();
const eChartsRef = ref(null);
watch(
  () => props.stationInfo,
  () => {
    if (eChartsRef.value) {
      handleSetOption();
    }
  },
  { deep: true }
);

const option = reactive({
  tooltip: {
    trigger: "item",
    backgroundColor: "#1f1f1f",
    borderWidth: 0,
    textStyle: { color: "#fff" },
    extraCssText: "border-radius:6px;padding:8px 10px;"
  },
  series: [
    {
      name: t("home.stationStatus.title"),
      type: "pie",
      radius: ["60%", "80%"],
      padAngle: 3,
      itemStyle: {
        borderRadius: 8
      },
      label: {
        show: false
      },
      data: []
    }
  ]
});

const handleSetOption = () => {
  console.log(props.deviceInfo);

  if (!props.stationInfo.total) {
    return;
  }
  Object.assign(option.series[0].data, [
    {
      value: props.stationInfo.onlineTotal || 0,
      name: t("home.stationStatus.normal"),
      itemStyle: { color: "#4FC873" }
    },
    {
      value: props.stationInfo.offlineTotal || 0,
      name: t("home.stationStatus.offline"),
      itemStyle: { color: "#D3D8DF" }
    },
    {
      value: props.stationInfo.buildingTotal || 0,
      name: t("home.stationStatus.building"),
      itemStyle: { color: "#004CC6" }
    },
    {
      value: props.stationInfo.alarmTotal || 0,
      name: t("home.stationStatus.alarm"),
      itemStyle: { color: "#F75428" }
    }
  ]);
  eChartsRef.value.draw();
};

// 处理电站状态点击事件，在新标签页打开电站列表
const handleStatusClick = status => {
  // 根据不同状态构建查询参数
  let queryParams = { status };

  // 使用 router.resolve 生成完整的路由URL
  const routeData = router.resolve({
    path: "/station/list",
    query: queryParams
  });

  // 在新标签页中打开链接
  window.open(routeData.href, "_blank");
};
</script>

<style lang="scss" scoped>
@use "./block-card.scss" as *;
.station-status {
  display: flex;
  align-items: center;

  .status-chart {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .chart-item {
      position: relative;
      height: 200px;
      width: 100%;

      .total {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        font-size: 24px;
        font-weight: 600;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        :last-child {
          font-size: 16px;
          font-weight: 500;
          color: #666;
        }
      }
    }
  }

  .status-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-right: 40px;

    .status-header {
      display: flex;
      font-size: 14px;
      color: #666;

      > div {
        flex: 1;
      }
    }

    .status-item {
      display: flex;
      align-items: center;
      border-top: 1px solid #f0f0f0;
      padding-top: 8px;

      > div {
        flex: 1;
      }

      .status-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 12px;

        &.normal {
          background-color: #4fc873;
        }

        &.offline {
          background-color: #d3d8df;
        }

        &.building {
          background-color: #004cc6;
        }

        &.fault {
          background-color: #f75428;
        }
      }

      .status-info {
        display: flex;
        align-items: center;
        width: 100%;

        .status-name {
          flex: 1;
          font-size: 14px;
          color: #333;
          cursor: pointer;
          transition: color 0.2s ease;

          &:hover {
            color: #409eff;
          }
        }

        .status-count {
          width: 60px;
          font-size: 14px;
          color: #333;
          text-align: right;
          margin-right: 20px;
        }

        .status-percent {
          width: 60px;
          font-size: 14px;
          color: #666;
          text-align: right;
        }
      }
    }
  }
}
</style>
