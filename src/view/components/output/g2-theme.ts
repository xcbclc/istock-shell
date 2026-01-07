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

  // 提取基础颜色 (DaisyUI语义色)
  const primaryColor = getColorFromVar(variables, '--color-primary') || '#570df8';
  const primaryContentColor = getColorFromVar(variables, '--color-primary-content') || '#ffffff';
  const secondaryColor = getColorFromVar(variables, '--color-secondary') || '#f000b8';
  const accentColor = getColorFromVar(variables, '--color-accent') || '#37cdbe';
  const neutralColor = getColorFromVar(variables, '--color-neutral') || '#3d4451';
  const neutralContentColor = getColorFromVar(variables, '--color-neutral-content') || '#ffffff';

  // 提取状态颜色
  const infoColor = getColorFromVar(variables, '--color-info') || '#3abff8';
  const successColor = getColorFromVar(variables, '--color-success') || '#36d399';
  const warningColor = getColorFromVar(variables, '--color-warning') || '#fbbd23';
  const errorColor = getColorFromVar(variables, '--color-error') || '#f87272';

  // 提取基础背景和文本色
  const base100Color = getColorFromVar(variables, '--color-base-100') || '#ffffff';
  const base200Color = getColorFromVar(variables, '--color-base-200') || '#f9fafb';
  const base300Color = getColorFromVar(variables, '--color-base-300') || '#d1d5db';
  const baseContentColor = getColorFromVar(variables, '--color-base-content') || '#1f2937';

  // 辅助函数：给颜色添加透明度 (简单模拟，实际G2支持rgba/opacity配置，这里用于默认样式)
  // 由于输入可能是hex/rgb/hsl，这里主要依赖G2的opacity属性配置，尽量少操作颜色字符串

  return {
    padding: 'auto',
    margin: 16,
    size: 1,
    color: primaryColor,

    // 调色板：优先使用主题色，形成协调的视觉效果
    category10: [
      primaryColor, // 1. 主色
      secondaryColor, // 2. 辅色
      accentColor, // 3. 强调色
      neutralColor, // 4. 中性色
      infoColor, // 5. 信息
      successColor, // 6. 成功
      warningColor, // 7. 警告
      errorColor, // 8. 错误
      '#6366f1', // 9. 补充色 (Indigo)
      '#8b5cf6', // 10. 补充色 (Violet)
    ],
    category20: [
      primaryColor,
      secondaryColor,
      accentColor,
      neutralColor,
      infoColor,
      successColor,
      warningColor,
      errorColor,
      '#6366f1',
      '#8b5cf6',
      '#ec4899',
      '#14b8a6',
      '#f59e0b',
      '#d946ef',
      '#06b6d4',
      '#84cc16',
      '#e11d48',
      '#0ea5e9',
      '#f43f5e',
      '#10b981',
    ],

    enter: { duration: 300, fill: 'both', delay: 0 },
    update: { duration: 300, fill: 'both', delay: 0 },
    exit: { duration: 300, fill: 'both', delay: 0 },

    view: {
      viewFill: 'transparent',
      plotFill: 'transparent',
      mainFill: 'transparent',
      contentFill: 'transparent',
    },

    // 图形样式适配
    line: {
      line: {
        fill: '',
        strokeOpacity: 1,
        lineWidth: 2, // 增加线宽提升可视性
        lineCap: 'round',
        lineJoin: 'round',
      },
    },
    point: {
      point: {
        r: 4, // 稍微调大点
        fillOpacity: 0.95,
        lineWidth: 1,
        stroke: base100Color, // 加上描边增加对比度
      },
      hollow: {
        r: 4,
        strokeOpacity: 0.95,
        lineWidth: 2,
      },
      plus: { r: 4, strokeOpacity: 0.95, lineWidth: 3 },
      diamond: { r: 4, strokeOpacity: 0.95, lineWidth: 1 },
    },
    interval: {
      rect: {
        fillOpacity: 0.9,
        radius: 4, // 圆角柱状图，更现代
      },
      hollow: {
        fill: '',
        strokeOpacity: 1,
        lineWidth: 2,
        radius: 4,
      },
    },
    area: {
      area: {
        fillOpacity: 0.4, // 面积图透明度
        lineWidth: 0,
      },
    },
    polygon: {
      polygon: { fillOpacity: 0.95 },
    },
    cell: {
      cell: { fillOpacity: 0.95 },
      hollow: { fill: '', strokeOpacity: 1, lineWidth: 2 },
    },
    rect: {
      rect: { fillOpacity: 0.95, radius: 2 },
      hollow: { fill: '', strokeOpacity: 1, lineWidth: 2, radius: 2 },
    },
    link: {
      link: { fill: '', strokeOpacity: 1 },
    },
    vector: {
      vector: { fillOpacity: 1 },
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
        connectorStroke: baseContentColor,
        connectorStrokeOpacity: 0.45,
        backgroundFill: base100Color,
        backgroundFillOpacity: 0.8,
        backgroundPadding: [2, 4],
      },
      badge: {
        fill: baseContentColor,
        fillOpacity: 0.65,
        lineWidth: 0,
        fontSize: 10,
        textAlign: 'center',
        textBaseline: 'middle',
        markerFill: baseContentColor,
        markerFillOpacity: 0.25,
        markerStrokeOpacity: 0,
      },
    },

    // 辅助线组件 (Axis, Legend, etc.)
    // 使用 baseContentColor 作为主要文字颜色，降低透明度作为辅助线颜色，保证在亮/暗模式下的自适应

    lineX: {
      line: {
        stroke: baseContentColor,
        strokeOpacity: 0.2, // 弱化辅助线
        lineWidth: 1,
      },
    },
    lineY: {
      line: {
        stroke: baseContentColor,
        strokeOpacity: 0.2,
        lineWidth: 1,
      },
    },
    rangeX: {
      range: {
        fill: baseContentColor,
        fillOpacity: 0.05,
        lineWidth: 0,
      },
    },
    rangeY: {
      range: {
        fill: baseContentColor,
        fillOpacity: 0.05,
        lineWidth: 0,
      },
    },
    connector: {
      connector: {
        stroke: baseContentColor,
        strokeOpacity: 0.45,
        lineWidth: 1,
        connectLength1: 12,
        endMarker: true,
        endMarkerSize: 6,
        endMarkerFill: baseContentColor,
        endMarkerFillOpacity: 0.95,
      },
    },

    // 坐标轴设计：极简风格
    axis: {
      arrow: false,
      gridLineDash: [0, 0], // 实线更现代，或者[3,3]虚线
      gridLineWidth: 1,
      gridStroke: baseContentColor,
      gridStrokeOpacity: 0.08, // 极淡的网格线
      labelAlign: 'horizontal',
      labelFill: baseContentColor,
      labelOpacity: 0.75, // 文字稍微淡一点
      labelFontSize: 12,
      labelFontWeight: 'normal',
      labelSpacing: 8,
      line: false, // 隐藏轴线，只保留网格
      lineLineWidth: 1,
      lineStroke: baseContentColor,
      lineStrokeOpacity: 0.2,
      tickLength: 4,
      tickLineWidth: 1,
      tickStroke: baseContentColor,
      tickOpacity: 0.2,
      titleFill: baseContentColor,
      titleOpacity: 0.9,
      titleFontSize: 12,
      titleFontWeight: 'bold', // 标题加粗
      titleSpacing: 12,
      titleTransformOrigin: 'center',
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

    // 图例设计
    legendCategory: {
      backgroundFill: 'transparent',
      itemLabelFill: baseContentColor,
      itemLabelFillOpacity: 0.9,
      itemLabelFontSize: 12,
      itemLabelFontWeight: 'normal',
      itemMarkerFillOpacity: 1,
      itemMarkerSize: 8,
      itemSpacing: [8, 8],
      itemValueFill: baseContentColor, // 数值也用内容色
      itemValueFillOpacity: 0.65,
      itemValueFontSize: 12,
      navButtonFill: baseContentColor,
      navButtonFillOpacity: 0.65,
      navPageNumFill: baseContentColor,
      navPageNumFillOpacity: 0.45,
      padding: 8,
      title: false,
      titleFill: baseContentColor,
      titleFillOpacity: 0.9,
    },
    legendContinuous: {
      handleLabelFill: baseContentColor,
      handleMarkerFill: primaryColor,
      handleMarkerStroke: primaryColor,
      labelFill: baseContentColor,
      labelFillOpacity: 0.65,
      ribbonFill: base200Color, // 滑块背景
      tickStroke: baseContentColor,
      tickStrokeOpacity: 0.25,
      titleFill: baseContentColor,
      titleFillOpacity: 0.9,
    },

    label: {
      fill: baseContentColor,
      fillOpacity: 0.85,
      fontSize: 12,
      fontWeight: 'normal',
      offset: 12,
      connectorStroke: baseContentColor,
      connectorStrokeOpacity: 0.45,
    },
    innerLabel: {
      fill: '#ffffff', // 内部标签通常在颜色块上，用白色或根据亮度计算反色（这里简化为白色）
      fontSize: 12,
      fillOpacity: 1,
      fontWeight: 'normal',
      offset: 0,
    },
    htmlLabel: {
      fontSize: 12,
      opacity: 0.9,
      color: baseContentColor,
      fontWeight: 'normal',
    },

    slider: {
      trackSize: 20,
      trackFill: base200Color,
      trackFillOpacity: 1,
      selectionFill: primaryColor,
      selectionFillOpacity: 0.15,
      handleIconFill: base100Color,
      handleIconStroke: primaryColor,
      handleIconRadius: 2,
      handleLabelFill: baseContentColor,
      handleLabelFillOpacity: 0.75,
    },
    scrollbar: {
      trackFill: base200Color,
      trackFillOpacity: 0.5,
      thumbFill: baseContentColor,
      thumbFillOpacity: 0.2,
      thumbHighlightedFillOpacity: 0.4,
    },

    title: {
      spacing: 8,
      titleFill: baseContentColor,
      titleFillOpacity: 1,
      titleFontSize: 16,
      titleFontWeight: 'bold',
      subtitleFill: baseContentColor,
      subtitleFillOpacity: 0.65,
      subtitleFontSize: 12,
    },

    // Tooltip: 模仿 DaisyUI 的 Card/Popover 样式
    tooltip: {
      css: {
        '.g2-tooltip': {
          'font-family':
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          'background-color': base100Color, // 使用 base-100 作为背景
          color: baseContentColor, // 使用 base-content 作为文字
          border: `1px solid ${base200Color}`, // 边框
          'border-radius': '0.5rem', // 圆角 (rounded-lg)
          'box-shadow': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // 阴影 (shadow-lg)
          padding: '8px 12px',
          transition: 'all 0.15s ease-out',
        },
        '.g2-tooltip-title': {
          'margin-bottom': '8px',
          'font-weight': '600',
          color: baseContentColor,
        },
        '.g2-tooltip-list-item': {
          'margin-bottom': '4px',
        },
        '.g2-tooltip-list-item-name': {
          color: baseContentColor,
          opacity: '0.7',
          'margin-right': '8px',
        },
        '.g2-tooltip-list-item-value': {
          color: baseContentColor,
          'font-weight': '500',
        },
      },
    },
  };
};
