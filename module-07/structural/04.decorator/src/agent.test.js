import { Server } from "http";

import { describe, expect, test, jest, beforeEach } from "@jest/globals";

import { InjectHttpInterceptor } from "./agent.js";

const originalHttp = jest.createMockFromModule("http");

describe("HTTP Interceptor Agent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should not change header", () => {
    const eventName = "request";
    const request = null;

    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };

    const serverInstance = new originalHttp.Server();

    serverInstance.emit(eventName, request, response);
    expect(response.setHeader).not.toHaveBeenCalled();
  });

  test("should active header interceptor", () => {
    InjectHttpInterceptor();

    const eventName = "request";
    const request = null;

    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };

    const serverInstance = new Server();

    serverInstance.emit(eventName, request, response);
    expect(response.setHeader).toHaveBeenCalledWith(
      "X-Instrumented-By",
      "Leandro Dias"
    );
  });
});
