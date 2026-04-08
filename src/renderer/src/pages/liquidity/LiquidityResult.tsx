import TableStatic from '../../components/TableStatic';
import { liquidityCalculation } from './liquidityCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectors } from './liquiditySlice';
import { Paper } from '@mui/material';
import SectionTitle from '@renderer/components/SectionTitle';
import Spacer from '@renderer/components/Spacer';
import BarGraph from '@renderer/components/graph/BarGraph';

export default function LiquidityResult() {
  const headers = useAppSelector(selectors.headers);
  const data = useAppSelector(selectors.data);

  const { immediateLiq, currentLiq, totalLiquidity, netMonetaryCapital,
    netMonetaryAssets, netReadyFunds } = liquidityCalculation(data);

  return (
    <div>
      <Spacer height={40} />

      <SectionTitle className={'new-page'}>
        Ukazovatele likvidity
      </SectionTitle>

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={headers.map(h => h.label)}
          inputs={[
            ['okamžitá likvidita', `\\( Ol = \\frac{FM}{Zk} \\)`],
            ['bežná likvidita', `\\( Bl = \\frac{FM + Pk}{Zk} \\)`],
            ['celková likvidita', `\\( Cl = \\frac{FM + Pk + Z}{Zk} \\)`],
            ['čistý peňažný kapitál', `\\( CPK = (FM + Pk + Z) - Zk \\)`],
            ['čistý peňažný majetok', `\\( CPM = (FM + Pk) - Zk \\)`],
            ['čisté pohotové prostriedky', `\\( CPP = FM - Zk \\)`],
          ]}
          data={ [immediateLiq, currentLiq, totalLiquidity, netMonetaryCapital, netMonetaryAssets, netReadyFunds] }
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <Paper>
        <TableStatic
          corner={'Likvidita'}
          header={['Optimálna hodnota', 'Kritická hodnota']}
          inputs={[
            ['Okamžitá'],
            ['Bežná',],
            ['Celková',],
          ]}
          data={ [ ['0,2-0,5', '>0,5'], ['1-1,5', '<0.7'], ['1,5-2,5', '<1.0'],] }
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
              name: 'okamžitá likvidita',
              values: immediateLiq,
            },
            {
              name: 'bežná likvidita',
              values: currentLiq,
            },
            {
              name: 'celková likvidita',
              values: totalLiquidity,
            },
            {
              name: 'čistý peňažný kapitál',
              values: netMonetaryCapital,
            },
            {
              name: 'čistý peňažný majetok',
              values: netMonetaryAssets,
            },
            {
              name: 'čisté pohotové prostriedky',
              values: netReadyFunds,
            },
          ]}
          labels={headers.map((h) => h.label)}
          yAxisLabel="likvidita () hodnoty"
        />
      </Paper>
    </div>
  );
}