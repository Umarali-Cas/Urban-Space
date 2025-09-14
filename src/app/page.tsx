import { EcoBaner } from "@/entities/EcoBaner";
import { MapSearch } from "@/widgets/MapSearch";
import { Articles } from "@/widgets/Articles";
import { Hero } from "@/widgets/Hero";
import { LastIdeas } from "@/widgets/LastIdeas";
import { News } from "@/widgets/News";


export default function Home() {
  return (
    <>
      <Hero />
      <EcoBaner />
      <LastIdeas
        title="Последние добавленные идеи"
        subtitle="Свежие предложения от участников сообщества"
        viewCards={3}
      />
      {/* <MapSearch /> */}
      <News />
      <Articles />
    </>
  )
}
