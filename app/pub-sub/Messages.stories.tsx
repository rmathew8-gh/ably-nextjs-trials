import type { Meta, StoryObj } from "@storybook/react";
import { Messages } from "./Messages";
import { http, HttpResponse } from "msw";

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

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(baseUrl, () => {
          return HttpResponse.json([]);
        }),
      ],
    },
  },
};

export const WithMessages: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(baseUrl, () => {
          return HttpResponse.json([
            { id: "1", label: "First message", isActive: true },
            { id: "2", label: "Second message", isActive: false },
            { id: "3", label: "Third message", isActive: true },
          ]);
        }),
      ],
    },
  },
};

export const SingleMessage: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(baseUrl, () => {
          return HttpResponse.json([
            { id: "1", label: "Only message", isActive: true },
          ]);
        }),
      ],
    },
  },
};

export const LongMessages: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(baseUrl, () => {
          return HttpResponse.json([
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
          ]);
        }),
      ],
    },
  },
};
