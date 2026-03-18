<template>
  <statistics-card :title="$t('home.deviceCount.title')">
    <div class="device-count">
      <div class="count-box">
        <div class="total-number">{{ formatW(props.deviceInfo.total) }}</div>
        <div class="count-details">
          <div class="detail-item">
            <span class="dot dtu"></span>
            <span class="text">EVB</span>
            <span class="value">{{ formatW(props.deviceInfo.gatewayTotal) }}</span>
          </div>
          <div class="detail-item">
            <span class="dot inverter"></span>
            <span class="text">EVT</span>
            <span class="value">{{ formatW(props.deviceInfo.inverterTotal) }}</span>
          </div>
        </div>
      </div>
      <div class="chart-area">
        <div class="pie-chart">
          <ECharts :option="option" ref="eChartsRef" />
        </div>
      </div>
    </div>
  </statistics-card>
</template>

<script setup>
import StatisticsCard from "./StatisticsCard.vue";
import ECharts from "@/components/ECharts/index.vue";
import { formatW } from "@/utils/tools";
import { ref, reactive, watch } from "vue";
import { t } from "@/plugins/i18n.js";

const props = defineProps({
  deviceInfo: {
    type: Object,
    default: () => ({})
  }
});

const eChartsRef = ref(null);

watch(
  () => props.deviceInfo,
  () => {
    if (eChartsRef.value) {
      handleSetOption();
      eChartsRef.value.draw();
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
    extraCssText: "border-radius:6px;padding:8px 10px;z-index:9999;", // 提高 tooltip 层级防止被遮挡
    confine: false, // 允许 tooltip 溢出 chart 区域
    appendToBody: true // tooltip 渲染到 body，避免被父级限制遮挡
  },
  series: [
    {
      name: t("home.deviceCount.title"),
      type: "pie",
      radius: ["0", "90%"],
      label: {
        show: false
      },
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 2
      },
      data: []
    }
  ]
});

const handleSetOption = () => {
  if (!props.deviceInfo.total) {
    return;
  }
  Object.assign(option.series[0].data, [
    {
      value: props.deviceInfo.gatewayTotal || 0,
      name: "EVB",
      itemStyle: { color: "#4FC873" }
    },
    {
      value: props.deviceInfo.inverterTotal || 0,
      name: "EVT",
      itemStyle: { color: "#30C6C6" }
    }
  ]);
};
</script>

<style lang="scss" scoped>
.statistics-card {
  padding: 10px 24px;

  .card-header {
    margin-bottom: 0 !important;
  }
}

.device-count {
  height: 100%;
  min-height: 88px;
  position: relative;

  .count-box {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .total-number {
      font-size: 32px;
      font-weight: 600;
      color: #333;
      margin-bottom: 10px;
    }

    .count-details {
      display: flex;
      gap: 8px;

      .detail-item {
        display: flex;
        align-items: center;
        font-size: 13px;

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 4px;

          &.inverter {
            background-color: #4caf50;
            margin-left: 4px;
          }

          &.dtu {
            background-color: #2196f3;
          }
        }

        .text {
          color: #666;
          margin-right: 4px;
        }

        .value {
          color: #333;
          font-weight: 500;
        }
      }
    }
  }

  .chart-area {
    position: absolute;
    top: -26px;
    right: 10px;

    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    .pie-chart {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
