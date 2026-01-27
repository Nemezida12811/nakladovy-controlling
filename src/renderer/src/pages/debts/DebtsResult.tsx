import TableStatic from '../../components/TableStatic';
import { debtsCalculation } from './debtsCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectors } from './debtsSlice';
import { Paper } from '@mui/material';
import SectionTitle from '@renderer/components/SectionTitle';
import Spacer from '@renderer/components/Spacer';
import BarGraph from '@renderer/components/graph/BarGraph';

export default function DebtsResult() {
  const headers = useAppSelector(selectors.headers);
  const data = useAppSelector(selectors.data);

  console.log('Original data:', data);
  console.log('Headers:', headers);

  const { totalDebt, indepLevel, selfFinRatio, debtRatio,
    insolvencyInd, fixAssetsCovRatio } = debtsCalculation(data);

  return (
    <div>
      <Spacer height={40} />

      <SectionTitle className={'new-page'}>
        Ukazovatele aktivity
      </SectionTitle>

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={headers.map(h => h.label)}
          inputs={[
            ['Z<sub>c</sub> - zadlženosť (celková)', `\\( Z_{c} = \\frac{Z_{d} + Z_{k}}{A_{c}} \\)`],
            ['S<sub>fs</sub> - stupeň finančnej samostatnosti', `\\( S_{fs} = \\frac{K_{c}}{K_{v}} \\)`],
            ['S<sub>sf</sub> - Stupeň samofinancovania', `\\( S_{sf} = \\frac{K_{v}}{K_{c}} \\)`],
            ['S<sub>z</sub> - Stupeň zadlženosti', `\\( S_{z} = \\frac{Z_{d} + Z_{k}}{K_{c}} \\)`],
            ['PN - Platobná neschopnosť', `\\( PN = \\frac{Záv}{Poh} \\)`],
            ['Kim - Krytie investičného majetku', `\\( Kim = \\frac{K_{c}}{A_{s}} \\)`],
          ]}
          data={ [totalDebt, indepLevel, selfFinRatio, debtRatio,
            insolvencyInd, fixAssetsCovRatio] }
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <Paper>
        <BarGraph
          title=""
          height={420}
          data={[
            { name: 'Celková zadlženosť', values: totalDebt },
            { name: 'Stupeň finančnej samostatnosti', values: indepLevel },
            { name: 'Stupeň samofinancovania', values: selfFinRatio },
            { name: 'Stupeň zadlženosti', values: debtRatio },
            { name: 'Platobná neschopnosť', values: insolvencyInd },
            { name: 'Krytie investičného majetku', values: fixAssetsCovRatio },
          ]}
          labels={headers.map((h) => h.label)}
          yAxisLabel="debts () hodnoty"
        />
      </Paper>
    </div>
  );
}