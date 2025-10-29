import { Cache } from "./pokecache.js";
import { test, expect, describe } from "vitest";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500,
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000,
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 2 + 100));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});

describe("Cache additional tests", () => {
  test("get returns undefined for non-existent key", () => {
    const cache = new Cache(1000);
    const result = cache.get("non-existent-key");
    expect(result).toBe(undefined);
    cache.stopReapLoop();
  });

  test("cache can store multiple entries", () => {
    const cache = new Cache(5000);

    cache.add("key1", "value1");
    cache.add("key2", "value2");
    cache.add("key3", "value3");

    expect(cache.get("key1")).toBe("value1");
    expect(cache.get("key2")).toBe("value2");
    expect(cache.get("key3")).toBe("value3");

    cache.stopReapLoop();
  });

  test("cache can store different types", () => {
    const cache = new Cache(5000);

    cache.add("string", "hello");
    cache.add("number", 42);
    cache.add("object", { foo: "bar" });
    cache.add("array", [1, 2, 3]);

    expect(cache.get("string")).toBe("hello");
    expect(cache.get("number")).toBe(42);
    expect(cache.get("object")).toEqual({ foo: "bar" });
    expect(cache.get("array")).toEqual([1, 2, 3]);

    cache.stopReapLoop();
  });

  test("adding same key twice updates the value", () => {
    const cache = new Cache(5000);

    cache.add("key", "original");
    expect(cache.get("key")).toBe("original");

    cache.add("key", "updated");
    expect(cache.get("key")).toBe("updated");

    cache.stopReapLoop();
  });
});
