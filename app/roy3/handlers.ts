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
          { text: "First chat" },
          { text: "Second chat" },
          { text: "Third chat" },
        ],
      },
    });
  }),
];
