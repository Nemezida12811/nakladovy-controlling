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

  const { roi, roa, roe, rvy, rnk, rck, rvk, rt } = profitabilityCalculation(data);

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
            ['(ROI) - Return on Investment', `\\( ROI = \\frac{Z + Ú}{T} \\)`],
            ['(ROA) - Return on Assets', `\\( ROA = \\frac{Z}{A} \\)`],
            ['(ROE) - Return on Equity', `\\( ROE = \\frac{Z}{VK} \\)`],
            ['(R<sub>vý</sub>) - rentabilita výnosov', `\\( R_{vý} = \\frac{HV}{T} \\)`],
            ['(R<sub>nk</sub>) - rentabilita nákladov', `\\( R_{nk} = \\frac{HV}{N} \\)`],
            ['(R<sub>ck</sub>) - rentabilita celkového kapitálu', `\\( R_{ck} = \\frac{HV}{P} \\)`],
            ['(R<sub>vk</sub>) - rentabilita vlastného kapitálu', `\\( R_{vk} = \\frac{HV}{VK} \\)`],
            ['(R<sub>t</sub>) - rentabilita tržieb', `\\( R_{t} = \\frac{HV}{T} \\)`],
          ]}
          data={[roi, roa, roe, rvy, rnk, rck, rvk, rt]}
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <Paper>
        <BarGraph
          title=""
          height={420}
          data={[
            {
              name: 'ROI',
              values: roi,
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
              name: 'Rentabilita výnosov',
              values: rvy,
            },
            {
              name: 'Rentabilita nákladov',
              values: rnk,
            },
            {
              name: 'Rentabilita celkového kapitálu',
              values: rck,
            },
            {
              name: 'Rentabilita vlastného kapitálu',
              values: rvk,
            },
            {
              name: 'Rentabilita tržieb',
              values: rt,
            },
          ]}
          labels={headers.map((h) => h.label)}
          yAxisLabel="rentabilita () hodnoty"
        />
      </Paper>
    </div>
  );
}