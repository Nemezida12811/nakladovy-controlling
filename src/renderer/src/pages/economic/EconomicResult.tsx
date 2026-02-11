import TableStatic from '../../components/TableStatic';
import { economicCalculation } from './economicCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectors as economicSelectors } from './economicSlice';
import SectionTitle from '@renderer/components/SectionTitle';
import Spacer from '@renderer/components/Spacer';
import { Paper } from '@mui/material';

import LineGraph from '@renderer/components/graph/LineGraph';
import BarGraph from '@renderer/components/graph/BarGraph';

export default function EconomicResult() {
  const headers = useAppSelector(economicSelectors.headers);
  const data = useAppSelector(economicSelectors.data);
  const values = useAppSelector(economicSelectors.values);

  const {
    costData,
    incomeData,
    profitData,
    costProfitabilityData,
    incomeProfitabilityData,
    costEfficiencyData,
    costIndicatorData,
    materialCostData,
    wageCostData,
    depreciationCostData,
    financialConstData,
    servicesConstData,
    taxesConstData,
    hospCostData,
  } = economicCalculation(data, values, headers.length ?? 0);

  return (
    <>
      <Spacer height={40} hideInPrint />
      <Spacer height={20} />
      <SectionTitle>Analýza ekonomických ukazovateľov</SectionTitle>
      <Paper>
        <TableStatic
          corner="Ekonomické veličiny"
          header={headers.map((h) => h.label)}
          inputs={[
            ['(V<sub>c</sub>) - výnosy celkom (€)', `\\(\\sum V\\)`],
            ['(N<sub>c</sub>) - náklady celkom (€)', `\\(\\sum N\\)`],
          ]}
          data={[incomeData, costData]}
        />
      </Paper>
      <Spacer height={40} />
      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={headers.map((h) => h.label)}
          inputs={[
            [
              '(VH) - výsledok hospodárenia (€) (zisk, strata)',
              `\\(\\begin{align*}
              \\text{(ZISK)} & \\quad V > N \\\\
              \\text{(STRATA)} & \\quad V < N
              \\end{align*}\\)`,
            ],
            [
              '(R<sub>n</sub>) - rentabilita nákladov',
              `\\(R_{n}=\\frac{Z}{N}\\)`,
            ],
            [
              '(R<sub>v</sub>) - rentabilita výnosov',
              `\\(R_{v}=\\frac{Z}{V}\\)`,
            ],
            [
              '(N<sub>ú</sub>) - nákladová účinnosť',
              `\\(N_{u}=\\frac{V}{N}\\)`,
            ],
            ['(e) - efektívnosť', `\\(e=\\frac{V}{N}\\)`],
            [
              '(n<sub>c</sub>) - nákladovosť celková',
              `\\(n_{c}=\\frac{N}{V}\\)`,
            ],
            [
              '(n<sub>m</sub>) - materiálová nákladovosť',
              '\\(\\frac{N_{MAT (501-507)}}{V}\\)',
            ],
            [
              '(n<sub>mz</sub>) - mzdová nákladovosť',
              '\\(\\frac{N_{MZDY (521-528)}}{V}\\)',
            ],
            [
              '(n<sub>o</sub>) - odpisová nákladovosť',
              '\\(\\frac{N_{odpí (551-557)}}{V}\\)',
            ],
            [
              '(n<sub>f</sub>) - finančná nákladovosť',
              '\\(\\frac{N_{F (561-569)}}{V}\\)',
            ],
            [
              '(n<sub>s</sub>) - nákladovosť služieb',
              '\\(\\frac{N_{s (511-518)}}{V}\\)',
            ],
            [
              '(n<sub>d</sub>) - daňová nákladovosť',
              '\\(\\frac{N_{d (531-538)}}{V}\\)',
            ],
            [
              '(n<sub>hč</sub>) - nákladovosť hospodárskej činnosti',
              '\\(\\frac{N_{d (541-549)}}{V}\\)',
            ],
          ]}
          data={[
            profitData,
            costProfitabilityData,
            incomeProfitabilityData,
            costEfficiencyData,
            costEfficiencyData,
            costIndicatorData,
            materialCostData,
            wageCostData,
            depreciationCostData,
            financialConstData,
            servicesConstData,
            taxesConstData,
            hospCostData,
          ]}
        />
      </Paper>
      <Spacer height={40} hideInPrint />
      <SectionTitle>Dashboarding</SectionTitle>
      <LineGraph
        title="Vývoj výnosov a nákladov"
        height={420}
        labels={headers.map((h) => h.label)}
        data={[
          {
            name: 'Výnosy (V<sub>c</sub>)',
            values: incomeData,
          },
          {
            name: 'Náklady (N<sub>c</sub>)',
            values: costData,
          },
        ]}
        yAxisLabel="ekonomická veličina (€)"
      />
      <Spacer height={40} hideInPrint />

      <BarGraph
        title={'výsledok hospodárenia (ZISK/STRATA)'}
        height={420}
        labels={headers.map((h) => h.label)}
        data={[
          {
            name: 'Zisk/Strata',
            values: profitData,
          },
        ]}
        showLegend={false}
        yAxisLabel="výsledok hospodárenia (€)"
        showTooltip={false}
        barTextColor="#fff"
        customColors={profitData.map((p) => (p >= 0 ? '#2b56ff' : '#fa0505'))}
      />

      <Spacer height={40} hideInPrint />

      <BarGraph
        title="Prehľad ekonomických ukazovateľov"
        height={420}
        labels={headers.map((h) => h.label)}
        data={[
          {
            name: 'Rentabilita výnosov R<sub>v</sub>',
            values: incomeProfitabilityData,
          },
          {
            name: 'Rentabilita nákladov R<sub>n</sub>',
            values: costProfitabilityData,
          },
          {
            name: 'Nákladová účinnosť N<sub>ú</sub>',
            values: costEfficiencyData,
          },
          {
            name: 'Efektívnosť e',
            values: costEfficiencyData,
          },
          {
            name: 'Nákladovosť celková  n<sub>c</sub>',
            values: costIndicatorData,
          },
        ]}
        showValueInBar={false}
      />

      <Spacer height={40} hideInPrint />

      <BarGraph
        title="Prehľad ukazovateľov nákladovosti"
        height={420}
        labels={headers.map((h) => h.label)}
        data={[
          {
            name: 'materiálová nákladovosť n<sub>m</sub>',
            values: materialCostData,
          },
          { name: 'mzdová nákladovosť n<sub>mz</sub>', values: wageCostData },
          {
            name: 'odpisová nákladovosť n<sub>o</sub>',
            values: depreciationCostData,
          },
          {
            name: 'finančná nákladovosť n<sub>f</sub>',
            values: financialConstData,
          },
          {
            name: 'nákladovosť služieb n<sub>s</sub>',
            values: servicesConstData,
          },
          { name: 'daňová nákladovosť n<sub>d</sub>', values: taxesConstData },
          { name: 'nákladovosť hospodárskej činnosti n<sub>hč</sub>', values: hospCostData },
        ]}
        showValueInBar={false}
      />
    </>
  );
}
