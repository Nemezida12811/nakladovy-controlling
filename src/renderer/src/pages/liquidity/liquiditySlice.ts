import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootSelectors, RootState } from '../../store/store';
import {
  DefaultState,
  CellType,
  rootReducer,
  sortTableByYear,
} from '../../store/rootReducer';
import isEqual from 'lodash.isequal';

export interface liquidityState extends DefaultState {
}

const initialLiquidityState: liquidityState = {
  textConclusion: '', textEvaluation: '',
  id: 4,
  title: 'liquidity analýza',
  corner: 'Ekonomické veličiny',
  additionalData: {},
  headers: [
    {
      id: '1',
      type: CellType.NUMBER,
      label: '2000',
    },
  ],
  data: [[0], [0], [0], [0],],
  values: [
    {
      id: '1',
      value: '(FM) - finančný majetok (€)',
    },
    {
      id: '2',
      value: '(Zk) - záväzky krátkodobé (€)',
    },
    {
      id: '3',
      value: '(Pk) - Pohľadávky krátkodobé (€)',
    },
    {
      id: '4',
      value: '(Z) - Zásoby (€)'
    },
  ],
  items: [
    '(FM) - finančný majetok (€)',
    '(Zk) - záväzky krátkodobé (€)',
    '(Pk) - Pohľadávky krátkodobé (€)',
    '(Z) - Zásoby (€)'
  ],
  rowTypes: [
    CellType.NUMBER,
    CellType.NUMBER,
    CellType.NUMBER,
    CellType.NUMBER,
  ],
  text: '',
  accounts: [''],
  sortable: true,
  hasAnalytic: false,
  dynRows: false,
  dynCols: true
};

const liquiditySlice = createSlice({
  name: 'liquidity',
  initialState: initialLiquidityState,
  reducers: {
    ...rootReducer,
    reset: (state) => {
      state.headers = initialLiquidityState.headers;
      state.data = initialLiquidityState.data;
      state.items = initialLiquidityState.items;
      state.values = initialLiquidityState.values;
      state.text = initialLiquidityState.text;
      state.additionalData = initialLiquidityState.additionalData;
    },
    setAdditionalData: (state, action: PayloadAction<{ key: string; value: number | string }>) => {
      if (!state.additionalData) state.additionalData = {};
      (state.additionalData as any)[action.payload.key] = Number(action.payload.value);
    },
    openProject: (state: liquidityState, action: PayloadAction<liquidityState>) => {
      state.headers = action.payload.headers;
      state.data = action.payload.data;
      state.items = action.payload.items;
      state.values = action.payload.values;
      state.text = action.payload.text;
      state.additionalData = action.payload.additionalData;
    },
    ...sortTableByYear,
  },
});

export const liquidityActions = liquiditySlice.actions;
export const liquidityReducer = liquiditySlice.reducer;

export const selectLiquidity = (state: RootState) => state.liquidity;

export const hasLiquidityChanged = (state: RootState) => {
  return !isEqual(state.liquidity, initialLiquidityState);
};

export const selectors: RootSelectors = {
  headers: createSelector(
    [(state: RootState) => state.liquidity.headers],
    (headers) => headers,
  ),
  selectHeaderByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.liquidity.headers],
      (headers) => headers[index],
    ),
  values: createSelector(
    [(state: RootState) => state.liquidity.values],
    (values) => values,
  ),
  selectValueByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.liquidity.values],
      (values) => values[index],
    ),
  data: createSelector([(state: RootState) => state.liquidity.data], (data) => data),
  selectDataByPosition: (row: number, col: number) =>
    createSelector(
      [(state: RootState) => state.liquidity.data],
      (data) => data[row][col],
    ),
  dynRows: createSelector(
    [(state: RootState) => state.liquidity.dynRows],
    (dynRows) => dynRows,
  ),
  dynCols: createSelector(
    [(state: RootState) => state.liquidity.dynCols],
    (dynCols) => dynCols,
  ),
  text: createSelector([(state: RootState) => state.liquidity.text], (text) => text),
  textConclusion: createSelector(
    [(state: RootState) => state.liquidity.textConclusion],
    (text) => text,
  ),
  textEvaluation: createSelector(
    [(state: RootState) => state.liquidity.textEvaluation],
    (text) => text,
  ),
  items: createSelector(
    [(state: RootState) => state.liquidity.items],
    (items) => items,
  ),
  corner: createSelector(
    [(state: RootState) => state.liquidity.corner],
    (corner) => corner,
  ),
  itemSelectOptions: createSelector(
    [(state: RootState) => state.liquidity.itemSelectOptions],
    (itemSelectOptions) => itemSelectOptions ?? [],
  ),
  getRowType: (index) =>
    createSelector(
      [(state: RootState) => state.liquidity.rowTypes],
      (rowTypes) => rowTypes[index],
    ),
  // @ts-ignore
  getAdditionalData: createSelector(
    [(state: RootState) => state.liquidity],
    (liquidityData) => liquidityData.additionalData,
  ),
};
