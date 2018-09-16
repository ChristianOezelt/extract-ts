export type DeepRequired<T extends {}> = Required<T> & { [P in keyof T]: DeepRequired<T[P]> };
