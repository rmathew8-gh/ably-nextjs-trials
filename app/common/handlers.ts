import { graphql, HttpResponse } from "msw";

// Add delay utility at the top
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockHandlers = [
  graphql.query("GetMessages", async ({ variables }) => {
    await delay(600); // Add small delay

    const allMessages = [
      { id: 1, text: "Hey everyone! Who's up for a coding challenge? 🚀" },
      {
        id: 2,
        text: "Just deployed my first ML model! It can recognize cats. 😅",
      },
      { id: 3, text: "Anyone here using the new React Server Components?" },
      { id: 4, text: "Coffee count today: ☕☕☕☕ (and counting)" },
      { id: 5, text: "Debug log: spent 2 hours fixing a missing semicolon 🤦‍♂️" },
      { id: 6, text: "Just discovered TypeScript decorators - mind blown! 🤯" },
      { id: 7, text: "Who else is excited about the new ECMAScript features?" },
      { id: 8, text: "Pro tip: Remember to git pull before starting work 😉" },
      { id: 9, text: "My code works and I have no idea why" },
      { id: 10, text: "My code doesn't work and I have no idea why" },
      {
        id: 11,
        text: "Just wrote my first Rust program. Memory safety is no joke!",
      },
      { id: 12, text: "404: Sleep not found" },
      { id: 13, text: "Anyone want to review my PR? It's only 2,000 lines..." },
      { id: 14, text: "TIL: The importance of proper error handling 🎯" },
      { id: 15, text: "Tabs vs Spaces: The eternal debate continues" },
      { id: 16, text: "Just automated my coffee maker with Python 🐍☕" },
      { id: 17, text: "Breaking: AI assistant refuses to write fizzbuzz" },
      { id: 18, text: "Docker container escaped into production 🐋" },
      {
        id: 19,
        text: "Finally fixed that race condition! Only took 3 weeks...",
      },
      { id: 20, text: "Remember to hydrate while coding! 💧" },
    ];

    // Shuffle and take first 4 messages, adding chatId prefix
    const randomMessages = [...allMessages]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
      .map((msg) => ({
        id: msg.id,
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
          username: variables.username || "Anonymous",
        },
      },
    });
  }),
];
