import type { Meta, StoryObj } from "@storybook/react";
import { Chats } from "./Chats";
import { graphql, HttpResponse } from "msw";
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
      handlers: [createChatHandler("empty")],
    },
  },
};

export const WithChats: Story = {
  parameters: {
    msw: {
      handlers: [createChatHandler("default")],
    },
  },
};

export const SingleChat: Story = {
  parameters: {
    msw: {
      handlers: [createChatHandler("single")],
    },
  },
};

export const LongChats: Story = {
  parameters: {
    msw: {
      handlers: [createChatHandler("long")],
    },
  },
};
