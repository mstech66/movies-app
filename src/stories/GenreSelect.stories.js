import GenreSelect from "../components/GenreSelect/GenreSelect";
import { fn } from '@storybook/test';

export default {
    title: 'GenreSelect',
    component: GenreSelect,
    tags: ['autodocs']
};

const Template = args => <GenreSelect {...args} />;

export const Default = Template.bind({});

Default.args = {
    genreList: ['Comedy', 'Horror', 'Documentary', 'Action'],
    selectedGenre: 'Action',
    onSelect: fn()
}
