<template>
  <div>
    <statistics-card :title="$t('home.newDevicesTitle')" :show-more="true" style="margin-top: 20px" @more-click="handleMoreClick">
      <div class="chart-container">
        <div class="trend-chart">
          <ECharts :option="option" ref="eChartsRef" />
        </div>
      </div>
    </statistics-card>

    <!-- 新增设备弹窗 -->
    <NewDeviceDialog ref="newDeviceDialogRef" />
  </div>
</template>

<script setup>
import StatisticsCard from "./StatisticsCard.vue";
import NewDeviceDialog from "./NewDeviceDialog.vue";
import ECharts from "@/components/ECharts/index.vue";
import { ref, reactive, watch, onMounted } from "vue";
import StatisticApi from "@/api/modules/statistics";
import dayjs from "dayjs";

const option = reactive({
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    backgroundColor: "#1f1f1f",
    borderWidth: 0,
    textStyle: { color: "#fff" },
    extraCssText: "border-radius:6px;padding:8px 10px;",
    formatter: params => {
      if (!params || !params.length) return "";
      const idx = params[0].dataIndex;
      const month = option.xAxis.data[idx] ?? "";
      const evb = evbData.value[idx] ?? 0;
      const evt = evtData.value[idx] ?? 0;
      const dark = "#4FC873";
      const light = "#95DEAB";
      return (
        `${month}<br/>` +
        `<span style="display:inline-block;margin-right:6px;width:8px;height:8px;background:${dark};border-radius:2px"></span>EVB: ${evb}<br/>` +
        `<span style="display:inline-block;margin-right:6px;width:8px;height:8px;background:${light};border-radius:2px"></span>EVT: ${evt}`
      );
    }
  },
  xAxis: {
    data: [],
    show: false
  },
  yAxis: {
    show: false
  },
  grid: {
    show: false,
    borderWidth: 0,
    top: "5%",
    bottom: "5%",
    left: "5%",
    right: "5%"
  },
  series: []
});

const eChartsRef = ref(null);
const newDeviceDialogRef = ref(null);
const deviceTotal = ref(0);
// 保存分项数据用于 tooltip 与图形叠加
const evbData = ref([]);
const evtData = ref([]);

// 处理更多按钮点击事件
const handleMoreClick = () => {
  newDeviceDialogRef.value?.openDialog();
};
// 设备类型颜色配置 - 按设备类型指定颜色
const deviceColors = {
  EVB: "#4FC873",
  EVT: "#95DEAB"
};

// 设备类型名称映射
const deviceNameMap = {
  gateways: "EVB",
  gaterters: "EVT"
};

// 转换设备类型名称
const transformDeviceName = originalName => {
  return deviceNameMap[originalName] || originalName;
};

// 获取设备类型对应的颜色
const getDeviceColor = (deviceName, index) => {
  const transformedName = transformDeviceName(deviceName);
  return deviceColors[transformedName];
};

onMounted(async () => {
  const query = {
    startTime: dayjs().subtract(11, "month").format("YYYY-MM"),
    endTime: dayjs().format("YYYY-MM"),
    type: 1
  };
  const { data } = await StatisticApi.getDeviceIncrement(query);
  const xAxisData = data[0]?.data?.map(item => item.time);
  let total = 0;

  // 提取 EVB / EVT 两类数据
  const evbRow = data.find(d => transformDeviceName(d.name) === "EVB");
  const evtRow = data.find(d => transformDeviceName(d.name) === "EVT");
  evbData.value = (evbRow?.data || []).map(i => i.count || 0);
  evtData.value = (evtRow?.data || []).map(i => i.count || 0);

  const totalData = evbData.value.map((v, idx) => {
    const sum = v + (evtData.value[idx] || 0);
    total += sum;
    return sum;
  });
  deviceTotal.value = total;

  // 覆盖为“前景条+背景条”的叠加样式（非堆叠）
  option.xAxis.data = xAxisData;
  option.series = [
    {
      name: "Total",
      type: "bar",
      data: totalData,
      barWidth: 18,
      barGap: "0%",
      z: 1,
      itemStyle: {
        color: "#95DEAB",
        borderRadius: [4, 4, 0, 0]
      }
    },
    {
      name: "EVB",
      type: "bar",
      data: evbData.value,
      barWidth: 18,
      barGap: "-100%",
      z: 2,
      itemStyle: {
        color: "#4FC873",
        borderRadius: [4, 4, 0, 0]
      }
    }
  ];

  eChartsRef.value.draw();
});
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;

  .station-count {
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: absolute;
    top: -20px;
    left: 50%;
    transform: translate(-50%, -50%);

    .count-value {
      font-size: 32px;
      font-weight: 600;
      color: #333;
    }
  }

  .trend-chart {
    height: 100px;
    width: 100%;
  }
}
</style>
