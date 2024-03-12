import Counter from "../components/Counter/Counter";

export default {
    title: 'Counter',
    component: Counter,
    tags: ['autodocs']
};

const Template = args => <Counter {...args} />;

export const Default = Template.bind({});

Default.args = {
    value: '1'
}
