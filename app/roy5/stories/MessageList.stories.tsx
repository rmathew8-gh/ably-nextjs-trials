import type { Meta, StoryObj } from "@storybook/react";
import { MessageList } from "../components/MessageList";

const meta: Meta<typeof MessageList> = {
  title: "Roy5/Component",
  component: MessageList,
  decorators: [],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MessageList>;

export const Default: Story = {
  args: {
    messages: [
      {
        id: 1,
        text: "Hello, welcome to the chat!",
        sender: "System",
        timestamp: new Date(),
      },
      {
        id: 2,
        text: "How are you today?",
        sender: "Alice",
        timestamp: new Date(),
      },
    ],
  },
};

// import type { Meta, StoryObj } from "@storybook/react";
// import { MessageList } from "../components/MessageList";

// const meta: Meta<typeof MessageList> = {
//   title: "Roy.Ably/MessageList",
//   component: MessageList,
//   parameters: {
//     layout: "padded",
//   },
// };

// export default meta;
// type Story = StoryObj<typeof MessageList>;

// const sampleMessages = [
//   {
//     id: 1,
//     text: "Hello, welcome to the chat!",
//     sender: "System",
//     timestamp: new Date(),
//   },
//   {
//     id: 2,
//     text: "How are you today?",
//     sender: "Alice",
//     timestamp: new Date(),
//   },
//   {
//     id: 3,
//     text: "I'm doing great, thanks for asking!",
//     sender: "Bob",
//     timestamp: new Date(),
//   },
// ];

// export const Default: Story = {
//   args: {
//     messages: sampleMessages,
//   },
// };

// export const Loading: Story = {
//   args: {
//     messages: [],
//     loading: true,
//   },
// };

// export const ErrorStory: Story = {
//   args: {
//     messages: [],
//     error: new Error("Failed to load messages"),
//   },
// };

// export const Empty: Story = {
//   args: {
//     messages: [],
//   },
// };
