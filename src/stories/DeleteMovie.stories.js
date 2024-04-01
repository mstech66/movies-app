import { fn } from "@storybook/test";
import DeleteMovie from "../components/DeleteMovie/DeleteMovie";

export default {
  title: "DeleteMovie",
  component: DeleteMovie,
  tags: ["autodocs"],
};

const Template = (args) => <DeleteMovie {...args} />;

export const Default = Template.bind({});

Default.args = {
  id: 'pulp_fiction',
  onDelete: fn(),
};
