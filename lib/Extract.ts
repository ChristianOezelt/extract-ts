import { DeepRequired } from './DeepRequired';

export type Extractor<InputT, ResultT> = (someInput: InputT) => ResultT;

export function extract<InputT, ResultT>(
  obj: InputT,
  extractor: Extractor<DeepRequired<InputT>, ResultT>,
): ResultT | undefined;

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

export function createExtractor<InputT, ResultT>(
  extractor: Extractor<DeepRequired<InputT>, ResultT>,
): (obj: InputT) => ResultT | undefined;

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
