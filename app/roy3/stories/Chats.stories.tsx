import Chats, { ChatsProps } from "../Chats";
import { withProviders } from "../test-utils";
import { mockHandlers } from "../handlers";

export default {
  title: "Roy/Chats",
  component: Chats,
  decorators: [withProviders],
};

const Template = (args: ChatsProps) => <Chats {...args} />;

export const SuccessState = {
  render: Template,
  args: {
    name: "Default Name",
  },
  parameters: {
    msw: {
      handlers: [mockHandlers],
    },
  },
};
