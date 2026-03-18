<template>
  <statistics-card :title="$t('home.stationStatus.installedCapacity')" style="flex: 1">
    <div class="power-stat-card" style="min-height: 80px">
      <div class="stat-section">
        <div class="section-title">{{ $t("home.stationStatus.currentMonth") }}</div>
        <div class="power-data">
          <div class="power-value">{{ props.stationInfo.currentMonthCapacitor }}</div>
          <div class="power-unit">{{ props.stationInfo.currentMonthCapacitorUnit }}</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="stat-section">
        <div class="section-title">{{ $t("home.stationStatus.totalInstalledCapacity") }}</div>
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
