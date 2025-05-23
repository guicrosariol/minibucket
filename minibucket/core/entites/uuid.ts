import { randomUUID } from "node:crypto";

export class UUID {
  static create(id?: string) {
    return id ?? randomUUID()
  }
}