<template>
  <el-dialog
    v-model="dialogVisible"
    :title="$t('home.newStationsTitle')"
    width="1200px"
    draggable
    class="custom-dialog-element-css"
    :close-on-click-modal="true"
    @closed="handleClose"
    @opened="handleOpened"
  >
    <div class="dialog-content">
      <!-- 时间周期切换 -->
      <div class="tools-header">
        <div class="capsule-switch" role="tablist" aria-label="period switch">
          <div
            role="tab"
            :aria-selected="selectedPeriod === 'month'"
            class="capsule-item left"
            :class="{ 'is-active': selectedPeriod === 'month' }"
            @click="setPeriod('month')"
          >
            {{ $t("global.month") }}
          </div>
          <div
            role="tab"
            :aria-selected="selectedPeriod === 'day'"
            class="capsule-item right"
            :class="{ 'is-active': selectedPeriod === 'day' }"
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
import { ref, reactive, watch, nextTick, computed } from "vue";
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import ECharts from "@/components/ECharts/index.vue";
import StatisticApi from "@/api/modules/statistics";
import dayjs from "dayjs";
import { $t } from "@/plugins/i18n.js";
import { calculateSplitNumber } from "@/utils/tools";

// 弹窗显示状态
const dialogVisible = ref(false);
const eChartsRef = ref(null);
const selectedPeriod = ref("month");
const selectedYear = ref(dayjs().format("YYYY"));
const currentYear = dayjs().format("YYYY");

// 图表配置
const chartOption = reactive({
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    backgroundColor: "#1f1f1f",
    borderWidth: 0,
    textStyle: { color: "#fff" },
    extraCssText: "border-radius:6px;padding:8px 10px;",
    formatter: function (params) {
      if (params && params.length > 0) {
        const p = params[0];
        const val = Number(p.value).toLocaleString();
        return `${p.name}<br/>${p.marker}${$t("global.number")}: ${val}`;
      }
      return "";
    }
  },
  xAxis: {
    type: "category",
    data: [],
    axisLabel: {
      interval: "auto",
      rotate: 45,
      fontSize: 12,
      color: "#BFBFBF",
      margin: 12
    },
    axisTick: { show: false, alignWithLabel: true },
    axisLine: { show: false }
  },
  yAxis: {
    type: "value",
    min: 0,
    splitNumber: 1,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      fontSize: 12,
      color: "#BFBFBF",
      formatter: value => Math.round(value)
    },
    splitLine: { show: true, lineStyle: { color: "#EDEDED", type: "dashed" } }
  },
  grid: { show: false, borderWidth: 0, top: "8%", bottom: "20%", left: "6%", right: "4%" },
  series: [
    {
      name: "",
      type: "bar",
      barWidth: 18,
      barCategoryGap: "20%",
      data: [],
      itemStyle: {
        color: "#4FC873",
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: {
        focus: "series",
        itemStyle: { color: "#34B261" }
      }
    }
  ]
});

// 打开弹窗
const openDialog = () => {
  dialogVisible.value = true; // 等待对话框完全打开后再初始化
};
// 对话框打开后再初始化，避免 eCharts 容器尚未挂载导致的报错
const handleOpened = async () => {
  updateChartConfig();
  await fetchData();
};

// 关闭弹窗
const handleClose = () => {
  // 清理数据或重置状态
};

// 切换时间周期
const handlePeriodChange = () => {
  // 更新图表配置以适应不同时间周期
  updateChartConfig();
  fetchData();
};

// 供 div 版胶囊调用，保持与原功能一致
const setPeriod = period => {
  if (selectedPeriod.value !== period) {
    selectedPeriod.value = period;
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
const disableFutureYear = date => {
  // date 为原生 Date
  return dayjs(date).year() > Number(currentYear);
};

// 下一年不可点击（按钮）
const isNextDisabled = computed(() => Number(selectedYear.value || currentYear) >= Number(currentYear));

// 更新图表配置：根据周期调整柱宽/间距与网格
const updateChartConfig = () => {
  const isDay = selectedPeriod.value === "day";
  Object.assign(
    chartOption.grid,
    isDay ? { bottom: "15%", left: "6%", right: "2%" } : { bottom: "15%", left: "6%", right: "4%" }
  );
  Object.assign(chartOption.series[0], {
    barWidth: isDay ? 2 : 40,
    barCategoryGap: isDay ? "5%" : "20%",
    animation: false
  });
};

// 格式化X轴数据
const formatXAxisData = (dateStr, period) => {
  const date = dayjs(dateStr);

  if (period === "month") {
    return date.format("YYYY-MM");
  } else if (period === "day") {
    // 对于日视图，显示月-日格式，每月1号显示月份
    return date.format("MM-DD");
  }
  return dateStr;
};

// 基于月数据构建两种周期数据
const reBuildData = (list, isMonth) => {
  const x = [],
    y = [];
  const key = isMonth ? "month" : "day";
  list.forEach(item => {
    x.push(formatXAxisData(item.time, key));
    y.push(item.count);
  });
  return { x, y };
};

// 获取数据
const fetchData = async () => {
  try {
    const isMonth = selectedPeriod.value === "month";

    // 目前只有月度统计API，日度数据需要后端提供对应接口
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
    const { data } = await StatisticApi.getStationIncrement(query);
    const stationData = data.data || [];

    const { x: xAxisData, y: seriesData } = reBuildData(stationData, isMonth);

    // 动态配置X轴
    const xAxisConfig = {
      data: xAxisData,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 12, color: "#BFBFBF", margin: 12, rotate: 45 }
    };

    if (!isMonth) {
      // 日视图：一年365天数据，需要智能间隔显示
      // 大约显示12-15个标签，每月显示1-2个
      const intervalStep = Math.ceil(xAxisData.length / 14);
      xAxisConfig.axisLabel.interval = intervalStep - 1;
      xAxisConfig.axisLabel.rotate = 45;
      xAxisConfig.axisLabel.margin = 15;
      xAxisConfig.axisLabel.showMinLabel = true;
      xAxisConfig.axisLabel.showMaxLabel = true;
    } else {
      // 月视图：12 个月，统一斜着展示，提升可读性
      xAxisConfig.axisLabel.interval = 0;
      xAxisConfig.axisLabel.rotate = 45;
      xAxisConfig.axisLabel.margin = 12;
    }

    // 根据数据最大值动态计算 splitNumber
    const maxValue = seriesData.length > 0 ? Math.max(...seriesData) : 0;
    const splitNumber = calculateSplitNumber(maxValue);

    // 更新图表数据
    Object.assign(chartOption.xAxis, xAxisConfig);
    Object.assign(chartOption.series[0], { data: seriesData });
    Object.assign(chartOption.yAxis, { splitNumber });

    // 重绘图表（确保子组件已挂载）
    if (eChartsRef.value) {
      eChartsRef.value.draw();
    } else {
      await nextTick();
      eChartsRef.value?.draw?.();
    }
  } catch (error) {
    console.error("获取新增电站数据失败:", error);
  }
};

// 暴露方法给父组件
defineExpose({
  openDialog
});
</script>

<style lang="scss" scoped>
.chart-container {
  height: 400px;
  width: 100%;
  position: relative;
}
.tools-header {
  display: flex;
  align-items: center;
}
</style>
