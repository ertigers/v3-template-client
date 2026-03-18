<template>
  <statistics-card :title="$t('home.stationStatus.powerGeneration')" style="flex: 1">
    <div class="power-stat-card" style="min-height: 80px">
      <div class="stat-section">
        <div class="section-title">{{ $t("home.stationStatus.currentMonth") }}</div>
        <div class="power-data">
          <div class="power-value">{{ props.stationInfo.currentMonthPower }}</div>
          <div class="power-unit">{{ props.stationInfo.currentMonthPowerUnit }}</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="stat-section">
        <div class="section-title">{{ $t("home.stationStatus.totalPowerGeneration") }}</div>
        <div class="power-data">
          <div class="power-value">{{ props.stationInfo.totalPower }}</div>
          <div class="power-unit">{{ props.stationInfo.totalPowerUnit }}</div>
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
