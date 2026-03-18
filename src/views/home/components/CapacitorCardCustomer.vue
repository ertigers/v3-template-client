<template>
  <statistics-card title="" :show-more="false" style="flex: 1">
    <div class="power-stat-card">
      <div class="stat-section">
        <div class="title">{{ $t("home.stationStatus.powerGeneration") }}</div>
        <div class="section-title section-title2">{{ $t("home.stationStatus.currentMonth") }}</div>
        <div class="power-data">
          <div class="power-value">{{ props.stationInfo.currentMonthPower }}</div>
          <div class="power-unit">{{ props.stationInfo.currentMonthPowerUnit }}</div>
        </div>
      </div>
      <div class="stat-section">
        <div class="title"></div>
        <div class="section-title section-title2">{{ $t("home.stationStatus.totalPowerGeneration") }}</div>
        <div class="power-data">
          <div class="power-value">{{ props.stationInfo.totalPower }}</div>
          <div class="power-unit">{{ props.stationInfo.totalPowerUnit }}</div>
        </div>
      </div>
      <div class="stat-section">
        <div class="title">{{ $t("home.stationStatus.installedCapacity") }}</div>
        <div class="section-title section-title2">{{ $t("home.stationStatus.totalInstalledCapacity") }}</div>
        <div class="power-data">
          <div class="power-value">{{ props.stationInfo.totalCapacitor }}</div>
          <div class="power-unit">{{ props.stationInfo.totalCapacitorUnit }}</div>
        </div>
      </div>
    </div>
  </statistics-card>
</template>

<script setup>
import StatisticsCard from "./StatisticsCard.vue";

const props = defineProps({
  stationInfo: {
    type: Object,
    default: () => ({})
  }
});
</script>

<style lang="scss" scoped>
@use "./block-card.scss" as *;
</style>
