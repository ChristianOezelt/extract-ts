/**
 * DeepRequired is like Required<T>, just that it works recursive
 * through all nested layers
 *
 * ```ts
 * // Example:
 *
 * interface MyInterface {
 *   data?: {
 *     someValue? : string;
 *   }
 * }
 *
 * interface EverythingIsRequired extends DeepRequired<MyInterface> {}
 *
 * const variable: EverythingIsRequired = {
 *   data: {} // type error because someValue is not defined
 * }
 * ```
 *
 * @param T Type to convert
 */
export type DeepRequired<T extends {}> = Required<T> & { [P in keyof T]: DeepRequired<T[P]> };
