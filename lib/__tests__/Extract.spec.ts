import { createExtractor, extract } from '..';

interface TestType {
  someObj?: {
    someString?: string;
  };
  someArray?: TestType[];
}

describe('extract', () => {
  describe('with defaultValue', () => {
    it('should return the defaultValue if the extractor does not resolve', () => {
      const input: TestType = { someObj: {} };
      const defaultValue: string = 'someDefault';
      const expectedResult: string = 'someDefault';

      const result = extract(input, data => data.someObj.someString, defaultValue);

      expect(result).toMatch(expectedResult);
    });

    it('should return the defaultValue if an error occurs', () => {
      const input: TestType = {};
      const defaultValue: string = 'someDefault';
      const expectedResult: string = 'someDefault';

      const result = extract(input, data => data.someObj.someString, defaultValue);

      expect(result).toMatch(expectedResult);
    });

    it('should return the extractable value', () => {
      const input: TestType = { someObj: { someString: 'someThingNested' } };
      const defaultValue: string = 'someDefault';
      const expectedResult: string = 'someThingNested';

      const result = extract(input, data => data.someObj.someString, defaultValue);

      expect(result).toMatch(expectedResult);
    });
  });

  describe('without defaultValue', () => {
    it('should return undefined if the value is not extractable', () => {
      const input: TestType = { someObj: {} };

      const result = extract(input, data => data.someObj.someString);

      expect(result).toBeUndefined();
    });

    it('should not return undefined if the value is extractable', () => {
      const input: TestType = { someObj: { someString: 'someValue' } };

      const result = extract(input, ({ someObj: { someString } }) => someString);

      expect(result).toBeDefined();
    });
  });

  describe('with Array', () => {
    const input: TestType = {
      someArray: [{ someObj: { someString: 'stringUnderArray' } }],
    };
    const expectedResult: string = 'stringUnderArray';

    const result = extract(input, ({ someArray }) => someArray[0].someObj.someString);

    expect(result).toBeDefined();
    expect(result).toMatch(expectedResult);
  });
});

describe('createExtractor', () => {
  it('should create a working extractor', () => {
    const getTestString: (obj: TestType) => string = createExtractor<TestType, string>(
      obj => obj.someObj.someString,
    );
    const input: TestType = {
      someObj: {
        someString: 'somethingValid',
      },
    };
    const expectedResult = 'somethingValid';

    const result = getTestString(input);

    expect(result).toBeDefined();
    expect(result).toMatch(expectedResult);
  });
});
