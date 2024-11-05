import type { Meta, StoryObj } from "@storybook/react";
import { Messages } from "./Messages";
import { graphql, HttpResponse } from "msw";
import { mockMessages } from "./mockData";

const meta: Meta<typeof Messages> = {
  title: "RoyComponents/Messages",
  component: Messages,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Messages>;

const createMessageHandler = (type: keyof typeof mockMessages) => {
  return graphql.query("GetMessages", ({ variables }) => {
    const messageType = variables.type || type;
    return HttpResponse.json({
      data: {
        messages: mockMessages[messageType as keyof typeof mockMessages],
      },
    });
  });
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [createMessageHandler("empty")],
    },
  },
};

export const WithMessages: Story = {
  parameters: {
    msw: {
      handlers: [createMessageHandler("default")],
    },
  },
};

export const SingleMessage: Story = {
  parameters: {
    msw: {
      handlers: [createMessageHandler("single")],
    },
  },
};

export const LongMessages: Story = {
  parameters: {
    msw: {
      handlers: [createMessageHandler("long")],
    },
  },
};
