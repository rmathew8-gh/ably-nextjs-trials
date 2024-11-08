import Messages, { MessagesProps } from "../Messages";
import { withProviders } from "../../common/test-utils";
import { mockHandlers } from "../../common/handlers";

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
