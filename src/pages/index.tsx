import Head from "next/head";
import { GetStaticProps } from "next"
import { initializeApollo } from "lib/apollo";
import BaseTemplate from "templates/Base";
import { FindAllEntriesByRegiaoDocument, FindAllEntriesByRegiaoQuery, Entry } from "generated/graphql";
import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';

import styles from "./index.module.scss"

type IndexPageProps = {
  entries: Entry[]
}

const IndexPage: React.FC<IndexPageProps> = ({ entries }) => {
  const [ totalCases, totalDeaths ] = entries.reduce<number[]>((acc, { casosNovos, obitosNovos }) => [acc[0] + (casosNovos ?? 0), acc[1] + (obitosNovos ?? 0)], [0, 0])
  const description = `O Painel Coronavírus é uma iniciativa independente de desenvolvedores de software, designers a profissionais de 
  tecnologia, em respostas às ações do governo federal que, ao restringir informações em seus boletins diários do Coronavírus,
  compremetem a clareza necessária ao povo brasileiro num momento de pandemia e em que informações são essenciais para a 
  tomada de decisão individual.`;

  return (
    <BaseTemplate>
      <NextSeo
        title="Coronavírus Brasil - Censura Não!"
        description={description}
        canonical="https://www.censuranao.com/"
        openGraph={{
          url: 'https://www.censuranao.com/',
          title: 'Coronavírus Brasil - Censura não!',
          description,
          images: [
            {
              url: 'https://www.censuranao.com/images/censuranao-screen.jpg',
              width: 800,
              height: 600,
              alt: 'Painel Coronavírus - Censura não!',
            },
          ],
          site_name: 'Censura não!',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <>
        <div className={clsx(styles.welcome, "mt-8")}>
          <div className={styles.subtitle}>COVID19</div>
          <div className={styles.title}><b>Painel</b> Coronavírus</div>
          <div className={styles.updated}>Atualizado em: 06/06/2020 23:00</div>
        </div>

        <div className="flex flex-col md:flex-row ">
          
          <div className={clsx(styles.casesWrapper, "bg-white mt-8 w-full lg:flex")}>
            <div className="px-5 py-6 flex flex-col justify-between leading-normal">
              <div>
                <p className={styles.casesTitle}>
                  Casos confirmados
                </p>
                <div className={clsx(styles.total, "mb-2")}>
                  <NumberFormat value={totalCases} displayType={'text'} thousandSeparator={'.'} decimalSeparator= {','} />
                </div>
                <div className={styles.label}>Acumulado</div>
              </div>
            </div>
          </div>
          
          <div className={clsx(styles.deathsWrapper, "bg-white mt-8 w-full lg:flex md:ml-8")}>
            <div className="px-5 py-6 flex flex-col justify-between leading-normal">
              <div>
                <p className={styles.deathsTitle}>
                  Óbitos confirmados
                </p>
                <div className={clsx(styles.total, "mb-2")}>
                  <NumberFormat value={totalDeaths} displayType={'text'} thousandSeparator={'.'} decimalSeparator= {','} />
                </div>
                <div className={styles.label}>Acumulado</div>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col">
          
          <div className={clsx(styles.aboutWrapper, "bg-white mt-8 w-full")}>
            <div className="px-5 py-6 flex flex-col justify-between leading-normal">
              <div>
                <p className={styles.aboutTitle}>
                  <b>Sobre o painel Censura não!</b>
                </p>
                <p>O Painel Coronavírus é uma iniciativa independente de desenvolvedores de software, designers a profissionais de 
                  tecnologia, em respostas às ações do governo federal que, ao restringir informações em seus boletins diários do Coronavírus,
                  compremetem a clareza necessária ao povo brasileiro num momento de pandemia e em que informações são essenciais para a 
                  tomada de decisão individual.</p>
              </div>
            </div>
          </div>
          <p className={styles.source}>Fonte: <a href="https://mobileapps.saude.gov.br/esus-vepi/files/unAFkcaNDeXajurGB7LChj8SgQYS2ptm/c7d4f3371dc96ba0935d5c74d4daff05_HIST_PAINEL_COVIDBR_06jun2020.xlsx" target="_blank">Planilha oficial do Ministério da Saúde, 06/06/2020</a> e Secretarias Estaduais de Saúde. Brasil, 2020</p>

        </div>
      </>
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
