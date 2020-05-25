[![Actions Status](https://github.com/UziTech/jasmine-expect-count/workflows/CI/badge.svg)](https://github.com/UziTech/jasmine-expect-count/actions)

# Jasmine Expect Count

Lets you specify the number of expects expected to be called.

## Installing

Save `jasmine-expect-count` in devDependencies

```sh
npm install jasmine-expect-count --save-dev
```

then require it

```js
require("jasmine-expect-count");
```

before your tests.

## Using

Jasmine Expect Count allows you to specify the number of expects to be called in an `it`.

```js
it("should call expect 3 times", function () {
  jasmine.expectCount(3);

  expect(1).toBe(1);

  const p = new Promise(function (resolve) {
    setTimeout(function () {
      expect(2).toBe(2);
      resolve();
    }, 1);
  });

  expect(3).toBe(3);

  // if returning p is forgotten only 2 expects will be called.
  return p;
});
```
