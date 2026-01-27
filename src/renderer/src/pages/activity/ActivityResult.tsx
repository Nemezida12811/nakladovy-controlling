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

  console.log('Original data:', data);
  console.log('Headers:', headers);

  //const transposed = transposeMatrix(data);
  //console.log('Transposed data:', transposed);

  const { turnoverTotalCapital, turnoverEquity, turnoverInventory,
    turnoverReceivables, turnoverPayables, turnoverFixedAssets, turnoverTotalAssets} = activityCalculation(data);

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
            ['DO (celkového kapitálu) (dni)', `\\( D_{CK} = \\frac{CK}{T} \\times 360 \\)`],
            ['DO (vlastného kapitálu) (dni)', `\\( D_{VK} = \\frac{VK}{T} \\times 360 \\)`],
            ['DO (zásob) (dni)', `\\( D_{Z} = \\frac{Z}{T} \\times 360 \\)`],
            ['DO (pohľadávok) (dni)', `\\( D_{P} = \\frac{P}{T} \\times 360 \\)`],
            ['DO (záväzkov) (dni)', `\\( D_{Záv} = \\frac{Záv}{T} \\times 360 \\)`],
            ['DO (stálych aktív) (dni)', `\\( D_{As} = \\frac{As}{T} \\times 360 \\)`],
            ['DO (celkových aktív) (dni)', `\\( D_{Ac} = \\frac{Ac}{T} \\times 360 \\)`],
          ]}
          data={[turnoverTotalCapital, turnoverEquity, turnoverInventory,
            turnoverReceivables, turnoverPayables, turnoverFixedAssets, turnoverTotalAssets]}
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
              name: 'DO (celkového kapitálu)',
              values: turnoverTotalCapital,
            },
            {
              name: 'DO (vlastného kapitálu)',
              values: turnoverEquity,
            },
            {
              name: 'DO (zásob)',
              values: turnoverInventory,
            },
            {
              name: 'DO (pohľadávok)',
              values: turnoverReceivables,
            },
            {
              name: 'DO (záväzkov) ',
              values: turnoverPayables,
            },
            {
              name: 'DO (stálych aktív)',
              values: turnoverFixedAssets,
            },
            {
              name: 'DO (celkových aktív)',
              values: turnoverTotalAssets,
            },
          ]}
          labels={headers.map((h) => h.label)}
          yAxisLabel="(dni)"
        />
      </Paper>
    </div>
  );
}