
export type AdType = {
    id: string,
    title: string,
    description: string,
    price: 3000,
    picture: string,
    location: string,
    created_at: string,
    updated_at: string,
    category?: {
      id?: string,
      title?: string,
      created_at?: string,
      updated_at?: string
    },
    tags?: [
      {
        id?: string,
        label?: string,
        created_at?: string,
        updated_at?: string
      }
    ]
  }