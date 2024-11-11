import { graphql, HttpResponse } from "msw";

// Add delay utility at the top
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockHandlers = [
  graphql.query("GetMessages", async ({ variables }) => {
    await delay(1000); // Add 1 second delay
    const chatId = variables.chatId || "default";

    const allMessages = [
      { text: "#1 - Hey everyone! Who's up for a coding challenge? 🚀" },
      {
        text: "#2 - Just deployed my first ML model! It can recognize cats. 😅",
      },
      { text: "#3 - Anyone here using the new React Server Components?" },
      { text: "#4 - Coffee count today: ☕☕☕☕ (and counting)" },
      { text: "#5 - Debug log: spent 2 hours fixing a missing semicolon 🤦‍♂️" },
      { text: "#6 - Just discovered TypeScript decorators - mind blown! 🤯" },
      { text: "#7 - Who else is excited about the new ECMAScript features?" },
      { text: "#8 - Pro tip: Remember to git pull before starting work 😉" },
      { text: "#9 - My code works and I have no idea why" },
      { text: "#10 - My code doesn't work and I have no idea why" },
      {
        text: "#11 - Just wrote my first Rust program. Memory safety is no joke!",
      },
      { text: "#12 - 404: Sleep not found" },
      { text: "#13 - Anyone want to review my PR? It's only 2,000 lines..." },
      { text: "#14 - TIL: The importance of proper error handling 🎯" },
      { text: "#15 - Tabs vs Spaces: The eternal debate continues" },
      { text: "#16 - Just automated my coffee maker with Python 🐍☕" },
      { text: "#17 - Breaking: AI assistant refuses to write fizzbuzz" },
      { text: "#18 - Docker container escaped into production 🐋" },
      { text: "#19 - Finally fixed that race condition! Only took 3 weeks..." },
      { text: "#20 - Remember to hydrate while coding! 💧" },
    ];

    // Shuffle and take first 4 messages, adding chatId prefix
    const randomMessages = [...allMessages]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
      .map((msg) => ({
        text: msg.text,
      }));

    return HttpResponse.json({
      data: {
        messages: randomMessages,
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
  graphql.mutation("SendMessage", ({ variables }) => {
    // Simulate a successful message save
    return HttpResponse.json({
      data: {
        sendMessage: {
          id: Math.floor(Math.random() * 1000), // Generate random message ID
          text: variables.text,
          timestamp: new Date().toISOString(),
          username: variables.username || "Anonymous"
        }
      }
    });
  }),
];
