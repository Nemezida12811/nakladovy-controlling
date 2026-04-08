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

  const { totalCapital, selfFinRatio, debtRatio, insolvencyInd,
    fixAssetsCovRatio, totalDebt, indepLevel, } = debtsCalculation(data);

  return (
    <div>
      <Spacer height={40} />

      <SectionTitle className={'new-page'}>
        Ukazovatele zadlženosti
      </SectionTitle>

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={headers.map((h) => h.label)}
          inputs={[
            ['(CK) celkový kapitál', ` CK = CuK + VK `],
            [
              '(S<sub>sf</sub>) - Stupeň samofinancovania',
              `\\( S_{sf} = \\frac{VK}{CK} \\)`,
            ],
            [
              '(S<sub>z</sub>) - Stupeň zadlženosti',
              `\\( S_{z} = \\frac{Cuk}{CK} \\)`,
            ],
            ['(PN) - Platobná neschopnosť', `\\( PN = \\frac{Zk + Zd}{P} \\)`],
            [
              '(KIM) - Krytie investičného majetku',
              `\\( KIM = \\frac{CK}{DM} \\)`,
            ],
            [
              '(Z<sub>c</sub>) - zadlženosť (celková)',
              `\\( Z_{c} = \\frac{Z_{d} + Z_{k}}{A} \\)`,
            ],
            [
              '(S<sub>fs</sub>) - stupeň finančnej samostatnosti',
              `\\( S_{fs} = \\frac{VK}{A}    \\)`,
            ],
          ]}
          data={[
            totalCapital,
            selfFinRatio,
            debtRatio,
            insolvencyInd,
            fixAssetsCovRatio,
            totalDebt,
            indepLevel,
          ]}
        />
      </Paper>
      <Spacer height={40} hideInPrint />
      <Paper>
        <TableStatic
          corner={'LIMITY'}
          header={['Optimálna hodnota', 'Kritická hodnota']}
          inputs={[
            ['Zadĺženosť'],
            ['Stupeň finančnej samostatnosti'],
            ['Stupeň samofinancovania'],
            ['Stupeň zadĺženosti'],
            ['Platobná neschopnosť'],
            ['Krytie investičného majetku'],
          ]}
          data={[
            ['40%-60%', '>60%'],
            ['0,3-1,0', '=1,0'],
            ['Min 50%', '<50%'],
            ['0,3-0,7 \n <50%', '>70%'],
            ['', '>1'],
            ['', '>1'],
          ]}
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <Paper>
        <BarGraph
          title=""
          height={420}
          data={[
            { name: 'Stupeň samofinancovania', values: selfFinRatio },
            { name: 'Stupeň zadlženosti', values: debtRatio },
            { name: 'Platobná neschopnosť', values: insolvencyInd },
            { name: 'Krytie investičného majetku', values: fixAssetsCovRatio },
            { name: 'Zadlženosť (celková)', values: totalDebt },
            { name: 'Stupeň finančnej samostatnosti', values: indepLevel },
          ]}
          labels={headers.map((h) => h.label)}
          yAxisLabel="zadlženosť () hodnoty"
        />
      </Paper>
      <Spacer height={40} hideInPrint />
      <Paper>
        <BarGraph
          title=""
          height={420}
          data={[
            { name: 'Celkový kapitál', values: totalCapital },
          ]}
          labels={headers.map((h) => h.label)}
          yAxisLabel="Celkový kapitál (€) "
        />
      </Paper>

    </div>
  );
}