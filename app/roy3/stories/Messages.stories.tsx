import Messages, { MessagesProps } from "../Messages";
import { withProviders } from "../test-utils";
import { mockHandlers } from "../handlers";

export default {
  title: "Roy/Messages",
  component: Messages,
  decorators: [withProviders],
};

const Template = (args: MessagesProps) => <Messages {...args} />;

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
