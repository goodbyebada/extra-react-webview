import "@testing-library/react";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "@testing-library/jest-dom";
import "vitest-canvas-mock";

afterEach(() => {
  cleanup();
});
