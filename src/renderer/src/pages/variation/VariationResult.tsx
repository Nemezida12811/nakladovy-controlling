import { Paper } from '@mui/material';
import SectionTitle from '@renderer/components/SectionTitle';
import { selectors, variationActions } from './variationSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Spacer from '@renderer/components/Spacer';
import TableStatic from '@renderer/components/TableStatic';
import { variationCalculation } from './variationCalculation';
import BarGraph from '@renderer/components/graph/BarGraph';
import { transposeMatrix } from '@renderer/helper';
import TableSelect from '@renderer/components/tables/TableSelect';
import { useEffect } from 'react';

const VariationResults = () => {

  const items = useAppSelector(selectors.items);
  const data = useAppSelector(selectors.data);
  const dispatch = useAppDispatch();

  const { absolutnaDiferencia, plneniePlanu, percentualnaOdchylka} = variationCalculation(
    data as number[][],
  );

  console.log(variationCalculation(data as number[][]));

  // @ts-ignore
  const additionalData = useAppSelector(selectors.getAdditionalData!) as any;
  const selectValues = additionalData?.selectValues || [];
  const selectValuesType = additionalData?.selectValuesType || [];

  const handleSelectChange = (index: number, value: string) => {
    const newValues = [...selectValues];
    newValues[index] = value;

    dispatch(
      variationActions.setAdditionalData({
        key: 'selectValues',
        value: newValues,
      }),
    );
  };

  const handleSelectTypeChange = (index: number, value: string) => {
    const newValues = [...selectValuesType];
    newValues[index] = value;

    dispatch(
      variationActions.setAdditionalData({
        key: 'selectValuesType',
        value: newValues,
      }),
    );
  };

  useEffect(() => {
    if (selectValues.length < items.length) {
      dispatch(
        variationActions.setAdditionalData({
          key: 'selectValues',
          value: [...selectValues, ...Array(items.length - selectValues.length).fill('')],
        }),
      );
    } else if (selectValues.length > items.length) {
      dispatch(
        variationActions.setAdditionalData({
          key: 'selectValues',
          value: selectValues.slice(0, items.length),
        }),
      );
    }
  }, [items.length]);

  useEffect(() => {
    if (selectValuesType.length < items.length) {
      dispatch(
        variationActions.setAdditionalData({
          key: 'selectValuesType',
          value: [...selectValuesType, ...Array(items.length - selectValuesType.length).fill('')],
        }),
      );
    } else if (selectValuesType.length > items.length) {
      dispatch(
        variationActions.setAdditionalData({
          key: 'selectValuesType',
          value: selectValuesType.slice(0, items.length),
        }),
      );
    }
  }, [items.length]);

  return (
    <div>
      <Spacer height={40} />

      <Spacer height={40} />

      <SectionTitle className="new-page">Analýza ukazovateľov</SectionTitle>

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={items}
          inputs={[
            ['(O) odchýlka (€) ', `\\(O = skutočnosť - plán\\)`],
            [
              '(I<sub>p</sub>) percentuálne plnenie plánu (%)',
              `\\(I_{p}=\\frac{skutočnosť}{plán} * 100\\% \\)`,
            ],
            ['(O) percentuálna odchýlka plnenia plánu (%)', `\\(O = skutočnosť - plán\\)`],
          ]}
          data={[absolutnaDiferencia, plneniePlanu, percentualnaOdchylka]}
          footers={[
            {
              label: 'charakter odchýlky',
              items: selectValues.map((value, index) => (
                <TableSelect
                  key={index}
                  value={value}
                  onChange={(e) =>
                    handleSelectChange(index, e.target.value as string)
                  }
                  options={[
                    'pozitívna odchýlka',
                    'negatívna odchýlka',
                  ]}
                />
              )),
            },
            {
              label: 'plnenie plánu',
              items: selectValuesType.map((value, index) => (
                <TableSelect
                  key={index}
                  value={value}
                  onChange={(e) =>
                    handleSelectTypeChange(index, e.target.value as string)
                  }
                  options={[
                    'prekročenie plánu',
                    'neplnenie plánu',
                    'plnenie plánu na 100%',
                  ]}
                />
              )),
            },
          ]}
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <BarGraph
        title={'Prehľad nákladov v podniku'}
        height={420}
        labels={items.filter(Boolean)}
        data={[
          { name: 'plán', values: transposeMatrix(data)[0] as number[] },
          {
            name: 'skutočnosť',
            values: transposeMatrix(data)[1] as number[],
          },
        ]}
        yAxisLabel="náklady v (€)"
        showTooltip={false}
      />

      <Spacer height={40} />

      <BarGraph
        title="Plnenie plánu nákladov v podniku"
        height={420}
        labels={items.filter(Boolean)}
        data={[
          {
            name: 'percentuálne plnenie plánu',
            values: plneniePlanu,
          },
          {
            name: 'percentuálna odchýlka plnenia plánu',
            values: percentualnaOdchylka,
          },
        ]}
        yAxisLabel="percento (%)"
        showLegend={true}
        showTooltip={false}
      />
    </div>
  );
};

export default VariationResults;