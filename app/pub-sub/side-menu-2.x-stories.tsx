import { ApolloProvider } from "@apollo/client";
import { Meta, StoryObj } from "@storybook/react";
import { SideMenu2 } from "./side-menu-2";
import { MessagesProvider } from "~/scalis-components/team/messages/hooks";
import { mockHandlers } from "../mockHandlers";
import apolloClient from "~/bff/apolloClient";

const providersDecorator2 = (Story: React.FC) => {
  return (
    <ApolloProvider client={apolloClient}>
      <MessagesProvider>
        <Story />
      </MessagesProvider>
    </ApolloProvider>
  );
};

const meta: Meta<typeof SideMenu2> = {
  title: "Scalis-Components/Team/Messages/SideMenu2",
  component: SideMenu2,
  parameters: {
    layout: "centered",
  },
  render: (props) => <SideMenu2 {...props} />,
  decorators: [providersDecorator2],
};

export default meta;
type Story = StoryObj<typeof SideMenu2>;

export const Default: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: mockHandlers,
    },
  },
};
