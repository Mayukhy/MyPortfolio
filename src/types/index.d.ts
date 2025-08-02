interface Music {
    name?: string
    icon?: string
    src: string
  }
  
  interface ThemeData {
    id?: string
    name: string
    description: string
    audioFile: File | null
    colorScheme: string
    tags?: string[]
    src?: string
  }