<template>
  <div ref="mapContainer" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { AMAP_MAP_KEY } from "@/config";

const props = defineProps({
  center: {
    type: Object,
    default: () => ({ lat: 39.9042, lng: 116.4074 })
  },
  zoom: {
    type: Number,
    default: 12
  }
});

const emit = defineEmits(["click", "ready"]);

const mapContainer = ref(null);
let mapInstance = null;
let markerInstance = null;
const isMapReady = ref(false);

// 加载高德地图脚本
const loadAmapScript = () => {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${AMAP_MAP_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Amap script"));
    document.head.appendChild(script);
  });
};

// 初始化地图
const initMap = async () => {
  if (!mapContainer.value) return;

  try {
    await loadAmapScript();

    // 创建地图实例
    mapInstance = new AMap.Map(mapContainer.value, {
      zoom: props.zoom,
      center: [props.center.lng, props.center.lat],
      viewMode: "3D"
    });

    // 地图点击事件
    mapInstance.on("click", event => {
      const { lng, lat } = event.lnglat;
      emit("click", {
        latLng: {
          lat: () => lat,
          lng: () => lng
        }
      });
    });

    // 地图加载完成
    mapInstance.on("complete", () => {
      isMapReady.value = true;
      emit("ready", mapInstance);
    });

    // 如果有中心点，添加标记
    if (props.center) {
      updateMarker();
    }
  } catch (error) {
    console.error("高德地图初始化失败:", error);
  }
};

// 更新标记
const updateMarker = () => {
  if (!mapInstance || !props.center) return;

  // 如果标记已存在，直接更新位置，而不是重新创建
  if (markerInstance) {
    markerInstance.setPosition([props.center.lng, props.center.lat]);
  } else {
    // 创建新标记
    markerInstance = new AMap.Marker({
      position: [props.center.lng, props.center.lat],
      map: mapInstance
    });
  }
};

// 监听中心点变化
watch(
  () => props.center,
  () => {
    if (mapInstance && props.center) {
      mapInstance.setCenter([props.center.lng, props.center.lat]);
      updateMarker();
    }
  },
  { deep: true }
);

// 监听缩放级别变化
watch(
  () => props.zoom,
  newZoom => {
    if (mapInstance) {
      mapInstance.setZoom(newZoom);
    }
  }
);

onMounted(() => {
  initMap();
});

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.destroy();
  }
});

// 暴露方法给父组件
defineExpose({
  get map() {
    return mapInstance;
  },
  get ready() {
    return !!mapInstance && isMapReady.value;
  },
  // 暴露更新标记的方法
  updateMarker
});
</script>
