function aa(name: string, age: number): any[];
function aa(name: string, age: string): any[];
function aa(name: string, age: number | string): any[] {
  if (typeof age === 'number') {
    return [name, age]
  } else if (typeof age === 'string') {
    return [name, age]
  }
}


interface Alarm1 {
  alter(): void;
  hot: string;
}
interface Alarm1 {
  alter(): void;
  high: number;
  // hot: number;
}
interface Alarm1 {
  alter(): void;
  high: number;
}