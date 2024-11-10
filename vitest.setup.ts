import "@testing-library/jest-dom/vitest";
import "fake-indexeddb/auto";
import { IDBFactory } from "fake-indexeddb";

beforeAll(() => {
  indexedDB = new IDBFactory();
});
