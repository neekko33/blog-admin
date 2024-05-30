export interface PostType {
  id: string
  key: string
  title: string
  content?: string
  published: boolean
  authorId?: string
  categoryId?: string
  author: string
  category: string
  tags: string[]
  creatAt: string
  updateAt: string
}

export interface CategoryType {
  key: string
  id: string
  name: string
  createAt: string
  updateAt: string
  postCount: number
}

export type SelectType = {
  title?: string
  category?: string
  tags?: string[]
}
