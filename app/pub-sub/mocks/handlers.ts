import { http, graphql, HttpResponse } from "msw";
import { mockChats } from "./mockData";

export const mockHandlers = [
  http.post("/token", ({}) => {
    return HttpResponse.json({
      token: "mock.ably.token",
      expires: Date.now() + 3600000, // 1 hour from now
      capability: { "*": ["*"] },
    });
  }),

  http.post("/publish", async ({}) => {
    return HttpResponse.json(
      {
        success: true,
        message: `Successfully published`,
      },
      { status: 200 },
    );
  }),

  graphql.query("GetChats", ({ variables }) => {
    return HttpResponse.json({
      data: {
        GetChats: [
          {
            channelName: "company-1",
            participants: [
              {
                chatId: 1,
                scalisUser: {
                  firstName: "Regan",
                  lastName: "Robel",
                },
              },
              {
                chatId: 15,
                scalisUser: {
                  firstName: "Timmy",
                  lastName: "Pagac",
                },
              },
              {
                chatId: 18,
                scalisUser: {
                  firstName: "Nina",
                  lastName: "Kihn",
                },
              },
              {
                chatId: 1,
                scalisUser: {
                  firstName: "Aliyah",
                  lastName: "Mante",
                },
              },
              {
                chatId: 1,
                scalisUser: {
                  firstName: "Roy",
                  lastName: "Mathew",
                },
              },
            ],
          },
        ],
      },
    });
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

// export const chatHandler = (type: keyof typeof mockChats) => {
//   return graphql.query("GetChats", ({ variables }) => {
//     const messageType = variables.type || type;
//     return HttpResponse.json({
//       data: {
//         messages: mockChats[messageType as keyof typeof mockChats],
//       },
//     });
//   });
// };
