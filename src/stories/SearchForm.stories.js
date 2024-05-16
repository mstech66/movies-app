import React from 'react';
import { MemoryRouter } from 'react-router';
import SearchForm from '../components/SearchForm/SearchForm';

export default {
  component: SearchForm,
  title: 'SearchForm',
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story/></MemoryRouter>]
};

const Template = (args) => <SearchForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  searchQuery: '',
  handleSearch: (query) => { console.log(`Searching for ${query}`) },
};