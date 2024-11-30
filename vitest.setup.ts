import "@testing-library/jest-dom/vitest";
import "fake-indexeddb/auto";
import { IDBFactory } from "fake-indexeddb";
import "vitest-canvas-mock";

beforeAll(() => {
  indexedDB = new IDBFactory();
});
