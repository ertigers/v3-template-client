<template>
  <div>
    <statistics-card
      :title="$t('home.newStationsTitle')"
      :show-more="true"
      style="margin-top: 20px"
      @more-click="handleMoreClick"
    >
      <div class="chart-container">
        <div class="station-count">
          <div class="count-value">{{ countDisplay }}</div>
        </div>
        <div class="trend-chart">
          <ECharts :option="option" ref="eChartsRef" />
        </div>
      </div>
    </statistics-card>

    <!-- 新增电站弹窗 -->
    <NewStationDialog ref="newStationDialogRef" />
  </div>
</template>

<script setup>
import StatisticsCard from "./StatisticsCard.vue";
import NewStationDialog from "./NewStationDialog.vue";
import ECharts from "@/components/ECharts/index.vue";
import { ref, reactive, watch, onMounted } from "vue";
import * as echarts from "echarts";
import { formatW } from "@/utils/tools";
import StatisticApi from "@/api/modules/statistics";
import dayjs from "dayjs";

const option = reactive({
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "line" },
    backgroundColor: "#1f1f1f",
    borderWidth: 0,
    textStyle: { color: "#fff" },
    extraCssText: "border-radius:6px;padding:8px 10px;",
    formatter: params => `${params[0].axisValue}<br/>${params[0].value}`
  },
  xAxis: {
    data: [],
    boundaryGap: false,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false }
  },
  yAxis: {
    min: value => Math.floor(value.min * 0.9),
    max: value => Math.ceil(value.max * 1.1),
    splitLine: { show: false },
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false }
  },
  grid: {
    top: 10,
    bottom: 10,
    left: 0,
    right: 0,
    containLabel: false
  },
  series: [
    {
      data: [],
      type: "line",
      smooth: true,
      symbol: "none",
      lineStyle: { width: 2, color: "#4FC873" },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(79,200,115,0.35)" },
          { offset: 1, color: "rgba(79,200,115,0.05)" }
        ])
      }
    }
  ]
});

const eChartsRef = ref(null);
const newStationDialogRef = ref(null);
const stationTotal = ref(0);
const countDisplay = ref("0");

// 处理更多按钮点击事件
const handleMoreClick = () => {
  newStationDialogRef.value?.openDialog();
};
onMounted(async () => {
  const query = {
    startTime: dayjs().subtract(11, "month").format("YYYY-MM"),
    endTime: dayjs().format("YYYY-MM"),
    type: 1
  };
  const { data } = await StatisticApi.getStationIncrement(query);
  const stationData = data.data;
  let xAxisData = [];
  let seriesData = [];
  for (let i = 0; i < stationData.length; i++) {
    xAxisData.push(stationData[i].month);
    seriesData.push(stationData[i].count);
    stationTotal.value += stationData[i].count;
  }
  option.xAxis.data = xAxisData;
  option.series[0].data = seriesData;
  // 数字格式化：千位分隔符，保持与设计图一致
  countDisplay.value = stationTotal.value.toLocaleString();
  eChartsRef.value.draw();
});
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;

  .station-count {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    position: absolute;
    top: -30px;
    left: 0;

    .count-value {
      font-size: 26px;
      font-weight: 700;
      color: #000;
    }
  }

  .trend-chart {
    height: 100px;
    width: 100%;
    margin-top: 20px;
  }
}
</style>
