export interface PartialDocument<T = string> {
  [key: string]: any;
  _id: T;
}