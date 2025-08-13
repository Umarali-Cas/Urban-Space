import { EcoBaner } from "@/entities/EcoBaner";
import { Hero } from "@/widgets/Hero";
import { LastIdeas } from "@/widgets/LastIdeas";
import { News } from "@/widgets/News";

export default function Home() {
  return (
    <>
      <Hero />
      <EcoBaner />
      <LastIdeas />
      <News />
    </>
  )
}
