<template>
  <div>
    <statistics-card :title="$t('home.contactUsTitle')" :show-more="false" style="margin-top: 20px">
      <div class="contact-card">
        <div class="contact-row">
          <div class="left">
            <svg-icon name="MenuHeaderMail" :icon-style="{ width: '20px', height: '20px', color: '#111' }" />
            <span class="label">{{ $t("layouts.header.email") }}</span>
          </div>
          <div class="right">tech@envertec.com</div>
        </div>
      </div>
    </statistics-card>
  </div>
</template>

<script setup>
import StatisticsCard from "./StatisticsCard.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<style lang="scss" scoped>
.contact-card {
  padding: 8px 4px 4px 4px;
}
.contact-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
}
.left {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #111;
}
.mail-icon {
  color: #111;
  fill: #111;
}
.label {
  font-size: 14px;
  color: #111;
}
.right {
  font-size: 14px;
  color: #8c8c8c;
}
</style>
