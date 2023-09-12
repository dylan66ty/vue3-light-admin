export interface TagItem {
  title: string
  path: string
  hiddenClose?: boolean
}

export interface TagState {
  tags: TagItem[]
  active: string
}