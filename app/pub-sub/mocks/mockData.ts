export const mockMessages = {
  empty: [],
  single: [{ id: "1", label: "Only message", isActive: true }],
  default: [
    { id: "1", label: "First message", isActive: true },
    { id: "2", label: "Second message", isActive: false },
    { id: "3", label: "Third message", isActive: true },
  ],
  long: [
    {
      id: "1",
      label:
        "This is a very long message that might need special handling in the UI to ensure it displays correctly and doesn't break the layout",
      isActive: true,
    },
    {
      id: "2",
      label:
        "Another long message with some technical content: ERROR_CODE_5123: Connection timeout after 30000ms",
      isActive: false,
    },
  ],
};

export const mockChats0 = {
  empty: [],
  single: [{ id: "1", label: "Only message", isActive: true }],
  default: [
    { id: "1", label: "First message", isActive: true },
    { id: "2", label: "Second message", isActive: false },
    { id: "3", label: "Third message", isActive: true },
  ],
  long: [
    {
      id: "1",
      label:
        "This is a very long message that might need special handling in the UI to ensure it displays correctly and doesn't break the layout",
      isActive: true,
    },
    {
      id: "2",
      label:
        "Another long message with some technical content: ERROR_CODE_5123: Connection timeout after 30000ms",
      isActive: false,
    },
  ],
};

export const mockChats = {
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
};
