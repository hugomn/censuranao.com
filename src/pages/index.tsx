import Head from "next/head";
import { GetStaticProps } from "next"
import { initializeApollo } from "lib/apollo";
import BaseTemplate from "templates/Base";
import { FindAllEntriesByRegiaoDocument, FindAllEntriesByRegiaoQuery, Entry } from "generated/graphql";
import NumberFormat from 'react-number-format';

type IndexPageProps = {
  entries: Entry[]
}

const IndexPage: React.FC<IndexPageProps> = ({ entries }) => {
  const totalDeaths = entries.reduce<number>((acc, { obitosNovos }) => acc + (obitosNovos ?? 0), 0)
  return (
    <BaseTemplate>
      <Head>
        <title>Painel Covid</title>
      </Head>
      <div>
        <div className="label">COVID19</div>
        <div className="title"><b>Painel</b> Coronavírus</div>
        <div className="updated">Atualizado em: 06/06/2020 22:00</div>

        <div className="card bg-white mt-8 max-w-sm w-full lg:max-w-full lg:flex">
          <div className="p-4 flex flex-col justify-between leading-normal">
            <div>
              <p className="text text-gray-600 flex items-center">
                Óbitos confirmados
              </p>
              <div className="total text-gray-900 font-bold text-xl mb-2">
                <NumberFormat value={totalDeaths} displayType={'text'} thousandSeparator={'.'} decimalSeparator= {','} />
              </div>
            </div>
          </div>
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
