import TableStatic from '../../components/TableStatic';
import { activityCalculation } from './activityCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectors } from './activitySlice';
import { Paper } from '@mui/material';
import SectionTitle from '@renderer/components/SectionTitle';
import Spacer from '@renderer/components/Spacer';
//import { transposeMatrix } from '@renderer/helper';
import BarGraph from '@renderer/components/graph/BarGraph';

export default function ActivityResult() {
  const headers = useAppSelector(selectors.headers);
  const data = useAppSelector(selectors.data);

  //const transposed = transposeMatrix(data);
  //console.log('Transposed data:', transposed);

  const { totalCapital, turnoverTotalCapital, turnoverEquity,
    turnoverInventory, coa, turnoverReceivables, turnoverPayables,
    turnoverFixedAssets, turnoverTotalAssets,} = activityCalculation(data);

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
            ['(CK) celkový kapitál (€)', ` CK = CuK + VK `],
            ['Doba obratu celkového kapitálu (dni)', `\\( D_{CK} = \\frac{CK}{T} \\times 365 \\)`],
            ['Doba obratu vlastného kapitálu (dni)', `\\( D_{VK} = \\frac{VK}{T} \\times 365 \\)`],
            ['Doba obratu zásob (dni)', `\\( D_{Z} = \\frac{Z}{T} \\times 365 \\)`],
            ['Doba obratu pohľadávok (dni)', `\\( D_{P} = \\frac{P}{T} \\times 365 \\)`],
            ['Doba obratu záväzkov (dni)', `\\( D_{Zk} = \\frac{Zk}{T} \\times 365 \\)`],
            ['Doba obratu dlhodobého majetku (stálych aktív) (dni)', `\\( D_{DM} = \\frac{DM}{T} \\times 365 \\)`],
            ['Doba obratu celkových aktív (dni)', `\\( D_{A} = \\frac{A}{T} \\times 365 \\)`],
            ['Celkový obrat aktív (koeficient)', `\\( COA = \\frac{T}{A} \\)`],

          ]}
          data={[totalCapital, turnoverTotalCapital, turnoverEquity,
            turnoverInventory, turnoverReceivables, turnoverPayables,
            turnoverFixedAssets, turnoverTotalAssets, coa,]}
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
              name: 'Doba obratu celkového kapitálu',
              values: turnoverTotalCapital,
            },
            {
              name: 'Doba obratu vlastného kapitálu',
              values: turnoverEquity,
            },
            {
              name: 'Doba obratu zásob',
              values: turnoverInventory,
            },
            {
              name: 'Doba obratu pohľadávok',
              values: turnoverReceivables,
            },
            {
              name: 'Doba obratu záväzkov',
              values: turnoverPayables,
            },
            {
              name: 'Doba obratu dlhodobého majetku (stálych aktív)',
              values: turnoverFixedAssets,
            },
            {
              name: 'Doba obratu celkových aktív',
              values: turnoverTotalAssets,
            },
          ]}
          labels={headers.map((h) => h.label)}
          yAxisLabel="(dni)"
        />
      </Paper>
      <Spacer height={40} hideInPrint />
      <Paper>
        <BarGraph
          title=""
          height={420}
          data={[
            {
              name: '(CK) celkový kapitál',
              values: totalCapital,
            },
          ]}
          labels={headers.map((h) => h.label)}
          yAxisLabel="celkový kapitál (€)"
        />
      </Paper>
      <Spacer height={40} hideInPrint />
      <Paper>
        <BarGraph
          title=""
          height={420}
          data={[
            {
              name: 'Celkový obrat aktív',
              values: coa,
            },
          ]}
          labels={headers.map((h) => h.label)}
          yAxisLabel="Celkový obrat aktív ()"
        />
      </Paper>


    </div>
  );
}