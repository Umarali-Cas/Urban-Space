import { EcoBaner } from "@/entities/EcoBaner";
import { MapSearch } from "@/features/MapSearch";
import { Articles } from "@/widgets/Articles";
import { Hero } from "@/widgets/Hero";
import { LastIdeas } from "@/widgets/LastIdeas";
import { News } from "@/widgets/News";


export default function Home() {
  return (
    <>
      <Hero />
      <EcoBaner />
      <LastIdeas />
      <MapSearch />
      <News />
      <Articles />
    </>
  )
}
