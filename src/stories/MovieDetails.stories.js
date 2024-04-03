import MovieDetails from "../components/MovieDetails/MovieDetails";

export default {
    title: 'MovieDetails',
    component: MovieDetails,
    tags: ['autodocs']
};

const Template = args => <MovieDetails {...args} />;

export const Default = Template.bind({});

Default.args = {
    poster_path: 'https://m.media-amazon.com/images/M/MV5BNGYyNmI3M2YtNzYzZS00OTViLTkxYjAtZDIyZmE1Y2U1ZmQ2XkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg',
    title: 'Your Name',
    release_date: '2016-12-12',
    genres: ["Anime", "Romance", "Drama"],
    vote_average: 8.4,
    overview: 'Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.',
    runtime: '190',
    id: 111
}
