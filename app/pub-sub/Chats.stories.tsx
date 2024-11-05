import type { Meta, StoryObj } from "@storybook/react";
import { Chats } from "./Chats";
import { mockHandlers } from "./mocks/handlers";

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

// const tokenHandler = [
//   http.post("/token", ({}) => {
//     return HttpResponse.json({
//       token: "mock.ably.token",
//       expires: Date.now() + 3600000, // 1 hour from now
//       capability: { "*": ["*"] },
//     });
//   }),
// ];

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [...mockHandlers],
    },
  },
};
