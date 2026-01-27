import TextArea from '../components/Textarea';
import { RootSelectors } from '../store/store';
import withTable from '../components/tables/HOCTable';
import Page from '@renderer/components/layout/Page';
import PageContent from '@renderer/components/layout/PageContent';
import Spacer from '@renderer/components/Spacer';
import { Paper, styled, Typography } from '@mui/material';
import { routes } from '@renderer/routes';
import { useAppSelector } from '@renderer/store/hooks';
import SectionTitle from '@renderer/components/SectionTitle';

const PrintPageTitle = styled(Typography)`
  font-weight: 700;
  font-size: 36px;
  color: ${({ theme }) => theme.palette.primary.main};
  text-align: center;
  width: 100%;
`;

export default function withAnalysis(
  selectors: RootSelectors,
  actions: any,
  TableItems: React.FC<any>,
  TableHeaders: React.FC<any>,
  Result: React.FC,
  routeName: string,
) {
  return () => {
    const Table: () => JSX.Element = withTable(
      TableItems,
      TableHeaders,
      selectors,
      actions,
    );

    const title = routes[routeName].title;
    const textConclusion = useAppSelector(selectors.textConclusion);
    const textEvaluation = useAppSelector(selectors.textEvaluation);

    return (
      <Page id={routeName.replace('/', '')}>
        <PageContent>
          <PrintPageTitle className="hideInScreen">{title}</PrintPageTitle>
          <Table />
          <Result />
          <Spacer height={20} hideInPrint />

          <div style={{ pageBreakInside: 'avoid' }}>
            <SectionTitle>Záver</SectionTitle>

            <TextArea
              selectors={selectors}
              actions={actions}
              textSelector={selectors.textConclusion}
              actionCreator={(value) => actions.changeTextConclusion(value)}
              className="hideInPrint"
              placeholder="Sem napíšte záver analýzy..."
            />

            <Paper>
              <Typography
                sx={{
                  whiteSpace: 'pre-line',
                  p: 2,
                }}
                className="hideInScreen"
              >
                {textConclusion}
              </Typography>
            </Paper>
          </div>

          <Spacer height={20} hideInPrint />

          <div className="page-break">
            <SectionTitle>Zhodnotenie analýzy</SectionTitle>

            <TextArea
              selectors={selectors}
              actions={actions}
              textSelector={selectors.textEvaluation}
              actionCreator={(value) => actions.changeTextEvaluation(value)}
              className="hideInPrint"
              placeholder="Sem napíšte zhodnotenie analýzy..."
            />

            <Paper>
              <Typography
                sx={{
                  whiteSpace: 'pre-line',
                  p: 2,
                }}
                className="hideInScreen"
              >
                {textEvaluation}
              </Typography>
            </Paper>
          </div>
        </PageContent>
      </Page>
    );
  };
}