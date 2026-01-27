import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootSelectors, RootState } from '../../store/store';
import {
  DefaultState,
  CellType,
  rootReducer,
  sortTableByYear,
} from '../../store/rootReducer';
import isEqual from 'lodash.isequal';

export interface activityState extends DefaultState {
}

const initialActivityState: activityState = {
  textConclusion: '', textEvaluation: '',
  id: 8,
  title: 'activity analýza',
  corner: 'Ekonomické veličiny',
  additionalData: {},
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
      value: '(CK) - celkový kapitál (€)',
    },
    {
      id: '2',
      value: '(T) - tržby (€)',
    },
    {
      id: '3',
      value: '(VK) - vlastný kapitál (€)',
    },
    {
      id: '4',
      value: '(Z) - zásoby (€)',
    },
    {
      id: '5',
      value: '(P) - pohľadávky (€)',
    },
    {
      id: '6',
      value: '(Záv) - záväzky (€)',
    },
    {
      id: '7',
      value: '(As) - aktíva stále (€)',
    },
    {
      id: '8',
      value: '(Ac) - aktíva celkové (€)',
    },
  ],
  items: [
    '(K<sub>c</sub>) - kapitál celkový (€)',
    '(T) - tržby (€)',
    '(K<sub>v</sub>) - kapitál vlastný (€)',
    '(Z) - zásoby (€)',
    '(P) - pohľadávky (€)',
    '(Záv) - záväzky (€)',
    '(A<sub>s</sub>) - aktíva stále (€)',
    '(A<sub>c</sub>) - aktíva celkové (€)',
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
  dynCols: true
};

const activitySlice = createSlice({
  name: 'activity',
  initialState: initialActivityState,
  reducers: {
    ...rootReducer,
    reset: (state) => {
      state.headers = initialActivityState.headers;
      state.data = initialActivityState.data;
      state.items = initialActivityState.items;
      state.values = initialActivityState.values;
      state.text = initialActivityState.text;
      state.additionalData = initialActivityState.additionalData;
    },
    setAdditionalData: (state, action: PayloadAction<{ key: string; value: number | string }>) => {
      if (!state.additionalData) state.additionalData = {};
      (state.additionalData as any)[action.payload.key] = Number(action.payload.value);
    },
    openProject: (state: activityState, action: PayloadAction<activityState>) => {
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

export const activityActions = activitySlice.actions;
export const activityReducer = activitySlice.reducer;

export const selectActivity = (state: RootState) => state.activity;

export const hasActivityChanged = (state: RootState) => {
  return !isEqual(state.activity, initialActivityState);
};

export const selectors: RootSelectors = {
  headers: createSelector(
    [(state: RootState) => state.activity.headers],
    (headers) => headers,
  ),
  selectHeaderByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.activity.headers],
      (headers) => headers[index],
    ),
  values: createSelector(
    [(state: RootState) => state.activity.values],
    (values) => values,
  ),
  selectValueByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.activity.values],
      (values) => values[index],
    ),
  data: createSelector([(state: RootState) => state.activity.data], (data) => data),
  selectDataByPosition: (row: number, col: number) =>
    createSelector(
      [(state: RootState) => state.activity.data],
      (data) => data[row][col],
    ),
  dynRows: createSelector(
    [(state: RootState) => state.activity.dynRows],
    (dynRows) => dynRows,
  ),
  dynCols: createSelector(
    [(state: RootState) => state.activity.dynCols],
    (dynCols) => dynCols,
  ),
  text: createSelector(
    [(state: RootState) => state.activity.text],
    (text) => text,
  ),
  textConclusion: createSelector(
    [(state: RootState) => state.activity.textConclusion],
    (textConclusion) => textConclusion,
  ),
  textEvaluation: createSelector(
    [(state: RootState) => state.activity.textEvaluation],
    (textEvaluation) => textEvaluation,
  ),
  items: createSelector(
    [(state: RootState) => state.activity.items],
    (items) => items,
  ),
  corner: createSelector(
    [(state: RootState) => state.activity.corner],
    (corner) => corner,
  ),
  itemSelectOptions: createSelector(
    [(state: RootState) => state.activity.itemSelectOptions],
    (itemSelectOptions) => itemSelectOptions ?? [],
  ),
  getRowType: (index) =>
    createSelector(
      [(state: RootState) => state.activity.rowTypes],
      (rowTypes) => rowTypes[index],
    ),
  // @ts-ignore
  getAdditionalData: createSelector(
    [(state: RootState) => state.activity],
    (activityData) => activityData.additionalData,
  ),
};
