import { LastIdeas } from '@/widgets/LastIdeas'

export default function BankIdeas() {
  return (
    <>
      <LastIdeas
        title="Банк идей"
        subtitle="Свежие предложения от участников сообщества"
        viewCards={9}
      />
    </>
  )
}
