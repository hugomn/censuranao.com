import Head from "next/head";
import { GetStaticProps } from "next"
import { initializeApollo } from "lib/apollo";
import BaseTemplate from "templates/Base";
import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label,
} from 'recharts';  

import styles from "./index.module.scss"
import useWindowSize from "hooks/useWindowSize";
import { DailyEntry, EntryType, FindAllDailyEntriesBySourceQuery, FindAllDailyEntriesBySourceDocument, Source } from "generated/graphql";
import { useState } from "react";

type IndexPageProps = {
  data: { source: Source, entries: DailyEntry[] }[]
}

const groupEntriesByWeek = (entries: DailyEntry[]): DailyEntry[] => {
  const grouped: DailyEntry[] = [];
  for(let entry of entries) {
    const existing = grouped.find(e => e.epiWeek === entry.epiWeek);
    if (existing) {
      existing.newDeaths = (existing.newDeaths ?? 0) + (entry.newDeaths ?? 0);
      existing.newCases = (existing.newCases ?? 0) + (entry.newCases ?? 0);
    } else {
      grouped.push({ ...entry });
    }
  }
  return grouped;
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const [ source, setSource ] = useState<Source>(Source.HealthMinister);
  const entries = data?.find(s => s.source === source)?.entries ?? [];
  // const [ totalCases, totalDeaths ] = entries.reduce<number[]>((acc, { newCases, newDeaths }) => [acc[0] + (newCases ?? 0), acc[1] + (newDeaths ?? 0)], [0, 0])
  const { newCases, totalCases, newDeaths, totalDeaths } = entries[entries.length - 1];
  const { width = 1200 } = useWindowSize()
  const handleChangeSource = (event: React.FormEvent<HTMLSelectElement>): void => {
    setSource(event.currentTarget.value as Source);
  };
  const chartAxisInterval = Math.floor(width < 1020 ? 1020*8 / width : 1020*8 / width);
  const description = `O Painel Coronavírus é uma iniciativa independente de desenvolvedores de software, designers a profissionais de 
  tecnologia, em resposta às ações do governo federal que, ao restringir informações em seus boletins diários do Coronavírus,
  compremetem a clareza necessária ao povo brasileiro num momento de pandemia e em que informações são essenciais para a 
  tomada de decisão individual.`;

  return (
    <BaseTemplate>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
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
          type: 'website'
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <>
        <div className={clsx("flex flex-col md:flex-row items-center justify-between", styles.header)}>
          <div className={clsx("flex flex-row items-center text-lg md:text-2xl", styles.logo)}>
            <b>CORONAVÍRUS</b>
            <img className={styles.logoImage} src="/images/img-logo.png"></img>
            <span className={styles.tagline}>CENSURA NÃO</span>
          </div>
          <div className={clsx("flex flex-row items-center md:mt-0 mt-3", styles.sourceDropdown)}>
            <div className="mr-3">Fonte: </div>
            <div className="inline-block relative w-64">
              <select onChange={handleChangeSource} value={source} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option value={Source.HealthMinister}>Ministério da Saúde</option>
                <option value={Source.Brasilio}>Brasil.io</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        <div className={clsx("mt-24 md:mt-20", styles.welcome)}>
          <div className={styles.subtitle}>COVID19</div>
          <div className={styles.title}><b>Painel</b> Coronavírus</div>
          <div className={styles.updated}>Atualizado em: 14/06/2020 18:20</div>
        </div>

        <div className="flex flex-col md:flex-row ">
          
          <div className={clsx(styles.casesWrapper, "bg-white mt-8 w-full lg:flex")}>
            <div className="px-5 py-6 flex flex-col justify-between leading-normal">
              <div>
                <p className={styles.casesTitle}>
                  Casos confirmados
                </p>
                <div className={clsx("flex flex-row")}>
                  <div>
                    <div className={clsx(styles.total, "mb-2")}>
                      <NumberFormat value={totalCases ?? 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator= {','} />
                    </div>
                    <div className={styles.label}>Acumulado</div>
                  </div>
                  <div className={clsx(styles.totalContainer, "ml-16")}>
                    <div className={clsx(styles.total, "mb-2 text-3xl")}>
                      <NumberFormat value={newCases ?? 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator= {','} />
                    </div>
                    <div className={styles.label}>Casos novos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={clsx(styles.deathsWrapper, "bg-white mt-8 w-full lg:flex md:ml-8")}>
            <div className="px-5 py-6 flex flex-col justify-between leading-normal">
              <div>
                <p className={styles.deathsTitle}>
                  Óbitos confirmados
                </p>

                <div className={clsx("flex flex-row")}>
                  <div>
                    <div className={clsx(styles.total, "mb-2")}>
                      <NumberFormat value={totalDeaths ?? 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator= {','} />
                    </div>
                    <div className={styles.label}>Acumulado</div>
                  </div>
                  <div className={clsx(styles.totalContainer, "ml-16")}>
                    <div className={clsx(styles.total, "mb-2 text-3xl")}>
                      <NumberFormat value={newDeaths ?? 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator= {','} />
                    </div>
                    <div className={styles.label}>Casos novos</div>
                  </div>
                </div>

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
                  tecnologia, em resposta às ações do governo federal que, ao restringir informações em seus boletins diários do Coronavírus,
                  compremetem a clareza necessária ao povo brasileiro num momento de pandemia e em que informações são essenciais para a 
                  tomada de decisão individual.</p>
              </div>
            </div>
          </div>
          <p className={styles.source}>Fonte: Ministário da Saúde e Secretarias 
          Estaduais de Saúde. Brasil, 2020. Portal <a href="https://brasil.io/dataset/covid19/caso_full/" target="_blank">Brasil.io</a>.</p>
        </div>

        <div className="flex flex-col">
          <div className={styles.casesChartSectionTitle}><b>Casos</b> Confirmados</div>
          <div className="flex flex-col lg:flex-row ">

            <div className={clsx(styles.chartWrapper, "bg-white mt-8 w-full lg:w-1/2 lg:flex")}>
              <div className="px-5 py-6 flex flex-col w-full justify-between leading-normal">
                <p className={styles.chartTitle}>
                  Casos novos de COVID-19 por data de notificação
                </p>
                <div className={clsx(styles.chart)}>
                  <ResponsiveContainer width="100%" height={450}>
                    <BarChart data={entries} >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" angle={-45} height={100} textAnchor="end" interval={chartAxisInterval}>
                        <Label value="Data da notificação" className={styles.chartLabel}></Label>
                      </XAxis>
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="newCases" name="Casos novos" fill="#1da584" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className={clsx(styles.chartWrapper, "bg-white mt-8 w-full lg:w-1/2 lg:flex lg:ml-8")}>
              <div className="px-5 py-6 flex flex-col w-full justify-between leading-normal">
                <p className={styles.chartTitle}>
                Casos novos de COVID-19 por Semana Epidemiológica de notificação
                </p>
                <div className={clsx(styles.chart)}>
                <ResponsiveContainer width="100%" height={450}>
                  <BarChart data={groupEntriesByWeek(entries)} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="epiWeek" height={100}>
                      <Label value="Semana Epidemiológica" className={styles.chartLabel}></Label>
                    </XAxis>
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="newCases" name="Casos novos" fill="#1da584" />
                  </BarChart>
                </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>
        </div>


        <div className="flex flex-col mt-8 mb-8">
          <div className={styles.chartSectionTitle}><b>Óbitos</b> Confirmados</div>
          <div className="flex flex-col lg:flex-row ">

            <div className={clsx(styles.chartWrapper, "bg-white mt-8 w-full lg:w-1/2 lg:flex")}>
              <div className="px-5 py-6 flex flex-col w-full justify-between leading-normal">
                <p className={styles.chartTitle}>
                  Óbitos de COVID-19 por data de notificação
                </p>
                <div className={clsx(styles.chart)}>
                  <ResponsiveContainer width="100%" height={450}>
                    <BarChart data={entries} >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" angle={-45} height={100} textAnchor="end" interval={chartAxisInterval}>
                        <Label value="Data da notificação" className={styles.chartLabel}></Label>
                      </XAxis>
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="newDeaths" name="Óbitos novos" fill="#9a36bb" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className={clsx(styles.chartWrapper, "bg-white mt-8 w-full lg:w-1/2 lg:flex lg:ml-8")}>
              <div className="px-5 py-6 flex flex-col justify-between w-full leading-normal">
                <p className={styles.chartTitle}>
                  Óbitos de COVID-19 por Semana Epidemiológica de notificação
                </p>
                <div className={clsx(styles.chart)}>
                <ResponsiveContainer width="100%" height={450}>
                  <BarChart data={groupEntriesByWeek(entries)} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="epiWeek" height={100}>
                      <Label value="Semana Epidemiológica" className={styles.chartLabel}></Label>
                    </XAxis>
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="newDeaths" name="Óbitos novos" fill="#9a36bb" />
                  </BarChart>
                </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>
        </div>

      </>
    </BaseTemplate>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{ props: IndexPageProps }> => {
  const findEntriesBySource = async (source: Source): Promise<DailyEntry[]> => {
    const entries: DailyEntry[] = []
    let after: string | undefined | null;
    do {
      const { data } = await initializeApollo().query<FindAllDailyEntriesBySourceQuery>({ query: FindAllDailyEntriesBySourceDocument, variables: { entryType: EntryType.Country, name: "Brasil", source, cursor: after  } })
      entries.push(...(data.findAllDailyEntriesBySource.data as DailyEntry[]))
      after = data.findAllDailyEntriesBySource.after
    } while (after);
    return entries;
  }
  const brasilioEntries = await findEntriesBySource(Source.Brasilio);
  const healthMinisterEntries = await findEntriesBySource(Source.HealthMinister);
  return { props: { data: [
    { source: Source.Brasilio, entries: brasilioEntries.sort((a, b) => Date.parse(a.date) - Date.parse(b.date)) },
    { source: Source.HealthMinister, entries: healthMinisterEntries.sort((a, b) => Date.parse(a.date) - Date.parse(b.date)) }
  ] } }
}

export default IndexPage
