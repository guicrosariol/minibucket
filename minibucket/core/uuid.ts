export class UUID {
  static create() {
    return crypto.randomUUID();
  }
}