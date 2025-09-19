/* eslint-disable @typescript-eslint/no-explicit-any */
import { EcoBaner } from "@/entities/EcoBaner";
import { Articles } from "@/widgets/Articles";
import { Hero } from "@/widgets/Hero";
import { LastIdeas } from "@/widgets/LastIdeas";
import { News } from "@/widgets/News";


export default async function Home({ params }: { params: { locale: string }}) {

  const { locale } = await Promise.resolve(params) 

  const res = await fetch(
    `https://api.urbanspace.sdinis.org/pages/home?locale=${locale}`
  );
  const data = await res.json();

  
  const heroData = data.blocks.find((b: any) => b.type === 'hero')?.data;
  const ecoBaner = data.blocks.find((b: any) => b.type === 'features')?.data;
  const cta = data.blocks.filter((b: any) => b.type === 'cta');

  const lastIdeas = cta?.[0].data;
  const news = cta?.[1].data;
  const articles = cta?.[2].data;
  
  return (
    <>
      <Hero title={heroData.title}/>
      <EcoBaner title={ecoBaner.title} desc={ecoBaner.desc}/>
      <LastIdeas
        title={lastIdeas.title}
        subtitle={lastIdeas.desc}
        viewCards={3}
      />
      <News title={news.title} desc={news.desc}/>
      <Articles title={articles.title} desc={articles.desc}/>
    </>
  )
}
