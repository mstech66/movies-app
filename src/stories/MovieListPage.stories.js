import { MemoryRouter } from "react-router-dom";
import MovieListPage from "../components/MovieListPage/MovieListPage";
import { movieList } from "../data/MoviesList";

export default {
    title: 'MovieListPage',
    component: MovieListPage,
    tags: ['autodocs'],
    decorators : [(Story) => (<MemoryRouter><Story/></MemoryRouter>)]
};

const Template = args => <MovieListPage />;

export const Default = Template.bind({});

Default.args = {
    initialMovies: movieList
}