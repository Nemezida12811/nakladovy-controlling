import TableStatic from '../../components/TableStatic';
import { cvpCalculation } from './cvpCalculation';
import { useAppSelector } from '../../store/hooks';
import {  selectors } from './cvpSlice';
import { Paper, Typography } from '@mui/material';
import SectionTitle from '@renderer/components/SectionTitle';
import Spacer from '@renderer/components/Spacer';
import { transposeMatrix } from '@renderer/helper';
import BarGraph from '@renderer/components/graph/BarGraph';

export default function CVPResult() {

  const headers = useAppSelector(selectors.headers);
  const data = useAppSelector(selectors.data);

  // @ts-ignore
  const additionalData = useAppSelector(selectors.getAdditionalData!) as any;

  const {
    zeroTon,
    zeroProf,
    zeroEur,
    capacityUsage,
    totalCosts,
    incomeTotal,
    economicResult,
  } = cvpCalculation(transposeMatrix(data));

  return (
    <div>
      <Spacer height={40} />

      <SectionTitle className={'new-page'}>
        Analýza nulového bodu - kritický bod rentability
      </SectionTitle>

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={headers.map((header) => header.label)}
          inputs={[
            [
              '(Nc) náklady celkové (€)',
              `\\( N_{c} = N_{f} + (Q * N_{vj})  \\)`,
            ],
            ['(T) tržby celkové (€)', `\\(T=Q * P_{cj}\\)`],
            [
              '(VH) výsledok hospodárenia (zisk/strata) (€)',
              `\\(VH = T - N_{c}\\)`,
            ],
            [
              '(N<sub>0</sub>) - nulový bod',
              `\\(N_{0}=\\frac{F_{n}}{P_{cj}-N_{vj}}\\)`,
              '#9fcdf5',
            ],
            [
              '(N<sub>0</sub>) - nulový bod (€)',
              `\\(N_{0}=\\frac{Nf}{1-\\frac{N_{vj}}{P_{c}}}\\)`,
            ],
            [
              '(N<sub>0</sub>) - nulový bod Zmin',
              `\\(N_{0}=\\frac{F_{n}+Z_{min}}{P_{cj}-N_{vj}}\\)`,
            ],
            [
              '(VK<sub>krit</sub>) - kritické využitie výrobnej kapacity (%)',
              `\\(VK_{krit}=\\frac{N_{o}(ton)}{Q} * 100\\)`,
            ],
          ]}
          data={[
            totalCosts,
            incomeTotal,
            economicResult,
            zeroTon,
            zeroEur,
            zeroProf,
            capacityUsage,
          ]}
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <BarGraph
        title={'Bod zvratu'}
        height={420}
        data={headers.map((h, index) => ({
          name: h.label,
          values: [zeroTon[index]],
        }))}
        labels={['']}
        yAxisLabel="nulový bod"
      />

      <Spacer height={40} />

      <div>
        {headers.filter(Boolean).map((header, index) => (
          <Paper
            key={index}
            sx={{
              '&:not(:last-child)': {
                marginBottom: '40px',
              },
              pageBreakInside: 'avoid',
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                marginLeft: 2,
                marginTop: 1,
                fontSize: '24px',
                textAlign: 'center',
              }}
            >
              {header.label}
            </Typography>
            <BarGraph
              title={'Prehľad ekonomických ukazovateľov produktu'}
                height={420}
              data={[
                {
                  name: 'náklady celkové (N<sub>c</sub>)',
                  values: [+totalCosts[index]],
                },
                {
                  name: 'tržby celkové (T)',
                  values: [+incomeTotal[index]],
                },
                {
                  name: 'výsledok hospodárenia (VH)',
                  values: [+economicResult[index]],
                },
              ]}
              labels={['']}
              yAxisLabel="ekonomická veličina (€)"
            />
          </Paper>
        ))}
      </div>
    </div>
  );
}
