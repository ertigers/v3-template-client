export const PV_PANEL_CONFIG = {
  width: 80,
  height: 140,
  fill: "#0B4FC8",
  stroke: "#0B4FC8",
  strokeWidth: 0,
  borderRadius: 4,
  textColor: "#fff",
  valueFontSize: 24,
  unitFontSize: 16,
  snFontSize: 10,
  valueY: -40,
  unitY: -10,
  snY: 50,
  gridColor: "#4C81CD",
  gridColor2: "#A5A5A5",
  overlayFill: "#58B86B",
  offlineFill: "#7E7E7E",
  outlineWidth: 2,
  outlineColor: "#FFD700",
  alarmColor: "#dc2626"
};

export const getPVNodeMarkup = () => [
  { tagName: "rect", selector: "focusOutline" },
  { tagName: "rect", selector: "body" },
  { tagName: "line", selector: "gridV1" },
  { tagName: "line", selector: "gridV2" },
  { tagName: "line", selector: "gridH1" },
  { tagName: "line", selector: "gridH2" },
  { tagName: "line", selector: "gridH3" },
  { tagName: "line", selector: "gridH4" },
  { tagName: "rect", selector: "bottomArea" },
  { tagName: "text", selector: "valueText" },
  { tagName: "text", selector: "unitText" },
  { tagName: "text", selector: "snText" }
];

export const buildPVNodeAttrs = (width, height, snText) => {
  const outlineWidth = PV_PANEL_CONFIG.outlineWidth;
  const outlineOffset = outlineWidth / 2;
  const outlineRadius = PV_PANEL_CONFIG.borderRadius + outlineOffset;
  const v1 = Math.round(width / 3);
  const v2 = Math.round((width / 3) * 2);
  const h1 = Math.round(height / 5);
  const h2 = Math.round((height / 5) * 2);
  const h3 = Math.round((height / 5) * 3);
  const h4 = Math.round((height / 5) * 4);
  return {
    focusOutline: {
      stroke: PV_PANEL_CONFIG.outlineColor,
      strokeWidth: outlineWidth,
      fill: "none",
      rx: outlineRadius,
      ry: outlineRadius,
      width: width + outlineWidth,
      height: height + outlineWidth,
      x: -outlineOffset,
      y: -outlineOffset,
      opacity: 0
    },
    body: {
      fill: PV_PANEL_CONFIG.fill,
      stroke: PV_PANEL_CONFIG.stroke,
      strokeWidth: PV_PANEL_CONFIG.strokeWidth,
      rx: PV_PANEL_CONFIG.borderRadius,
      ry: PV_PANEL_CONFIG.borderRadius,
      width,
      height
    },
    bottomArea: {
      fill: PV_PANEL_CONFIG.overlayFill,
      width: width,
      strokeWidth: 0,
      height: 0,
      x: 0,
      y: height
    },
    gridV1: {
      stroke: PV_PANEL_CONFIG.gridColor,
      strokeWidth: 1,
      x1: v1,
      y1: 0,
      x2: v1,
      y2: height
    },
    gridV2: {
      stroke: PV_PANEL_CONFIG.gridColor,
      strokeWidth: 1,
      x1: v2,
      y1: 0,
      x2: v2,
      y2: height
    },
    gridH1: {
      stroke: PV_PANEL_CONFIG.gridColor,
      strokeWidth: 1,
      x1: 0,
      y1: h1,
      x2: width,
      y2: h1
    },
    gridH2: {
      stroke: PV_PANEL_CONFIG.gridColor,
      strokeWidth: 1,
      x1: 0,
      y1: h2,
      x2: width,
      y2: h2
    },
    gridH3: {
      stroke: PV_PANEL_CONFIG.gridColor,
      strokeWidth: 1,
      x1: 0,
      y1: h3,
      x2: width,
      y2: h3
    },
    gridH4: {
      stroke: PV_PANEL_CONFIG.gridColor,
      strokeWidth: 1,
      x1: 0,
      y1: h4,
      x2: width,
      y2: h4
    },
    valueText: {
      text: "0",
      fill: "#fff",
      fontSize: PV_PANEL_CONFIG.valueFontSize,
      fontWeight: "bold",
      textAnchor: "middle",
      textVerticalAnchor: "middle",
      x: 0,
      y: PV_PANEL_CONFIG.valueY
    },
    unitText: {
      text: "W",
      fill: "#fff",
      fontSize: PV_PANEL_CONFIG.unitFontSize,
      fontWeight: "bold",
      textAnchor: "middle",
      textVerticalAnchor: "middle",
      x: 0,
      y: PV_PANEL_CONFIG.unitY
    },
    snText: {
      text: snText,
      fill: PV_PANEL_CONFIG.textColor,
      fontSize: PV_PANEL_CONFIG.snFontSize,
      fontWeight: "bold",
      textAnchor: "middle",
      textVerticalAnchor: "middle",
      x: 0,
      y: PV_PANEL_CONFIG.snY
    }
  };
};

export const applyPVOutlineState = (node, { isSelected, status }) => {
  if (!node) return;

  // 选中状态是优先的--
  if (isSelected) {
    node.attr("focusOutline/stroke", PV_PANEL_CONFIG.outlineColor);
    node.attr("focusOutline/opacity", 1);
  }
  // 再判断本身状态
  if (status) {
    const isOffline = status === "OFFLINE";
    const isAlarmState = status === "ALARM";
    if (isOffline) {
      node.attr("body/fill", PV_PANEL_CONFIG.offlineFill);
      node.attr("gridV1/stroke", PV_PANEL_CONFIG.gridColor2);
      node.attr("gridV2/stroke", PV_PANEL_CONFIG.gridColor2);
      node.attr("gridH1/stroke", PV_PANEL_CONFIG.gridColor2);
      node.attr("gridH2/stroke", PV_PANEL_CONFIG.gridColor2);
      node.attr("gridH3/stroke", PV_PANEL_CONFIG.gridColor2);
      node.attr("gridH4/stroke", PV_PANEL_CONFIG.gridColor2);
    } else {
      node.attr("body/fill", PV_PANEL_CONFIG.fill);
      node.attr("gridV1/stroke", PV_PANEL_CONFIG.gridColor);
      node.attr("gridV2/stroke", PV_PANEL_CONFIG.gridColor);
      node.attr("gridH1/stroke", PV_PANEL_CONFIG.gridColor);
      node.attr("gridH2/stroke", PV_PANEL_CONFIG.gridColor);
      node.attr("gridH3/stroke", PV_PANEL_CONFIG.gridColor);
      node.attr("gridH4/stroke", PV_PANEL_CONFIG.gridColor);
    }
    // 处理报警状态
    if (isAlarmState) {
      node.attr("focusOutline/stroke", PV_PANEL_CONFIG.alarmColor);
      node.attr("focusOutline/opacity", 1);
      return;
    }
  }
  if (!isSelected) node.attr("focusOutline/opacity", 0);
};
