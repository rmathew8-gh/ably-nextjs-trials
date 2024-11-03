import { http, HttpResponse } from "msw";

export const tokenHandler = [
  http.post("/token", ({}) => {
    return HttpResponse.json({
      token: "mock.ably.token",
      expires: Date.now() + 3600000, // 1 hour from now
      capability: { "*": ["*"] },
    });
  }),
];

export const pubSubHandlers = [
  http.post("/publish", async ({}) => {
    return HttpResponse.json(
      {
        success: true,
        message: `Successfully published`,
      },
      { status: 200 },
    );
  }),
];

export const errorHandlers = [
  http.post("/publish", ({}) => {
    return HttpResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 501 },
    );
  }),
]; 