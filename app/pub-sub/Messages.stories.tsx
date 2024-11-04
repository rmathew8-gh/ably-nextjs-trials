import type { Meta, StoryObj } from "@storybook/react";
import { Messages } from "./Messages";
import { http, HttpResponse } from "msw";
import { mockMessages } from "./mockMessageData";

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

const baseUrl = "api/messages";

const createMessageHandler = (type: keyof typeof mockMessages) => {
  return http.get(baseUrl, ({ request }) => {
    const url = new URL(request.url);
    const messageType = url.searchParams.get("type") || type;
    return HttpResponse.json(mockMessages[messageType as keyof typeof mockMessages]);
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
