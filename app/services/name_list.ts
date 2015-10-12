export class NameList {
  names = ['Dijkstra', 'Knuth', 'Turing', 'Hopper'];

  get(): string[] {
    return this.names;
  }
  add(value: string):void {
    this.names.push(value);
  }
  remove(index: number):void {
    this.names.splice(index, 1);
  }
}
