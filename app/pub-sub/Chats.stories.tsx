import type { Meta, StoryObj } from "@storybook/react";
import { Chats } from "./Chats";
import { http, graphql, HttpResponse } from "msw";
import { mockChats } from "./mockData";

const meta: Meta<typeof Chats> = {
  title: "RoyComponents/Chats",
  component: Chats,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Chats>;

const tokenHandler = [
  http.post("/token", ({}) => {
    return HttpResponse.json({
      token: "mock.ably.token",
      expires: Date.now() + 3600000, // 1 hour from now
      capability: { "*": ["*"] },
    });
  }),
];

const createChatHandler = (type: keyof typeof mockChats) => {
  return graphql.query("GetChats", ({ variables }) => {
    const messageType = variables.type || type;
    return HttpResponse.json({
      data: {
        messages: mockChats[messageType as keyof typeof mockChats],
      },
    });
  });
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [createChatHandler("empty"), tokenHandler],
    },
  },
};

export const WithChats: Story = {
  parameters: {
    msw: {
      handlers: [createChatHandler("default"), tokenHandler],
    },
  },
};

export const SingleChat: Story = {
  parameters: {
    msw: {
      handlers: [createChatHandler("single"), tokenHandler],
    },
  },
};

export const LongChats: Story = {
  parameters: {
    msw: {
      handlers: [createChatHandler("long"), tokenHandler],
    },
  },
};
