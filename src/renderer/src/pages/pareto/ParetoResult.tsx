import TableStatic from '../../components/TableStatic';
import { paretoCalculation } from './paretoCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectors } from './paretoSlice';
import Spacer from '@renderer/components/Spacer';
import SectionTitle from '@renderer/components/SectionTitle';
import { Paper, Table, TableCell} from '@mui/material';
import BarWithLineGraph from '@renderer/components/graph/BarWithLineGraph';

export default function ParetoResult() {
  const data = useAppSelector(selectors.data);
  const items = useAppSelector(selectors.items);

  const { values, valuesKumul, percentagesKumul, percentages, causes, sum } =
    paretoCalculation(data as number[][], items);

  return (
    <>
      <Spacer height={40} hideInPrint />
      <SectionTitle className="new-page">Analýza nákladov</SectionTitle>
      <Paper>
        <TableStatic
          corner={'Príčiny vzniku nákladov'}
          header={[
            '(N) Náklady (€)',
            '(NK) Náklady kumulované (€)',
            '(Š) Štruktúra (%)',
            '(ŠK) Štruktúra kumulovaná (%)',
            'Kategória',
          ]}
          inputs={[...causes.map((value: string) => [value, ''])]}
          data={values.map((value: number, idx: number) => {
            return [
              value,
              valuesKumul[idx],
              percentages[idx],
              percentagesKumul[idx],
              percentagesKumul[idx] > 95
                ? 'C'
                : percentagesKumul[idx] > 80
                  ? 'B'
                  : 'A',
            ];
          })}
        />

        <Table>
          <TableCell align="left" sx={{borderRight: '1px solid #ddd', width: "170px" }}>
            Nc náklady celkové (€)
          </TableCell>
          <TableCell align="center" sx={{width: "152px", borderRight: '1px solid #ddd'}}>{sum}</TableCell>
          <TableCell></TableCell>
        </Table>
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <BarWithLineGraph
        title="PARETO ANALÝZA A LORENZOVA KRIVKA"
        height={420}
        labels={causes}
        barData={[
          {
            name: 'Príčiny',
            values: values,
          },
        ]}
        lineData={[
          {
            name: 'Lorenzova krivka',
            values: percentagesKumul,
          },
        ]}
        referenceLines={[
          {
            label: '80%',
            stroke: 'red',
            width: 46,
            y: '80',
          },
          {
            label: '95%',
            stroke: 'red',
            width: 46,
            y: '95',
          },
        ]}
      />
    </>
  );
}