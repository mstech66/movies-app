import SortControl from "../components/SortControl/SortControl";
import { fn } from '@storybook/test';

export default {
    title: 'SortControl',
    component: SortControl,
    tags: ['autodocs']
};

const Template = args => <SortControl {...args} />;

export const Default = Template.bind({});

Default.args = {
    defaultValue: 'releaseDate',
    handleChange: fn()
}
