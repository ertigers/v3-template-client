<template>
  <div>
    <statistics-card :title="showTitle ? $t('home.ecoStats.title') : ''" :show-more="false" style="margin-top: 20px">
      <div class="eco-stats-card">
        <div class="eco-stat-item">
          <div class="eco-info">
            <div class="eco-icon">
              <img class="icon-img" src="@/assets/images/home-icon-t.png" alt="coal icon" />
            </div>
            <div class="eco-title">{{ $t("home.ecoStats.coal") }}</div>
            <div class="eco-value">
              {{ formatW(props.stationInfo.coalSaved, "K") }}
            </div>
            <div class="eco-unit">
              <span>{{ $t("home.ecoStats.coalUnit") }}</span>
            </div>
          </div>
        </div>
        <div class="eco-stat-item">
          <div class="eco-info">
            <div class="eco-icon">
              <img class="icon-img" src="@/assets/images/home-icon-co.png" alt="co2 icon" />
            </div>
            <div class="eco-title">{{ $t("home.ecoStats.co2") }}</div>
            <div class="eco-value">
              {{ formatW(props.stationInfo.co2Reduction, "K") }}
            </div>
            <div class="eco-unit">
              <span>{{ $t("home.ecoStats.co2Unit") }}</span>
            </div>
          </div>
        </div>
        <div class="eco-stat-item">
          <div class="eco-info">
            <div class="eco-icon">
              <img class="icon-img" src="@/assets/images/home-icon-tree.png" alt="tree icon" />
            </div>
            <div class="eco-title">{{ $t("home.ecoStats.tree") }}</div>
            <div class="eco-value">
              {{ formatW(props.stationInfo.trees, "w", 0) }}
            </div>
            <div class="eco-unit">
              <span>{{ $t("home.ecoStats.treeUnit") }}</span>
            </div>
          </div>
        </div>
      </div>
    </statistics-card>
  </div>
</template>

<script setup>
import StatisticsCard from "./StatisticsCard.vue";

import { formatW } from "@/utils/tools";
const props = defineProps({
  stationInfo: {
    type: Object,
    default: () => ({})
  },
  showTitle: {
    type: Boolean,
    default: () => false
  }
});
// 组件逻辑
</script>

<style lang="scss" scoped>
.eco-stats-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  background-color: #fff;
  padding: 0 0 16px;
  border-radius: 20px;

  .eco-stat-item {
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    flex: 1;

    .eco-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      .eco-icon {
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;

        .icon-img {
          width: 60px;
          height: 60px;
          object-fit: contain;
        }
      }
      .eco-title {
        height: 26px;
        font-size: 14px;
        color: #b3b3b3;
        margin: 0px 0 6px 0;
      }

      .eco-value {
        height: 28px;
        font-size: 20px;
        font-weight: 700;
        color: #000;
        margin-top: 10px;
      }

      .eco-unit {
        span {
          font-size: 13px;
          font-weight: normal;
          color: #666;
          margin-left: 2px;
        }
      }
    }
  }
}
</style>
