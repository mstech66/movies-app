import SearchForm from '../components/SearchForm/SearchForm';
import { fn } from '@storybook/test';

export default {
    title: 'SearchForm',
    component: SearchForm,
    tags: ['autodocs']
};

const Template = args => <SearchForm {...args} />;

export const Default = Template.bind({});

Default.args = {
    initValue: 'Avengers',
    onSearch: fn()
}
