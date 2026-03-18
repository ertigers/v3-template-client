<template>
  <el-dialog
    v-model="dialogVisible"
    :title="$t('home.newDevicesTitle')"
    width="1200px"
    class="custom-dialog-element-css"
    draggable
    :close-on-click-modal="true"
    @closed="handleClose"
  >
    <div class="dialog-content">
      <!-- 时间周期切换 + 年份选择（参考新增电站弹窗） -->
      <div class="tools-header">
        <div class="capsule-switch" role="tablist" aria-label="period switch">
          <div
            role="tab"
            class="capsule-item left"
            :class="{ 'is-active': selectedPeriod === 'month' }"
            :aria-selected="selectedPeriod === 'month'"
            @click="setPeriod('month')"
          >
            {{ $t("global.month") }}
          </div>
          <div
            role="tab"
            class="capsule-item right"
            :class="{ 'is-active': selectedPeriod === 'day' }"
            :aria-selected="selectedPeriod === 'day'"
            @click="setPeriod('day')"
          >
            {{ $t("global.day") }}
          </div>
        </div>
        <div v-if="selectedPeriod === 'day'" class="custom-date-picker">
          <button class="nav-btn" aria-label="prev-year" @click="changeYearBy(-1)">
            <el-icon><ArrowLeft /></el-icon>
          </button>
          <el-date-picker
            v-model="selectedYear"
            type="year"
            value-format="YYYY"
            format="YYYY"
            :clearable="false"
            :editable="false"
            :disabled-date="disableFutureYear"
            style="width: 80px"
            @change="handleYearChange"
          />
          <button
            class="nav-btn"
            :class="{ 'is-disabled': isNextDisabled }"
            :disabled="isNextDisabled"
            :aria-disabled="isNextDisabled"
            aria-label="next-year"
            @click="changeYearBy(1)"
          >
            <el-icon><ArrowRight /></el-icon>
          </button>
        </div>
      </div>

      <!-- 图表容器 -->
      <div class="chart-container">
        <ECharts :option="chartOption" ref="eChartsRef" />
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch, computed } from "vue";
import ECharts from "@/components/ECharts/index.vue";
import StatisticApi from "@/api/modules/statistics";
import dayjs from "dayjs";
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { calculateSplitNumber } from "@/utils/tools";

// 弹窗显示状态
const dialogVisible = ref(false);
const eChartsRef = ref(null);
const selectedPeriod = ref("month");
const selectedYear = ref(dayjs().format("YYYY"));
const currentYear = dayjs().format("YYYY");

// 设备类型颜色（设计图：深绿 EVB + 浅绿 EVT）
const deviceColors = {
  EVB: "#4FC873",
  EVT: "#95DEAB"
};

// 设备类型名称映射
const deviceNameMap = {
  gateways: "EVB",
  gateway: "EVB",
  gaterters: "EVT",
  gaterter: "EVT",
  inverters: "EVT",
  inverter: "EVT"
};

// 转换设备类型名称
const transformDeviceName = originalName => {
  return deviceNameMap[originalName] || originalName;
};

// 图表配置
const chartOption = reactive({
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    backgroundColor: "#1f1f1f",
    borderWidth: 0,
    textStyle: { color: "#fff" }
  },
  xAxis: {
    type: "category",
    data: [],
    axisLabel: {
      interval: "auto",
      rotate: 0,
      fontSize: 12,
      color: "#BFBFBF",
      margin: 12
    },
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: "value",
    min: 0,
    splitNumber: 1,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: "#BFBFBF",
      fontSize: 12,
      formatter: value => Math.round(value)
    },
    splitLine: { show: true, lineStyle: { color: "#EDEDED", type: "dashed" } }
  },
  grid: {
    show: false,
    borderWidth: 0,
    top: "15%",
    bottom: selectedPeriod.value === "day" ? "22%" : "15%",
    left: "6%",
    right: "6%",
    containLabel: true
  },
  series: []
});

// 打开弹窗
const openDialog = () => {
  dialogVisible.value = true;
  updateChartConfig();
  fetchData();
};

// 关闭弹窗
const handleClose = () => {
  // 清理数据或重置状态
};

// 切换时间周期
const handlePeriodChange = () => {
  updateChartConfig();
  fetchData();
};

// 胶囊切换（保持原功能一致）
const setPeriod = val => {
  if (selectedPeriod.value !== val) {
    selectedPeriod.value = val;
    handlePeriodChange();
  }
};

// 年度左右切换与选择变化
const changeYearBy = delta => {
  const next = String(Number(selectedYear.value || dayjs().format("YYYY")) + delta);
  selectedYear.value = next;
  fetchData();
};

const handleYearChange = () => {
  fetchData();
};

// 禁用未来年份（选择器）
const disableFutureYear = date => dayjs(date).year() > Number(currentYear);
// 下一年不可点击（按钮）
const isNextDisabled = computed(() => Number(selectedYear.value || currentYear) >= Number(currentYear));

// 更新图表配置
const updateChartConfig = () => {
  if (selectedPeriod.value === "day") {
    // 日视图配置 - 一年数据需要更多空间
    Object.assign(chartOption.grid, {
      bottom: "4%",
      left: "2%",
      right: "2%",
      top: "8%"
    });
    // 更细的柱宽
    chartOption.series.forEach(s => Object.assign(s, { barWidth: 6 }));
  } else {
    // 月视图配置
    Object.assign(chartOption.grid, {
      bottom: "4%",
      left: "2%",
      right: "2%",
      top: "8%"
    });
    chartOption.series.forEach(s => Object.assign(s, { barWidth: 18 }));
  }
};

// 格式化X轴数据
const formatXAxisData = (dateStr, period) => {
  const date = dayjs(dateStr);

  if (period === "month") {
    return date.format("YYYY-MM");
  } else if (period === "day") {
    return date.format("MM-DD");
  }
  return dateStr;
};

// 将后端返回的 date 直接作为 X 轴，不在前端构建
// 支持返回结构：[{ name: 'EVB', data: [{ date: 'YYYY-MM', count: 10 }, ...] }, { name: 'EVT', data: [...] }]
const reBuildData = apiData => {
  const evbRow = apiData.find(d => transformDeviceName(d.name) === "EVB");
  const evtRow = apiData.find(d => transformDeviceName(d.name) === "EVT");

  const x = (evbRow?.data || []).map(i => formatXAxisData(i.time, selectedPeriod.value));
  const evb = (evbRow?.data || []).map(i => i.count || 0);
  const evt = (evtRow?.data || []).map(i => i.count || 0);

  return { x, evb, evt };
};

// 获取数据
const fetchData = async () => {
  try {
    const isMonth = selectedPeriod.value === "month";
    // 获取设备新增数据
    const query = {};
    if (isMonth) {
      query.startTime = dayjs().startOf("year").format("YYYY-MM");
      query.endTime = dayjs().endOf("year").format("YYYY-MM");
      query.type = 1;
    } else {
      query.startTime = dayjs(selectedYear.value).startOf("year").format("YYYY-MM-DD");
      query.endTime = dayjs(selectedYear.value).endOf("year").format("YYYY-MM-DD");
      query.type = 2;
    }
    const { data } = await StatisticApi.getDeviceIncrement(query);
    let xAxisData = [];
    let deviceTypeData = [];

    if (data && data.length > 0) {
      const { x, evb, evt } = reBuildData(data);
      xAxisData = x; // 直接使用后端的 date 作为 X 轴
      deviceTypeData = [
        { name: "EVB", type: "bar", stack: "total", data: evb, itemStyle: { color: deviceColors.EVB } },
        { name: "EVT", type: "bar", stack: "total", data: evt, itemStyle: { color: deviceColors.EVT } }
      ];
    }

    // 动态配置X轴（参考历史数据页样式）
    const xAxisConfig = {
      data: xAxisData,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 12,
        color: "#BFBFBF",
        margin: 12
      }
    };

    if (selectedPeriod.value === "day") {
      // 日视图：一年365天数据，按约12~14个标签等距展示
      const intervalStep = Math.ceil(xAxisData.length / 14);
      xAxisConfig.axisLabel.interval = intervalStep - 1;
      xAxisConfig.axisLabel.rotate = 45;
      xAxisConfig.axisLabel.margin = 15;
      xAxisConfig.axisLabel.showMinLabel = true;
      xAxisConfig.axisLabel.showMaxLabel = true;
    } else {
      // 月视图：12个月，斜体显示提升可读性
      xAxisConfig.axisLabel.interval = 0;
      xAxisConfig.axisLabel.rotate = 45;
      xAxisConfig.axisLabel.margin = 12;
    }

    // 根据数据最大值动态计算 splitNumber
    // 计算所有系列数据的最大值
    const allValues = deviceTypeData.flatMap(series => series.data || []);
    const maxValue = allValues.length > 0 ? Math.max(...allValues) : 0;
    const splitNumber = calculateSplitNumber(maxValue);

    // 更新图表数据
    Object.assign(chartOption.xAxis, xAxisConfig);
    Object.assign(chartOption.series, deviceTypeData);
    Object.assign(chartOption.yAxis, { splitNumber });

    // 重绘图表
    if (eChartsRef.value) {
      eChartsRef.value.draw();
    }
  } catch (error) {
    console.error("获取新增设备数据失败:", error);
  }
};

// 暴露方法给父组件
defineExpose({
  openDialog
});
</script>

<style lang="scss" scoped>
.dialog-content {
  padding: 20px 0;
}

.tools-header {
  display: flex;
  align-items: center;
}

.chart-container {
  height: 450px;
  width: 100%;
  position: relative;
}
</style>
