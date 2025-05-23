import { UUID } from "./uuid"

export class Entity<T> {
  readonly props: T
  readonly id: string
  
  constructor(props: T, id?: string) {
    this.props = props
    this.id = UUID.create(id)
  }
}