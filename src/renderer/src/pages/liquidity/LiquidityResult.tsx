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

  console.log('Original data:', data);
  console.log('Headers:', headers);

  const { immediateLiq, currentLiq, totalLiquidity } = liquidityCalculation(data);

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
            ['(Ol) okamžitá likvidita (likvidita 1. stupeňa)', `\\( Ol = \\frac{FM}{Zk} \\)`],
            ['(Bl) bežná likvidita (likvidita 2. stupeňa)', `\\( Bl = \\frac{FM + Pk}{Zk} \\)`],
            ['(Cl) celková likvidita', `\\( Cl = \\frac{FM + Pk + Z}{Zk} \\)`],
          ]}
          data={ [immediateLiq, currentLiq, totalLiquidity] }
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
              name: '(Ol) okamžitá likvidita (likvidita 1. stupeňa)',
              values: immediateLiq,
            },
            {
              name: '(Bl) bežná likvidita (likvidita 2. stupeňa)',
              values: currentLiq,
            },
            {
              name: '(Cl) celková likvidita',
              values: totalLiquidity,
            },
          ]}
          labels={headers.map((h) => h.label)}
          yAxisLabel="liquidita () hodnoty"
        />
      </Paper>
    </div>
  );
}