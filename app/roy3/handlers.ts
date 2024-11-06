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
];
