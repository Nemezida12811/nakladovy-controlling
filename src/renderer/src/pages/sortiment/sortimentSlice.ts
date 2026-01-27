import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootSelectors, RootState } from '../../store/store';
import {
  DefaultState,
  CellType,
  openProject,
  rootReducer,
} from '../../store/rootReducer';
import isEqual from 'lodash.isequal';

const initialSortimentState: DefaultState = {
  textConclusion: '', textEvaluation: '',
  id: 5,
  title: 'Sortimentná analýza',
  corner: 'Ekonomická veličina / Produkt',
  headers: [
    {
      id: '1',
      type: CellType.NUMBER,
      label: 'Výrobok A',
    },
  ],
  data: [ [0], [''], [0], [0], [0],],
  items: [
    '(Q) - objem výroby',
    'merná jednotka (množstvo)',
    '(N<sub>p</sub>) - priame náklady (€)',
    '(ÚVNV) -  úplné vlastné náklady výkonu (€)',
    '(P<sub>cj</sub>) - predajná cena (jednotková) (€)'
  ],
  values: [
    {
      id: '7',
      value: '(Q) - objem výroby (množstvo)',
    },
    {
      id: '6',
      value: 'jednotka množstva predajnej ceny',
    },
    {
      id: '1',
      value: '(N<sub>p</sub>) - priame náklady (€)',
    },
    {
      id: '5',
      value: '(ÚVNV) -  úplné vlastné náklady výkonu (€)',
    },
    {
      id: '6',
      value: '(P<sub>cj</sub>) - predajná cena (jednotková) (€)',
    },
    {
      id: '8',
      value: 'množstvo objemu výroby',
    },
  ],
  rowTypes: [
    CellType.NUMBER,
    CellType.STRING,
    CellType.NUMBER,
    CellType.NUMBER,
    CellType.NUMBER,
    CellType.STRING,
  ],
  text: '',
  accounts: [''],
  sortable: false,
  hasAnalytic: false,
  dynCols: true
};

const sortimentSlice = createSlice({
  name: 'sortiment',
  initialState: initialSortimentState,
  reducers: {
    ...rootReducer,
    reset: (state: DefaultState) => {
      state.headers = initialSortimentState.headers;
      state.data = initialSortimentState.data;
      state.items = initialSortimentState.items;
      state.values = initialSortimentState.values;
      state.text = initialSortimentState.text;
    },
    ...openProject,
  },
});

export const sortimentReducer = sortimentSlice.reducer;
export const sortimentActions = sortimentSlice.actions;

export const selectSortiment = (state: RootState) => state.sortiment;

export const hasSortimentChanged = (state: RootState) => {
  return !isEqual(state.sortiment, initialSortimentState);
};

export const selectors: RootSelectors = {
  headers: createSelector(
    [(state: RootState) => state.sortiment.headers],
    (headers) => headers,
  ),
  selectHeaderByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.sortiment.headers],
      (headers) => headers[index],
    ),
  values: createSelector(
    [(state: RootState) => state.sortiment.values],
    (values) => values,
  ),
  selectValueByIndex: (index) =>
    createSelector(
      [(state: RootState) => state.sortiment.values],
      (values) => values[index],
    ),
  data: createSelector(
    [(state: RootState) => state.sortiment.data],
    (data) => data,
  ),
  selectDataByPosition: (row: number, col: number) =>
    createSelector(
      [(state: RootState) => state.sortiment.data],
      (data) => data[row][col],
    ),
  dynRows: createSelector(
    [(state: RootState) => state.sortiment.dynRows],
    (dynRows) => dynRows,
  ),
  dynCols: createSelector(
    [(state: RootState) => state.sortiment.dynCols],
    (dynCols) => dynCols,
  ),
  textConclusion: createSelector(
    [(state: RootState) => state.sortiment.textConclusion],
    (text) => text,
  ),
  textEvaluation: createSelector(
    [(state: RootState) => state.sortiment.textEvaluation],
    (text) => text,
  ),
  items: createSelector(
    [(state: RootState) => state.sortiment.items],
    (items) => items,
  ),
  corner: createSelector(
    [(state: RootState) => state.sortiment.corner],
    (corner) => corner,
  ),
  itemSelectOptions: createSelector(
    [(state: RootState) => state.sortiment.itemSelectOptions],
    (itemSelectOptions) => itemSelectOptions ?? [],
  ),
  getRowType: (index) =>
    createSelector(
      [(state: RootState) => state.sortiment.rowTypes],
      (rowTypes) => rowTypes[index],
    ),
};
