import { DeepRequired } from './DeepRequired';

/**
 * An Extractor is a function that takes an input value of any type
 * and returns a Result of any type (may even be the same type)
 */
export type Extractor<InputT, ResultT> = (someInput: InputT) => ResultT;

/**
 * Takes a Object of any type and applies the given extractor on it.
 * @param InputT Type of the input object
 * @param ResultT Type that extract will return
 * @param obj The initial object, you want to extract something from
 * @param extractor that takes obj and returns a part of tis object, or transforms it
 * @returns what the extractor returns, or undefined (will never throw)
 */
export function extract<InputT, ResultT>(
  obj: InputT,
  extractor: Extractor<DeepRequired<InputT>, ResultT>,
): ResultT | undefined;

/**
 * Takes an object of any type and applies the given extractor on it.
 * @param InputT Type of the input object
 * @param ResultT Type that extract will return
 * @param DefaultT Type fo the default value, defaults to ResultT
 * @param obj The initial object, you want to extract something from
 * @param extractor that takes obj and returns a part of tis object, or transforms it
 * @param defaultValue returned if extractor returns undefined, or if extractor throws an exception
 * @returns what the extractor returns, or te specified defaultValue (will never throw)
 */
export function extract<InputT, ResultT, DefaultT = ResultT>(
  obj: InputT,
  extractor: Extractor<DeepRequired<InputT>, ResultT>,
  defaultValue: DefaultT,
): ResultT | DefaultT;

export function extract<InputT, ResultT, DefaultT = ResultT>(
  obj: InputT,
  extractor: Extractor<DeepRequired<InputT>, ResultT>,
  defaultValue?: ResultT,
): (ResultT | undefined) | (ResultT | DefaultT) {
  try {
    return extractor(obj as DeepRequired<InputT>) || defaultValue;
  } catch (ex) {
    return defaultValue;
  }
}

/**
 * Creates a function that calls extract on an object.
 * It is important that you always specify the type parameters!
 * @param InputT Type of the input object
 * @param ResultT Type that extract will return
 * @param extractor that takes obj and returns a part of tis object, or transforms it
 * @returns a function that takes an object of type InputT and returns something of type ResultT
 */
export function createExtractor<InputT, ResultT>(
  extractor: Extractor<DeepRequired<InputT>, ResultT>,
): (obj: InputT) => ResultT | undefined;

/**
 * Creates a function that calls extract on an object.
 * It is important that you always specify the type parameters!
 * @param InputT Type of the input object
 * @param ResultT Type that extract will return
 * @param DefaultT Type fo the default value, defaults to ResultT
 * @param obj The initial object, you want to extract something from
 * @param extractor that takes obj and returns a part of tis object, or transforms it
 * @param defaultValue returned if extractor returns undefined, or if extractor throws an exception
 * @returns either something of type ResultT or the defaultValue
 */
export function createExtractor<InputT, ResultT, DefaultT = ResultT>(
  extractor: Extractor<DeepRequired<InputT>, ResultT>,
  defaultValue: DefaultT,
): (obj: InputT) => ResultT | DefaultT;

export function createExtractor<InputT, ResultT, DefaultT = ResultT>(
  extractor: Extractor<DeepRequired<InputT>, ResultT>,
  defaultValue?: DefaultT,
) {
  return (obj: InputT) => extract(obj, extractor, defaultValue);
}
