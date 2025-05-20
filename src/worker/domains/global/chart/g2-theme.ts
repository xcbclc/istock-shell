import type { LightTheme, DarkTheme } from '@antv/g2';

/**
 * 从CSS变量中获取颜色值
 * @param variables CSS变量对象
 * @param key 变量名，如 --color-primary
 * @returns 颜色值
 */
const getColorFromVar = (variables: Record<string, string>, key: string): string => {
  return variables[key];
};

export const getG2Theme = (variables?: Record<string, string>): LightTheme | DarkTheme => {
  if (!variables) return {};
  // 提取主题颜色
  const primaryColor = getColorFromVar(variables, '--color-primary');
  const primaryContentColor = getColorFromVar(variables, '--color-primary-content');
  const secondaryColor = getColorFromVar(variables, '--color-secondary');
  const accentColor = getColorFromVar(variables, '--color-accent');
  const neutralColor = getColorFromVar(variables, '--color-neutral');
  const baseContentColor = getColorFromVar(variables, '--color-base-content');
  const infoColor = getColorFromVar(variables, '--color-info');
  const successColor = getColorFromVar(variables, '--color-success');
  const warningColor = getColorFromVar(variables, '--color-warning');
  const errorColor = getColorFromVar(variables, '--color-error');
  const textColor = getColorFromVar(variables, '--color-base-content');

  return {
    padding: 'auto',
    margin: 16,
    size: 1,
    color: primaryColor,
    category10: [
      primaryColor, // 主色
      secondaryColor, // 辅色
      accentColor, // 强调色
      errorColor, // 错误色
      infoColor, // 信息色
      successColor, // 成功色
      warningColor, // 警告色
      neutralColor, // 中性色
      primaryContentColor, // 主色内容
      baseContentColor, // 基础内容色
    ],
    category20: [
      primaryColor, // 主色
      secondaryColor, // 辅色
      accentColor, // 强调色
      errorColor, // 错误色
      infoColor, // 信息色
      successColor, // 成功色
      warningColor, // 警告色
      neutralColor, // 中性色
      primaryContentColor, // 主色内容
      baseContentColor, // 基础内容色
      '#AABA01',
      '#BC7CFC',
      '#237CBC',
      '#2DE379',
      '#CE8032',
      '#FF7AF4',
      '#545FD3',
      '#AFE410',
      '#D8C608',
      '#FFA1E0',
    ],
    enter: {
      duration: 300,
      fill: 'both',
      delay: 0,
    },
    update: {
      duration: 300,
      fill: 'both',
      delay: 0,
    },
    exit: {
      duration: 300,
      fill: 'both',
      delay: 0,
    },
    view: {
      viewFill: 'transparent',
      plotFill: 'transparent',
      mainFill: 'transparent',
      contentFill: 'transparent',
    },
    line: {
      line: {
        fill: '',
        strokeOpacity: 1,
        lineWidth: 1,
        lineCap: 'round',
      },
    },
    point: {
      point: {
        r: 3,
        fillOpacity: 0.95,
        lineWidth: 0,
      },
      hollow: {
        r: 3,
        strokeOpacity: 0.95,
        lineWidth: 1,
      },
      plus: {
        r: 3,
        strokeOpacity: 0.95,
        lineWidth: 3,
      },
      diamond: {
        r: 3,
        strokeOpacity: 0.95,
        lineWidth: 1,
      },
    },
    interval: {
      rect: {
        fillOpacity: 0.95,
      },
      hollow: {
        fill: '',
        strokeOpacity: 1,
        lineWidth: 2,
      },
    },
    area: {
      area: {
        fillOpacity: 0.85,
        lineWidth: 0,
      },
    },
    polygon: {
      polygon: {
        fillOpacity: 0.95,
      },
    },
    cell: {
      cell: {
        fillOpacity: 0.95,
      },
      hollow: {
        fill: '',
        strokeOpacity: 1,
        lineWidth: 2,
      },
    },
    rect: {
      rect: {
        fillOpacity: 0.95,
      },
      hollow: {
        fill: '',
        strokeOpacity: 1,
        lineWidth: 2,
      },
    },
    link: {
      link: {
        fill: '',
        strokeOpacity: 1,
      },
    },
    vector: {
      vector: {
        fillOpacity: 1,
      },
    },
    box: {
      box: {
        fillOpacity: 0.95,
        stroke: primaryColor,
        lineWidth: 1,
      },
    },
    text: {
      text: {
        fill: baseContentColor,
        fontSize: 12,
        lineWidth: 0,
        connectorStroke: neutralColor,
        connectorStrokeOpacity: 0.45,
        connectorLineWidth: 1,
        backgroundFill: neutralColor,
        backgroundFillOpacity: 0.15,
        backgroundPadding: [2, 4],
        startMarkerSymbol: 'circle',
        startMarkerSize: 4,
        endMarkerSymbol: 'circle',
        endMarkerSize: 4,
      },
      badge: {
        fill: baseContentColor,
        fillOpacity: 0.65,
        lineWidth: 0,
        fontSize: 10,
        textAlign: 'center',
        textBaseline: 'middle',
        markerFill: neutralColor,
        markerFillOpacity: 0.25,
        markerStrokeOpacity: 0,
      },
    },
    lineX: {
      line: {
        stroke: neutralColor,
        strokeOpacity: 0.45,
        lineWidth: 1,
      },
    },
    lineY: {
      line: {
        stroke: neutralColor,
        strokeOpacity: 0.45,
        lineWidth: 1,
      },
    },
    rangeX: {
      range: {
        fill: neutralColor,
        fillOpacity: 0.15,
        lineWidth: 0,
      },
    },
    rangeY: {
      range: {
        fill: neutralColor,
        fillOpacity: 0.15,
        lineWidth: 0,
      },
    },
    connector: {
      connector: {
        stroke: neutralColor,
        strokeOpacity: 0.45,
        lineWidth: 1,
        connectLength1: 12,
        endMarker: true,
        endMarkerSize: 6,
        endMarkerFill: neutralColor,
        endMarkerFillOpacity: 0.95,
      },
    },
    axis: {
      arrow: false,
      gridLineDash: [3, 4],
      gridLineWidth: 0.5,
      gridStroke: primaryColor,
      gridStrokeOpacity: 0.25,
      labelAlign: 'horizontal',
      labelFill: textColor,
      labelOpacity: 0.45,
      labelFontSize: 12,
      labelFontWeight: 'normal',
      labelSpacing: 8,
      line: false,
      lineLineWidth: 0.5,
      lineStroke: primaryColor,
      lineStrokeOpacity: 0.45,
      tickLength: 4,
      tickLineWidth: 1,
      tickStroke: primaryColor,
      tickOpacity: 0.45,
      titleFill: textColor,
      titleOpacity: 0.9,
      titleFontSize: 12,
      titleFontWeight: 'normal',
      titleSpacing: 12,
      titleTransformOrigin: 'center',
      lineArrowOffset: 6,
      lineArrowSize: 6,
    },
    axisTop: {
      gridDirection: 'positive',
      labelDirection: 'negative',
      tickDirection: 'negative',
      titlePosition: 'top',
      titleSpacing: 12,
      labelSpacing: 4,
      titleTextBaseline: 'middle',
    },
    axisBottom: {
      gridDirection: 'negative',
      labelDirection: 'positive',
      tickDirection: 'positive',
      titlePosition: 'bottom',
      titleSpacing: 12,
      labelSpacing: 4,
      titleTextBaseline: 'bottom',
      titleTransform: 'translate(0, 8)',
    },
    axisLeft: {
      gridDirection: 'positive',
      labelDirection: 'negative',
      labelSpacing: 4,
      tickDirection: 'negative',
      titlePosition: 'left',
      titleSpacing: 12,
      titleTextBaseline: 'middle',
      titleDirection: 'vertical',
      titleTransform: 'rotate(-90) translate(0, -8)',
      titleTransformOrigin: 'center',
    },
    axisRight: {
      gridDirection: 'negative',
      labelDirection: 'positive',
      labelSpacing: 4,
      tickDirection: 'positive',
      titlePosition: 'right',
      titleSpacing: 12,
      titleTextBaseline: 'top',
      titleDirection: 'vertical',
      titleTransformOrigin: 'center',
    },
    axisLinear: {
      girdClosed: true,
      gridConnect: 'arc',
      gridDirection: 'negative',
      gridType: 'surround',
      titlePosition: 'top',
      titleSpacing: 0,
    },
    axisArc: {
      title: false,
      titlePosition: 'inner',
      line: false,
      tick: true,
      labelSpacing: 4,
    },
    axisRadar: {
      girdClosed: true,
      gridStrokeOpacity: 0.3,
      gridType: 'surround',
      label: false,
      tick: false,
      titlePosition: 'start',
    },
    legendCategory: {
      backgroundFill: 'transparent',
      itemBackgroundFill: 'transparent',
      itemLabelFill: textColor,
      itemLabelFillOpacity: 0.9,
      itemLabelFontSize: 12,
      itemLabelFontWeight: 'normal',
      itemMarkerFillOpacity: 1,
      itemMarkerSize: 8,
      itemSpacing: [8, 8],
      itemValueFill: primaryColor,
      itemValueFillOpacity: 0.65,
      itemValueFontSize: 12,
      itemValueFontWeight: 'normal',
      navButtonFill: primaryColor,
      navButtonFillOpacity: 0.65,
      navPageNumFill: primaryColor,
      navPageNumFillOpacity: 0.45,
      navPageNumFontSize: 12,
      padding: 8,
      title: false,
      titleFill: textColor,
      titleFillOpacity: 0.65,
      titleFontSize: 12,
      titleFontWeight: 'normal',
      titleSpacing: 4,
      tickStroke: primaryColor,
      tickStrokeOpacity: 0.25,
      rowPadding: 8,
      colPadding: 12,
      maxRows: 3,
      maxCols: 3,
    },
    legendContinuous: {
      handleHeight: 12,
      handleLabelFill: primaryColor,
      handleLabelFillOpacity: 0.45,
      handleLabelFontSize: 12,
      handleLabelFontWeight: 'normal',
      handleMarkerFill: primaryColor,
      handleMarkerFillOpacity: 0.6,
      handleMarkerLineWidth: 1,
      handleMarkerStroke: primaryColor,
      handleMarkerStrokeOpacity: 0.25,
      handleWidth: 10,
      labelFill: primaryColor,
      labelFillOpacity: 0.45,
      labelFontSize: 12,
      labelFontWeight: 'normal',
      labelSpacing: 3,
      tick: true,
      tickLength: 12,
      ribbonSize: 12,
      ribbonFill: neutralColor,
      handle: true,
      handleLabel: false,
      handleShape: 'slider',
      handleIconSize: 6.666666666666666,
      indicator: false,
      titleFontSize: 12,
      titleSpacing: 4,
      titleFontWeight: 'normal',
      titleFillOpacity: 0.9,
      tickStroke: primaryColor,
      tickStrokeOpacity: 0.45,
    },
    label: {
      fill: textColor,
      fillOpacity: 0.65,
      fontSize: 12,
      fontWeight: 'normal',
      offset: 12,
      connectorStroke: primaryColor,
      connectorStrokeOpacity: 0.45,
      connectorLineWidth: 1,
      connectorLength: 12,
      connectorLength2: 8,
      connectorDistance: 4,
    },
    innerLabel: {
      fill: textColor,
      fontSize: 12,
      fillOpacity: 0.85,
      fontWeight: 'normal',
      offset: 0,
    },
    htmlLabel: {
      fontSize: 12,
      opacity: 0.65,
      color: primaryColor,
      fontWeight: 'normal',
    },
    slider: {
      trackSize: 16,
      trackFill: neutralColor,
      trackFillOpacity: 1,
      selectionFill: neutralColor,
      selectionFillOpacity: 0.15,
      handleIconSize: 10,
      handleIconFill: primaryContentColor,
      handleIconFillOpacity: 1,
      handleIconStroke: primaryColor,
      handleIconStrokeOpacity: 0.25,
      handleIconLineWidth: 1,
      handleIconRadius: 2,
      handleLabelFill: primaryColor,
      handleLabelFillOpacity: 0.45,
      handleLabelFontSize: 12,
      handleLabelFontWeight: 'normal',
    },
    scrollbar: {
      padding: [0, 0, 0, 0],
      trackSize: 6,
      isRound: true,
      slidable: true,
      scrollable: true,
      trackFill: neutralColor,
      trackFillOpacity: 0.1,
      thumbFill: primaryColor,
      thumbFillOpacity: 0.15,
      thumbHighlightedFillOpacity: 0.2,
    },
    title: {
      spacing: 8,
      titleFill: primaryColor,
      titleFillOpacity: 0.9,
      titleFontSize: 16,
      titleFontWeight: 'bold',
      titleTextBaseline: 'top',
      subtitleFill: primaryColor,
      subtitleFillOpacity: 0.65,
      subtitleFontSize: 12,
      subtitleFontWeight: 'normal',
      subtitleTextBaseline: 'top',
    },
    tooltip: {
      css: {
        '.g2-tooltip': {
          'font-family': 'sans-serif',
          'background-color': variables?.['--color-base-100'] || 'white',
          color: baseContentColor,
          'border-color': primaryColor,
        },
      },
    },
  };
};
