/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LastIdeasProps {
    title: string
    subtitle: string
    viewCards?: number
    selected?: (idea: any) => void
    showSelectButton?: boolean
  }