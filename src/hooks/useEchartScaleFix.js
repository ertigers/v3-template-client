import { ref, unref } from "vue";

export const useEchartScaleFix = (options = {}) => {
  const scaleClass = options.scaleClass || ".global-screen-scale-s";
  const scaleVar = options.scaleVar || "--screen-scale-s";
  const chartScaleStyle = ref({});

  const getScaleValue = el => {
    if (!el) return 1;
    const scaleRoot = el.closest(scaleClass);
    const scaleSource = scaleRoot || document.documentElement;
    const rawScale = getComputedStyle(scaleSource).getPropertyValue(scaleVar).trim();
    const scale = Number(rawScale);
    return Number.isFinite(scale) && scale > 0 ? scale : 1;
  };

  const syncChartScale = (containerRef, chartRef, baseStyle = {}) => {
    const el = unref(containerRef);
    if (!el) return;
    const scale = getScaleValue(el);
    if (scale === 1) {
      chartScaleStyle.value = { ...baseStyle };
      unref(chartRef)?.resize?.();
      return;
    }
    const inv = 1 / scale;
    chartScaleStyle.value = {
      ...baseStyle,
      zoom: inv,
      transformOrigin: "top left"
    };
    unref(chartRef)?.resize?.();
  };

  return {
    chartScaleStyle,
    syncChartScale
  };
};
