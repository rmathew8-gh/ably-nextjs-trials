import { Meta, StoryObj } from "@storybook/react";
import { MessagesProvider } from "~/scalis-components/team/messages/hooks";
import { PreviewMessageCardProps } from ".";
import { PreviewMessageCard2 } from "./preview-message-card-2";
import { ChannelProvider } from "ably/react";

const meta: Meta<typeof PreviewMessageCard2> = {
  title:
    "Scalis-Components/Team/Messages/SideMenu/PreviewMessages/PreviewMessageCard2",
  component: PreviewMessageCard2,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof PreviewMessageCard2>;

const render = (props: PreviewMessageCardProps) => {
  return (
    <MessagesProvider>
      <ChannelProvider channelName="fake-channel">
        <PreviewMessageCard2 {...props} />
      </ChannelProvider>
    </MessagesProvider>
  );
};

export const Default: Story = {
  args: {
    user: {
      id: "1",
      name: "Tester with big name",
      imgSrc:
        "https://media.licdn.com/dms/image/D4E0BAQGDXnnUgcsoWQ/company-logo_200_200/0/1708709601770/scalis_ai_logo?e=2147483647&v=beta&t=-bTBHPcfnmt9dKY8gTgeG_a9Jwpn4SGYYzr41bove48",
      channel: "fake-channel",
    },
  },
  render,
};

export const WithUnreadMessages: Story = {
  args: {
    user: {
      id: "1",
      name: "Tester with big name",
      imgSrc:
        "https://media.licdn.com/dms/image/D4E0BAQGDXnnUgcsoWQ/company-logo_200_200/0/1708709601770/scalis_ai_logo?e=2147483647&v=beta&t=-bTBHPcfnmt9dKY8gTgeG_a9Jwpn4SGYYzr41bove48",
      channel: "fake-channel",
    },
  },
  render,
};

export const WithTooManyUnreadMessages: Story = {
  args: {
    user: {
      id: "1",
      name: "Tester with big name",
      imgSrc:
        "https://media.licdn.com/dms/image/D4E0BAQGDXnnUgcsoWQ/company-logo_200_200/0/1708709601770/scalis_ai_logo?e=2147483647&v=beta&t=-bTBHPcfnmt9dKY8gTgeG_a9Jwpn4SGYYzr41bove48",
      channel: "fake-channel",
    },
  },
  render,
};
