// import * as React from "react";
import { HelloWrapper } from "./HelloWrapper";
import { graphql } from "msw";
import Hello from "./Hello";

export default {
  title: "Hello",
  component: Hello,
  decorators: [
    (Story: React.ComponentType) => (
      <HelloWrapper>
        <Story />
      </HelloWrapper>
    ),
  ],
};

const Template = (args: { id: number; name: string }) => <Hello {...args} />;

export const SuccessState = {
  render: Template,
  parameters: {
    msw: {
      handlers: [
        graphql.query("YourQuery", ({ query, variables }) => {
          return {
            data: {
              yourData: { name: "Mocked Data" },
            },
          };
        }),
      ],
    },
  },
};

// export const LoadingState = Template.bind({});
// LoadingState.parameters = {
//   msw: {
//     handlers: [
//       graphql.query("YourQuery", (req, res, ctx) => {
//         return res(ctx.delay("infinite"));
//       }),
//     ],
//   },
// };

// export const ErrorState = Template.bind({});
// ErrorState.parameters = {
//   msw: {
//     handlers: [
//       graphql.query("YourQuery", (req, res, ctx) => {
//         return res(ctx.errors([{ message: "Error fetching data" }]));
//       }),
//     ],
//   },
// };
