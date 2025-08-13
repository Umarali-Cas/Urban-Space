import { EcoBaner } from "@/entities/EcoBaner";
import { Hero } from "@/widgets/Hero";
import { LastIdeas } from "@/widgets/LastIdeas";

export default function Home() {
  return (
    <>
      <Hero />
      <EcoBaner />
      <LastIdeas />
    </>
  )
}
