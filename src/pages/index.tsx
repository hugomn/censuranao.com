import Head from "next/head";
import TableRow from "components/TableRow";
import { GetStaticProps } from "next"
import { initializeApollo } from "lib/apollo";
import BaseTemplate from "templates/Base";
import { FindAllEntriesByRegiaoDocument, FindAllEntriesByRegiaoQuery, Entry } from "generated/graphql";

type IndexPageProps = {
  entries: Entry[]
}

const IndexPage: React.FC<IndexPageProps> = ({ entries }) => {
  return (
    <BaseTemplate>
      <Head>
        <title>Painel Covid</title>
      </Head>
      <h1>Censura não - painel covid-19</h1>
      <hr />
      <div className="container-scroll">
        <div className="container">
          <h2>Countries Data</h2>
          <div className="table">
            <h4>code</h4>
            <h4 className="telephone">name</h4>
          </div>
          {entries?.length > 0 ? (
            entries?.map((d) => (
              <TableRow
                key={d?.data}
                code={d?.data}
                name={d?.obitosAcumulado?.toString()}
                loading={false}
              />
            ))
          ) : (
            <>
              No data...
            </>
          )}
        </div>
      </div>
    </BaseTemplate>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{ props: IndexPageProps }> => {
  const entries: Entry[] = []
  let after: string | undefined | null;
  do {
    const { data } = await initializeApollo().query<FindAllEntriesByRegiaoQuery>({ query: FindAllEntriesByRegiaoDocument, variables: { regiao: "Brasil", cursor: after  } })
    entries.push(...(data.findAllEntriesByRegiao.data as Entry[]))
    after = data.findAllEntriesByRegiao.after
  } while (after);
  return { props: { entries  } }
}

export default IndexPage
