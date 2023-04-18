export type User = {
  id: string,
  email: string,
  tel: string,
  firstname: string,
  lastname: string,
  image: string,
  isBlacklist: boolean,
  registYear: number,
  role: string,
  branch: string,
}

export type Role = {
  id: number,
  name: string,
}

export type Branch = {
  id: number,
  name: string,
}

export type Order = {
  id: number,
  createdAt: Date,
  userId: string,
}

export type OrderItem = {
  id: number,
  title: string,
  author: string,
  description: string,
  isbn: string,
  publisher: string,
  publishDate: Date,
  languages: string,
  image: string,
  location: string,
  latestNotify: Date,
  receivedDate: Date,
  returnedDate: Date,
}

export type OrderWithItem = {
  id: number,
  createdAt: Date,
  items: OrderItem[],
}
