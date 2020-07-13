# Utils

[![Build Status](https://travis-ci.org/teclone/utils.svg?branch=master)](https://travis-ci.org/teclone/utils)
[![Coverage Status](https://coveralls.io/repos/github/teclone/utils/badge.svg?branch=master)](https://coveralls.io/github/teclone/utils?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](https://badge.fury.io/js/%40teclone%2Futils.svg)](https://badge.fury.io/js/%40teclone%2Futils)
![npm](https://img.shields.io/npm/dt/%40teclone%2Futils.svg)

Utils is a collection of utility methods for day to day web application and library development. It is developed for reusability purposes as it is utilized by most of all libraries published by same author.

If you bumped into this project and find it useful for your project, please don't hesitate to give us a star. Because it is a typescript project, you get excellent auto-completion and type checks.

## Installation

```bash
npm install @teclone/utils
```

## Usage Sample

```typescript
import { scopeCallback, camelCase, copy, range, expandProperty } from '@teclone/utils';

console.log(camelCase('my-string')); //logs myString
console.log(camelCase('my:string', ':')); //logs myString

//copy objects without creating references
const myObject = {
  headers: {
    contentType: 'text/html',
  },
  colors: ['#fff', 'green', '#808080'],
};
const myObjectCopy = copy({}, myObject);

//changing headers does not change the copy
myObject.headers.contentType = 'text/css';
console.log(myObjectCopy.headers.contentType); //logs text/html

// expand property into a target object
const result = expandProperty({}, 'headers.contentType', 'text/css');
console.log(result.headers.contentType); // logs text/css
```
