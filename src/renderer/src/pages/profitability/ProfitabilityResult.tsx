import TableStatic from '../../components/TableStatic';
import { profitabilityCalculation } from './profitabilityCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectors } from './profitabilitySlice';
import { Paper } from '@mui/material';
import SectionTitle from '@renderer/components/SectionTitle';
import Spacer from '@renderer/components/Spacer';
import BarGraph from '@renderer/components/graph/BarGraph';

export default function ProfitabilityResult() {
  const headers = useAppSelector(selectors.headers);
  const data = useAppSelector(selectors.data);

  console.log('Original data:', data);
  console.log('Headers:', headers);

  const {netProfit, roi, ros, roa, roe, rcuk, rck, rv, rn, }
    = profitabilityCalculation(data);

  return (
    <div>
      <Spacer height={40} />

      <SectionTitle className={'new-page'}>
        Ukazovatele Rentability
      </SectionTitle>

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={headers.map(h => h.label)}
          inputs={[
            ['(Zč) - Zisk čistý', ` Zč = V - N - D`],
            ['(ROI) - Return on Investment rentabilita investície', `\\( ROI = \\frac{Z}{I} \\)`],
            ['(ROS) - Return on Sales rentabilita tržieb ', `\\( ROS = \\frac{Zč}{T} \\)`],
            ['(ROA) - rentabilita aktív', `\\( ROA = \\frac{Zč}{A} \\)`],
            ['(ROE) - rentabilita vlastného kapitálu', `\\( ROE = \\frac{Zč}{VK} \\)`],
            ['(R<sub>cuk</sub>) - rentabilita cudzieho kapitálu', `\\( R_{cuk} = \\frac{Zč}{CK} \\)`],
            ['(RCK) - rentabilita celkového kapitálu', `\\( RCK = \\frac{Zč}{P} \\)`],
            ['(R<sub>v</sub>) - rentabilita výnosov', `\\( R_{v} = \\frac{Zč}{V} \\)`],
            ['(R<sub>n</sub>) - rentabilta nákladov', `\\( R_{n} = \\frac{Zč}{N} \\)`],
          ]}
          data={[netProfit, roi, ros, roa, roe, rcuk, rck, rv, rn]}
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <Paper>
        <BarGraph
          title="Zisk čistý"
          height={420}
          data={[
            {
              name: 'Zisk čistý',
              values: netProfit,
            },
          ]}
          labels={headers.map((h) => h.label)}
          yAxisLabel="Zisk čistý (€)"
        />
      </Paper>
      <Spacer height={40} hideInPrint />
      <Paper>
        <BarGraph
          title="Ukazovatele rentability"
          height={420}
          data={[
            {
              name: 'ROI',
              values: roi,
            },
            {
              name: 'ROS',
              values: ros,
            },
            {
              name: 'ROA',
              values: roa,
            },
            {
              name: 'ROE',
              values: roe,
            },
            {
              name: 'Rentabilita cudzieho kapitálu',
              values: rcuk,
            },
            {
              name: 'Rentabilita celkového kapitálu',
              values: rck,
            },
            {
              name: 'Rentabilita výnosov',
              values: rv,
            },
            {
              name: 'Rentabilta nákladov',
              values: rn,
            },
          ]}
          labels={headers.map((h) => h.label)}
          yAxisLabel="rentabilita () hodnoty"
        />

      </Paper>

    </div>
  );
}