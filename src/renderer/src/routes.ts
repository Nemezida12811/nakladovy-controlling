type Route = {
  title: string;
  printToPDF: boolean;
  save: boolean;
};

export enum RouteName {
  HOME = '/',
  SELECT = '/taskselect',
  ECONOMIC_ANALYSIS = '/economicAnalysis',
  PERETO_ANALYSIS = '/paretoAnalysis',
  SORTIMENT_ANALYSIS = '/sortimentAnalysis',
  CVP_ANALYSIS = '/cvpAnalysis',
  INDEX_ANALYSIS = '/indexAnalysis',
  STRUCTURE_ANALYSIS = '/structureAnalysis',
  TREND_ANALYSIS = '/trendAnalysis',
  VARIATION_ANALYSIS = '/variationAnalysis',
  TAX_ANALYSIS = '/taxAnalysis',
  PROFITABILITY_ANALYSIS = '/profitabilityAnalysis',
  ACTIVITY_ANALYSIS = '/activityAnalysis',
  DEBTS_ANALYSIS = '/debtsAnalysis',
  LIQUIDITY_ANALYSIS = '/liquidityAnalysis',
  EVALUATION = '/evaluation',
}

export const routes: { [key in RouteName]: Route } = {
  [RouteName.HOME]: {
    title: 'Nákladový kontroling',
    printToPDF: false,
    save: false,
  },
  [RouteName.SELECT]: {
    title: 'Prehľad analýz',
    printToPDF: false,
    save: false,
  },
  [RouteName.ECONOMIC_ANALYSIS]: {
    title: 'Ekonomická analýza hospodárenia',
    printToPDF: true,
    save: true,
  },
  [RouteName.STRUCTURE_ANALYSIS]: {
    title: 'Štruktúrna analýza nákladov',
    printToPDF: true,
    save: true,
  },
  [RouteName.CVP_ANALYSIS]: {
    title: 'CVP analýza (COST VOLUME PROFIT ANALYSIS)',
    printToPDF: true,
    save: true,
  },
  [RouteName.SORTIMENT_ANALYSIS]: {
    title: 'Sortimentná analýza',
    printToPDF: true,
    save: true,
  },
  [RouteName.INDEX_ANALYSIS]: {
    title: 'Indexná analýza nákladov',
    printToPDF: true,
    save: true,
  },
  [RouteName.PERETO_ANALYSIS]: {
    title: 'Pareto analýza nákladov',
    printToPDF: true,
    save: true,
  },
  [RouteName.TREND_ANALYSIS]: {
    title: 'Trendová analýza nákladov',
    printToPDF: true,
    save: true,
  },
  [RouteName.VARIATION_ANALYSIS]: {
    title: 'Odchýlková analýza nákladov',
    printToPDF: true,
    save: true,
  },
  [RouteName.TAX_ANALYSIS]: {
    title: 'Daňová analýza nákladov',
    printToPDF: true,
    save: true,

  },
  [RouteName.PROFITABILITY_ANALYSIS]: {
    title: 'Finančná analýza rentability',
    printToPDF: true,
    save: true,

  },
  [RouteName.ACTIVITY_ANALYSIS]: {
    title: 'Finančná analýza aktivity',
    printToPDF: true,
    save: true,

  },
  [RouteName.DEBTS_ANALYSIS]: {
    title: 'Finančná analýza zadlženosti',
    printToPDF: true,
    save: true,

  },
  [RouteName.LIQUIDITY_ANALYSIS]: {
    title: 'Finančná analýza likvidity',
    printToPDF: true,
    save: true,

  },
  [RouteName.EVALUATION]: {
    title: 'Report',
    printToPDF: true,
    save: false,
  },
};
