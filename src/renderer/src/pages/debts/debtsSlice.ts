import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootSelectors, RootState } from '../../store/store';
import {
  DefaultState,
  CellType,
  rootReducer,
  sortTableByYear,
} from '../../store/rootReducer';
import isEqual from 'lodash.isequal';

export interface debtsState extends DefaultState {
}

const initialDebtsState: debtsState = {
  textConclusion: '', textEvaluation: '',
  id: 9,
  title: 'debts analýza',
  corner: 'Ekonomické veličiny',
  headers: [
    {
      id: '1',
      type: CellType.NUMBER,
      label: '2000',
    },
  ],
  data: [[0], [0], [0], [0], [0], [0], [0], [0]],
  values: [
    {
      id: '1',
      value: '(CuK) - сudzí kapitál (€)',
    },
    {
      id: '2',
      value: '(VK) - vlastný kapitál (€)',
    },
    {
      id: '3',
      value: '(A) - aktíva (€)',
    },
    {
      id: '4',
      value: '(Z) - záväzky (€)',
    },
    {
      id: '5',
      value: '(P) - pohľadávky (€)',
    },
    {
      id: '6',
      value: '(DM) - dlhodobý majetok (€)',
    },
    {
      id: '7',
      value: '(Zd) - záväzky dlhodobé (€)',
    },
    {
      id: '8',
      value: '(Zk) - záväzky krátkodobé (€)',
    },

  ],
  items: [
    '(CuK) - cudzí kapitál (€)',
    '(VK) - vlastný kapitál (€)',
    '(A) - aktíva (€)',
    '(Z) - záväzky (€)',
    '(P) - pohľadávky (€)',
    '(DM) - dlhodobý majetok (€)',
    '(Zd) - záväzky dlhodobé (€)',
    '(Zk) - záväzky krátkodobé (€)',
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
  ],
  text: '',
  accounts: [''],
  sortable: true,
  hasAnalytic: false,
  dynRows: false,
  dynCols: true,
  additionalData: undefined,
};

const debtsSlice = createSlice({
  name: 'debts',
  initialState: initialDebtsState,
  reducers: {
    ...rootReducer,
    reset: (state) => {
      state.headers = initialDebtsState.headers;
      state.data = initialDebtsState.data;
      state.items = initialDebtsState.items;
      state.values = initialDebtsState.values;
      state.text = initialDebtsState.text;
      state.additionalData = initialDebtsState.additionalData;
      state.textConclusion = initialDebtsState.textConclusion;
      state.textEvaluation = initialDebtsState.textEvaluation;
    },
    openProject: (state: debtsState, action: PayloadAction<debtsState>) => {
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

export const debtsActions = debtsSlice.actions;
export const debtsReducer = debtsSlice.reducer;

export const selectDebts = (state: RootState) => state.debts;

export const hasDebtsChanged = (state: RootState) => {
  return !isEqual(state.debts, initialDebtsState);
};

export const selectors: RootSelectors = {
  headers: createSelector(
    [(state: RootState) => state.debts.headers],
    (headers) => headers,
  ),
  selectHeaderByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.debts.headers],
      (headers) => headers[index],
    ),
  values: createSelector(
    [(state: RootState) => state.debts.values],
    (values) => values,
  ),
  selectValueByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.debts.values],
      (values) => values[index],
    ),
  data: createSelector([(state: RootState) => state.debts.data], (data) => data),
  selectDataByPosition: (row: number, col: number) =>
    createSelector(
      [(state: RootState) => state.debts.data],
      (data) => data[row][col],
    ),
  dynRows: createSelector(
    [(state: RootState) => state.debts.dynRows],
    (dynRows) => dynRows,
  ),
  dynCols: createSelector(
    [(state: RootState) => state.debts.dynCols],
    (dynCols) => dynCols,
  ),
  text: createSelector([(state: RootState) => state.debts.text], (text) => text),
  textConclusion: createSelector(
    [(state: RootState) => state.debts.textConclusion],
    (text) => text,
  ),
  textEvaluation: createSelector(
    [(state: RootState) => state.debts.textEvaluation],
    (text) => text,
  ),
  items: createSelector(
    [(state: RootState) => state.debts.items],
    (items) => items,
  ),
  corner: createSelector(
    [(state: RootState) => state.debts.corner],
    (corner) => corner,
  ),
  itemSelectOptions: createSelector(
    [(state: RootState) => state.debts.itemSelectOptions],
    (itemSelectOptions) => itemSelectOptions ?? [],
  ),
  getRowType: (index) =>
    createSelector(
      [(state: RootState) => state.debts.rowTypes],
      (rowTypes) => rowTypes[index],
    ),
  // @ts-ignore
  getAdditionalData: createSelector(
    [(state: RootState) => state.debts],
    (debtsData) => debtsData.additionalData,
  ),
};
