export type Message = {
    id: number,
    text: string,
    author: string,
    date: Date,
    role: string
  }
  
  export type ChatHistory = {
    _id: string,
    title: string,
  }