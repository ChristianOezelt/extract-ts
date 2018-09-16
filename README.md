# ts-extract

<p align="center">
    <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="code style: prettier"></a>
    <a href="https://github.com/facebook/jest"><img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="tested with: jest"></a>
    <a><img src="https://img.shields.io/badge/typings-included-brightgreen.svg" alt="tested with: jest"></a>
</p>

This library is a type safe alternative to lodash's get.

---

<p align="center">
  <a href="#setup">Setup</a>&nbsp;&nbsp;
  <a href="#api-documentation">API Documentation</a>&nbsp;&nbsp;
  <a href="#local-development">Local Development</a>&nbsp;&nbsp;
</p>

---

The main advantage of this version is that it allows accessing many nested optional layers. <br />
This library expects you to be using typescript 2.8.0, or above.

## Setup

Install via npm (or yarn)

```bash
npm i ts-extract --save
```

After that you may use it:

```ts
const resultWithDefault: string = extract(
    testObject,                  // object you want to extract a value of
    obj => obj.data.desiredData, // extract the value
    ''                           // default value, optional parameter
);

// if you omit the default value, extract may also return undefined
const resultWithoutDefault: string | undefined = extract(testObject, obj => obj.data.desiredData);

// per default the type of the default value equals the result type of the extractor
// but you can change that wen you specify the types:
const result: string | number = <SomeTypeYouWantToAccess, string, number>(
    testObject,
    obj => obj.data.desiredData,
    10
);
```

## Local Development

After checking out the repository, you just need to run `npm install`.<br />
You will find many useful commands in the table below.

### Useful commands

| npm command           | description                                |
| --------------------- | ------------------------------------------ |
| npm run build         | productive build of this library           |
| npm run test          | runs all unit tests of this library        |
| npm run test:coverage | runs unit tests and evaluates the coverage |
| npm run verify        | checks test coverage and runs the linter   |
| npm run lint          | runs tslint                                |

---

## Contributing

Please follow the following steps if you want to contribute:

- ( create an issue, introducing the change )
- assign yourself to the issue you want to work on
- open a pullrequest with your changes

## Authors

- [**Christian Özelt**](https://github.com/ChristianOezelt) - _initial setup and implementation_ - [christian.oezelt@gmail.com](mailto:christian.oezelt@gmail.com)

## Licence

MIT
