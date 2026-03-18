<template>
  <statistics-card :title="$t('home.historyChart.title')" :show-more="false" style="margin-top: 10px">
    <div class="chart-container">
      <div class="chart-filter">
        <div class="filter-tabs">
          <div class="custom-element-css">
            <el-select v-model="searchForm.type" placeholder="Select" style="width: 180px" @change="fetchHistoryData">
              <el-option :label="$t('home.historyChart.energy')" :value="'energy'" />
              <el-option :label="$t('home.historyChart.capacity')" :value="'capacity'" />
            </el-select>
          </div>

          <div class="capsule-switch" role="tablist" aria-label="period switch" style="margin-left: 20px; margin-right: 20px">
            <div
              role="tab"
              class="capsule-item left"
              :class="{ 'is-active': searchForm.period === 'day' }"
              :aria-selected="searchForm.period === 'day'"
              @click="setPeriod('day')"
            >
              {{ $t("global.month") }}
            </div>
            <div
              role="tab"
              class="capsule-item center"
              :class="{ 'is-active': searchForm.period === 'month' }"
              :aria-selected="searchForm.period === 'month'"
              @click="setPeriod('month')"
            >
              {{ $t("global.year") }}
            </div>
            <div
              role="tab"
              class="capsule-item right"
              :class="{ 'is-active': searchForm.period === 'year' }"
              :aria-selected="searchForm.period === 'year'"
              @click="setPeriod('year')"
            >
              {{ $t("global.total2") }}
            </div>
          </div>

          <div v-if="searchForm.period !== 'year'" class="custom-date-picker">
            <button class="nav-btn" aria-label="prev-year" @click="changeYearBy(-1)">
              <el-icon><ArrowLeft /></el-icon>
            </button>
            <el-date-picker
              v-model="searchForm.date"
              :type="searchForm.period === 'day' ? 'month' : 'year'"
              :format="searchForm.period === 'day' ? 'YYYY-MM' : 'YYYY'"
              value-format="YYYY-MM-DD HH:mm:ss"
              placeholder="2025-01"
              :disabled-date="time => time.getTime() > Date.now()"
              @change="fetchHistoryData"
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
        <div class="tools">
          <el-tooltip :content="$t('home.downloadChart')" placement="top">
            <el-button link @click="downloadChart">
              <el-icon><Picture /></el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip :content="$t('home.downloadExcel')" placement="top">
            <el-button link @click="downloadExcel">
              <el-icon><Document /></el-icon>
            </el-button>
          </el-tooltip>
        </div>
      </div>
      <div class="chart-main">
        <div class="chart-bars">
          <ECharts :option="option" ref="eChartsRef" />
        </div>
      </div>
    </div>
  </statistics-card>
</template>

<script setup>
import ECharts from "@/components/ECharts/index.vue";
import StatisticsCard from "./StatisticsCard.vue";
import StatisticApi from "@/api/modules/statistics";
import dayjs from "dayjs";
import { ref, reactive, onMounted, computed } from "vue";
import { Picture, Document, ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { formatAuto, calculateSplitNumber } from "@/utils/tools";
import { $t } from "@/plugins/i18n";
import { useDownload } from "@/hooks/useDownload";

const searchForm = reactive({
  type: "energy", // 选择的类型
  period: "day", // 默认选择月
  date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss") // 默认选择当前日期
});

const eChartsRef = ref(null);
const option = reactive({});
const exportRows = ref([]);
const setOption = async data => {
  const rows = data.rows || [];
  exportRows.value = rows;
  const xAxisData = rows.map(item => {
    if (searchForm.period == "day") {
      return dayjs(item.ptime).format("DD");
    } else if (searchForm.period == "month") {
      return dayjs(item.ptime).format("MM");
    } else if (searchForm.period == "year") {
      return dayjs(item.ptime).format("YYYY");
    }
  });
  const seriesData = rows.map(item => {
    if (searchForm.type === "capacity") {
      return item.value / 1000;
    }
    return item.value;
  });

  // 保存完整的日期数据用于tooltip显示
  const fullDateData = rows.map(item => item.ptime);

  // 根据数据最大值动态计算 splitNumber
  const maxValue = seriesData.length > 0 ? Math.max(...seriesData) : 0;
  const splitNumber = calculateSplitNumber(maxValue);

  Object.assign(option, {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "#1f1f1f",
      borderWidth: 0,
      textStyle: { color: "#fff" },
      extraCssText: "border-radius:6px;padding:8px 10px;",
      formatter: params => {
        if (params && params.length > 0) {
          const dataIndex = params[0].dataIndex;
          const value = params[0].value;
          const fullDate = fullDateData[dataIndex];

          // 根据周期显示不同格式的完整日期
          let dateFormat = "";
          if (searchForm.period === "day") {
            dateFormat = dayjs(fullDate).format("YYYY-MM-DD");
          } else if (searchForm.period === "month") {
            dateFormat = dayjs(fullDate).format("YYYY-MM");
          } else if (searchForm.period === "year") {
            dateFormat = dayjs(fullDate).format("YYYY");
          }

          // 格式化数值并添加单位
          const valueData = formatAuto(value * 1000, searchForm.type);
          const formattedValue = valueData.value;
          const unit = valueData.unit;
          const seriesName =
            params[0].seriesName ||
            (searchForm.type === "energy" ? $t("home.historyChart.energy") : $t("home.historyChart.capacity"));

          return `
            <div style="padding: 8px; font-size: 13px; line-height: 1.4;">
              <div style="margin-bottom: 6px; font-weight: 600;">${dateFormat}</div>
              <div style="display: flex; align-items: center;">
                <span style="display: inline-block; width: 8px; height: 8px; background-color: ${params[0].color}; border-radius: 50%; margin-right: 6px;"></span>
                <span style="">${seriesName}: <strong style="">${formattedValue}${unit}</strong></span>
              </div>
            </div>
          `;
        }
        return "";
      }
    },
    xAxis: {
      data: xAxisData,
      axisLabel: {
        show: true,
        margin: 12,
        color: "#BFBFBF", // X 轴刻度文字颜色（浅灰）
        fontSize: 12
      },
      axisLine: { show: false }, // 不显示 X 轴轴线
      axisTick: { show: false } // 不显示刻度小竖线
    },
    yAxis: {
      // 坐标轴类型：数值轴（连续型）
      // 可选值："value" | "category" | "time" | "log"
      type: "value",
      // 最小值：0 起，避免出现负值区间
      min: 0, // 0 表示从 0 开始绘制
      // 期望分隔段数：根据数据最大值动态计算
      splitNumber,
      // 坐标轴名称：动态单位文案，随指标切换
      name: searchForm.type === "energy" ? `${$t("global.unit")}:kWh` : `${$t("global.unit")}:kWp`, // energy->kWh，capacity->kWp
      // 名称显示位置：轴线末端（顶端）
      // 可选值：start(底部)/middle(中间)/end(顶部)
      nameLocation: "end",
      // 名称与轴线之间的像素间距
      nameGap: 12, // 数值越大，名称离轴线越远（沿轴方向）。如果要水平更靠左，可配合 padding。
      // 名称旋转角度（0 为不旋转）
      nameRotate: 0, // 0 表示水平显示
      // 名称文本样式（可用 padding 实现水平微调，如 [top, right, bottom, left]）
      nameTextStyle: {
        color: "#BFBFBF", // 名称颜色（浅灰）
        fontSize: 12, // 字号
        align: "right", // 向左侧对齐，使轴名整体更靠左
        verticalAlign: "bottom", // 垂直对齐（贴近顶部）
        padding: [0, -10, 6, 0] // 向右偏移 6px（top,right,bottom,left）
      },
      // 轴线与刻度线：隐藏以贴近设计图
      axisLine: { show: false }, // 不显示 Y 轴轴线
      axisTick: { show: false }, // 不显示刻度小竖线
      // 刻度标签样式与格式：显示为整数
      axisLabel: {
        color: "#BFBFBF", // 刻度文字颜色
        fontSize: 12, // 字号
        formatter: value => Math.round(value) // 将数值四舍五入为整数显示
      },
      // 网格分隔线：浅灰虚线
      splitLine: { show: true, lineStyle: { color: "#EDEDED", type: "dashed" } }
    },
    grid: {
      show: false,
      borderWidth: 0,
      top: "10%",
      bottom: "12%",
      left: "4%",
      right: "2%",
      containLabel: true
    },
    series: [
      {
        type: "bar",
        data: seriesData,
        name: searchForm.type === "energy" ? $t("home.historyChart.energy") : $t("home.historyChart.capacity"),
        barWidth: 18,
        itemStyle: {
          color: "#4FC873", // 柱形主色
          borderRadius: [4, 4, 0, 0] // 顶部圆角
        },
        emphasis: {
          itemStyle: {
            color: "#34B261" // hover 更深的绿色
          }
        }
      }
    ]
  });
  eChartsRef.value.draw();
};

const getQueryParams = () => {
  console.log("searchForm", searchForm);
  const queryParams = {
    type: searchForm.type,
    period: searchForm.period
  };

  if (queryParams.period == "day") {
    queryParams.begintime = dayjs(searchForm.date).startOf("months").format("YYYY-MM-DD HH:mm:ss"); // 默认选择当前日期
    let endtime = dayjs(searchForm.date).endOf("months").format("YYYY-MM-DD HH:mm:ss");
    let currentDayEndtime = dayjs(new Date()).endOf("days").format("YYYY-MM-DD HH:mm:ss");
    // 取小值
    queryParams.endtime = endtime > currentDayEndtime ? currentDayEndtime : endtime;
  } else if (queryParams.period == "month") {
    queryParams.begintime = dayjs(searchForm.date).startOf("years").format("YYYY-MM-DD HH:mm:ss"); // 默认选择当前日期
    let endtime = dayjs(searchForm.date).endOf("years").format("YYYY-MM-DD HH:mm:ss");
    let currentDayEndtime = dayjs(new Date()).endOf("days").format("YYYY-MM-DD HH:mm:ss");
    // 取小值
    queryParams.endtime = endtime > currentDayEndtime ? currentDayEndtime : endtime;
  }
  return queryParams;
};
const fetchHistoryData = async () => {
  const queryParams = getQueryParams();
  let StatisticFn = queryParams.type === "energy" ? StatisticApi.getStationEnergys : StatisticApi.getStationCapacity;
  const { data } = await StatisticFn(queryParams);
  setOption(data);
};

onMounted(async () => {
  fetchHistoryData();
});

// 交互：切换周期（保留原有逻辑）
const setPeriod = val => {
  if (searchForm.period !== val) {
    searchForm.period = val;
    fetchHistoryData();
  }
};

// 选择器：左右切换（根据周期，月视图按月份跳转，年视图按年份跳转）
const changeYearBy = delta => {
  let base = dayjs(searchForm.date);
  if (searchForm.period === "day") {
    base = base.add(delta, "month");
  } else if (searchForm.period === "month") {
    base = base.add(delta, "year");
  } else {
    return; // year 视图无日期选择器
  }
  searchForm.date = base.format("YYYY-MM-DD HH:mm:ss");
  fetchHistoryData();
};

// 下一步是否可用（禁止跳到未来）
const isNextDisabled = computed(() => {
  const now = dayjs();
  const current = dayjs(searchForm.date);
  if (searchForm.period === "day") {
    return current.add(1, "month").isAfter(now, "month");
  }
  if (searchForm.period === "month") {
    return current.add(1, "year").isAfter(now, "year");
  }
  return true;
});

// 下载图表图片
const downloadChart = () => {
  const inst = eChartsRef.value?.getInstance?.();
  if (!inst) return;
  const dataUrl = inst.getDataURL({ pixelRatio: 2, backgroundColor: "#fff" });
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `history-chart-${Date.now()}.png`;
  a.click();
};

// 导出为 CSV（Excel 可打开）
const downloadExcel = () => {
  const queryParams = getQueryParams();
  const url = searchForm.type === "energy" ? StatisticApi.getStationEnergyExcel : StatisticApi.getStationPowerExcel;
  useDownload(url, ``, queryParams);
};
</script>

<style lang="scss" scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  .chart-filter {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    .filter-tabs {
      display: flex;

      .tab-item {
        padding: 4px 12px;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        border-radius: 4px;

        &.active {
          background-color: #e8f5e9;
          color: #4caf50;
        }

        &:hover:not(.active) {
          background-color: #f5f5f5;
        }
      }
    }
  }

  .chart-main {
    flex: 1;
    position: relative;

    .chart-bars {
      height: 314px;
      width: 100%;
    }
  }
}
</style>
