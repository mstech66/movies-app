import { fn } from "@storybook/test";
import MovieForm from "../components/MovieForm/MovieForm";

export default {
  title: "MovieForm",
  component: MovieForm,
  tags: ["autodocs"],
};

const Template = (args) => <MovieForm {...args} />;

export const Default = Template.bind({});

Default.args = {
  movie: {
    poster_path:
      "https://m.media-amazon.com/images/M/MV5BNGYyNmI3M2YtNzYzZS00OTViLTkxYjAtZDIyZmE1Y2U1ZmQ2XkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg",
    title: "Your Name",
    release_date: "2016-01-01",
    genres: ["Romance", "Drama"],
    vote_average: 8.4,
    overview:
      "Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.",
    runtime: "190",
    id: 111,
  },
  onReset: fn(),
  onSubmit: fn(),
};
