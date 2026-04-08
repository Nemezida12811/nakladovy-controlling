import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootSelectors, RootState } from '../../store/store';
import {
  DefaultState,
  CellType,
  rootReducer,
  sortTableByYear,
} from '../../store/rootReducer';
import isEqual from 'lodash.isequal';

export interface profitabilityState extends DefaultState {
}

const initialProfitabilityState: profitabilityState = {
  textConclusion: '', textEvaluation: '',
  id: 8,
  title: 'profitability analýza',
  corner: 'Ekonomické veličiny',
  headers: [
    {
      id: '1',
      type: CellType.NUMBER,
      label: '2000',
    },

  ],
  data: [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
  values: [
    {
      id: '1',
      value: '(A) - aktíva (€)',
    },
    {
      id: '2',
      value: '(P) - pasíva (€)',
    },
    {
      id: '3',
      value: '(V) - výnosy (€)',
    },
    {
      id: '4',
      value: '(T) - tržby (€)',
    },
    {
      id: '6',
      value: '(N) - náklady (€)',
    },
    {
      id: '7',
      value: '(D) - daň z príjmov (€)',
    },
    {
      id: '7',
      value: '(Ú) - úroky (€)'
    },
    {
      id: '8',
      value: '(VK) - vlastný kapitál (€)'
    },
    {
      id: '9',
      value: '(CuK) - cudzí kapitál (€)'
    },
    {
      id: '10',
      value: '(I) - investícia (€)'
    },
  ],
  items: [
    '(A) - aktíva (€)',
    '(P) - pasíva (€)',
    '(V) - výnosy (€)',
    '(T) - tržby (€)',
    '(N) - náklady (€)',
    '(D) - daň z príjmov (€)',
    '(Ú) - úroky (€)',
    '(VK) - vlastný kapitál (€)',
    '(CuK) - cudzí kapitál (€)',
    '(I) - investícia (€)',
  ],
  rowTypes: [
    CellType.NUMBER,
    CellType.NUMBER,
    CellType.NUMBER,
    CellType.NUMBER,
    CellType.NUMBER,
    CellType.NUMBER,
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
  dynCols: true,
  additionalData: undefined,
};

const profitabilitySlice = createSlice({
  name: 'profitability',
  initialState: initialProfitabilityState,
  reducers: {
    ...rootReducer,
    reset: (state) => {
      state.headers = initialProfitabilityState.headers;
      state.data = initialProfitabilityState.data;
      state.items = initialProfitabilityState.items;
      state.values = initialProfitabilityState.values;
      state.text = initialProfitabilityState.text;
      state.additionalData = initialProfitabilityState.additionalData;
      state.textConclusion = initialProfitabilityState.textConclusion;
      state.textEvaluation = initialProfitabilityState.textEvaluation;
    },
    openProject: (state: profitabilityState, action: PayloadAction<profitabilityState>) => {
      state.headers = action.payload.headers;
      state.data = action.payload.data;
      state.items = action.payload.items;
      state.values = action.payload.values;
      state.text = action.payload.text;
      state.additionalData = action.payload.additionalData;
      state.textConclusion = action.payload.textConclusion ?? '';
      state.textEvaluation = action.payload.textEvaluation ?? '';
    },
    ...sortTableByYear,
  },
});

export const profitabilityActions = profitabilitySlice.actions;
export const profitabilityReducer = profitabilitySlice.reducer;

export const selectProfitability = (state: RootState) => state.profitability;

export const hasProfitabilityChanged = (state: RootState) => {
  return !isEqual(state.profitability, initialProfitabilityState);
};

export const selectors: RootSelectors = {
  headers: createSelector(
    [(state: RootState) => state.profitability.headers],
    (headers) => headers,
  ),
  selectHeaderByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.profitability.headers],
      (headers) => headers[index],
    ),
  values: createSelector(
    [(state: RootState) => state.profitability.values],
    (values) => values,
  ),
  selectValueByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.profitability.values],
      (values) => values[index],
    ),
  data: createSelector([(state: RootState) => state.profitability.data], (data) => data),
  selectDataByPosition: (row: number, col: number) =>
    createSelector(
      [(state: RootState) => state.profitability.data],
      (data) => data[row][col],
    ),
  dynRows: createSelector(
    [(state: RootState) => state.profitability.dynRows],
    (dynRows) => dynRows,
  ),
  dynCols: createSelector(
    [(state: RootState) => state.profitability.dynCols],
    (dynCols) => dynCols,
  ),
  text: createSelector([(state: RootState) => state.profitability.text], (text) => text),
  textConclusion: createSelector(
    [(state: RootState) => state.profitability.textConclusion],
    (text) => text,
  ),
  textEvaluation: createSelector(
    [(state: RootState) => state.profitability.textEvaluation],
    (text) => text,
  ),
  items: createSelector(
    [(state: RootState) => state.profitability.items],
    (items) => items,
  ),
  corner: createSelector(
    [(state: RootState) => state.profitability.corner],
    (corner) => corner,
  ),
  itemSelectOptions: createSelector(
    [(state: RootState) => state.profitability.itemSelectOptions],
    (itemSelectOptions) => itemSelectOptions ?? [],
  ),
  getRowType: (index) =>
    createSelector(
      [(state: RootState) => state.profitability.rowTypes],
      (rowTypes) => rowTypes[index],
    ),
  // @ts-ignore
  getAdditionalData: createSelector(
    [(state: RootState) => state.profitability],
    (profitabilityData) => profitabilityData.additionalData,
  ),
};