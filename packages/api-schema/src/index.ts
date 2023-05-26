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

export type RawUser = {
  id: string,
  email: string,
  password: string,
  tel: string,
  firstname: string,
  lastname: string,
  image: string,
  isBlacklist: boolean,
  registYear: number,
  roleId: number,
  branchId: number,
}

export type Book = {
  id: number,
  title: string,
  author: string,
  description: string,
  isbn: string,
  publisher: string,
  publishDate: Date,
  language: string,
  image: string,
  location: string,
}

export type BookWithCategories = {
  id: number,
  title: string,
  author: string,
  description: string,
  isbn: string,
  publisher: string,
  publishDate: Date,
  language: string,
  image: string,
  location: string,
  categories: Category[],
}

export type BookWithCount = {
  id: number,
  title: string,
  author: string,
  description: string,
  isbn: string,
  publisher: string,
  publishDate: Date,
  language: string,
  image: string,
  location: string,
  count: number,
}

export type Blog = {
  id: number,
  article: string,
  createdAt: Date,
  updatedAt: Date,
  userId: string,
  bookId: number,
}

export type BlogWithTags = {
  id: number,
  article: string,
  createdAt: Date,
  updatedAt: Date,
  userId: string,
  book: Book,
  tags: Tag[],
}

export type Order = {
  id: number,
  createdAt: Date,
  userId: string,
}

export type OrderWithItems = {
  id: number,
  createdAt: Date,
  userId: string,
  items: OrderItemJoinBook[],
}

export type Event = {
  id: number,
  name: string,
  location: string,
  meetingTime: Date,
  image: string,
  description: string,
}

export type EventWithCategories = {
  id: number,
  name: string,
  location: string,
  meetingTime: Date,
  image: string,
  description: string,
  categories: EventCategory[],
}

export type OrderItem = {
   orderId: number,
   bookId: number,
   latestNotify: Date,
   receivedDate: Date,
   returnedDate: Date,
}

export type OrderItemJoinBook = {
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

export type Room = {
  id: number,
  name: string,
  location: string,
  image: string,
}

export type RoomWithTimePeriods = {
  id: number,
  name: string,
  location: string,
  image: string,
  timePeriods: TimePeriod[],
}

export type Role = {
  id: number,
  name: string,
}

export type Branch = {
  id: number,
  name: string,
}

export type CartItem = {
  userId: string,
  bookId: number,
}

export type Category = {
  id: number,
  name: string,
}

export type Tag = {
  id: number,
  name: string,
}

export type EventCategory = {
  id: number,
  name: string,
}

export type TimePeriod = {
  id: number,
  beginTime: string,
  endTime: string,
}

export type EventMember = {
  eventId: number,
  userId: string,
}

export type BookingRoom = {
  id: number,
  date: Date,
  roomTimePeriodId: number,
}

export type SendEmailInfo = {
  id: number,
  title: string,
  image: string,
  email: string,
}
