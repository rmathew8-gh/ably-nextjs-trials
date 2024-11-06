import { graphql, HttpResponse } from "msw";

export const mockHandlers = [
  graphql.query("GetMessages", () => {
    return HttpResponse.json({
      data: {
        messages: [
          { text: "First message" },
          { text: "Second message" },
          { text: "Third message" },
        ],
      },
    });
  }),
  graphql.query("GetChats", () => {
    return HttpResponse.json({
      data: {
        chats: [
          {
            id: 21,
            text: "First chat (from alice)",
            username: "Alice",
            timestamp: "2024-03-20T10:00:00Z",
          },
          {
            id: 23,
            text: "Second chat (by Bob)",
            username: "Bob",
            timestamp: "2024-03-20T10:01:00Z",
          },
          {
            id: 44,
            text: "Third chat (Charlie steps in)",
            username: "Charlie",
            timestamp: "2024-03-20T10:02:00Z",
          },
        ],
      },
    });
  }),
];
