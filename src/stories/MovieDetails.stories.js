import MovieDetails from "../components/MovieDetails/MovieDetails";

export default {
    title: 'MovieDetails',
    component: MovieDetails,
    tags: ['autodocs']
};

const Template = args => <MovieDetails {...args} />;

export const Default = Template.bind({});

Default.args = {
    imgUrl: 'https://m.media-amazon.com/images/M/MV5BNGYyNmI3M2YtNzYzZS00OTViLTkxYjAtZDIyZmE1Y2U1ZmQ2XkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg',
    name: 'Your Name',
    releaseYear: 2016,
    genreList: ["Anime", "Romance", "Drama"],
    rating: 8.4,
    description: 'Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.',
    duration: '1 hr 47m',
    id: 'yourName'
}
