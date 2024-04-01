import MovieTile from "../components/MovieTile/MovieTile";
import { fn } from '@storybook/test';

export default {
    title: 'MovieTile',
    component: MovieTile,
    tags: ['autodocs']
};

const Template = args => <MovieTile {...args} />;

export const Default = Template.bind({});

Default.args = {
    imgUrl: 'https://m.media-amazon.com/images/M/MV5BNGYyNmI3M2YtNzYzZS00OTViLTkxYjAtZDIyZmE1Y2U1ZmQ2XkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg',
    title: 'Your Name',
    releaseDate: 2016,
    genreList: ["Anime", "Romance", "Drama"],
    id: 'your_name',
    handleClick: fn(),
    onEdit: fn(),
    onDelete: fn()
}
