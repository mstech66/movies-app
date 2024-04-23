export const joinItems = (list) => {
  if (list.length === 2) {
    return list.join(" & ");
  } else {
    return list.join(", ");
  }
};

export const findObjectById = async (arr, id) => {
  const data = await arr.find((x) => x.id === id);
  return data;
};

export const sortByProperty = (arr, prop) => {
  return arr.sort((a, b) => {
    const propA = a[prop];
    const propB = b[prop];
    if (propA < propB) {
      return -1;
    }
    if (propA > propB) {
      return 1;
    }
    return 0;
  });
};

export const fetchMovies = async (sortBy = 'release_date', genre = 'All', query = '') => {
  const params = new URLSearchParams();

  if (sortBy) {
    params.append('sortBy', sortBy);
    params.append('sortOrder', 'asc');
  }
  if (genre && genre !== 'All') {
    params.append('filter', genre);
  }
  if (query) {
    params.append('search', query);
    params.append('searchBy', 'title');
  }
  const reqUrl = `http://localhost:4000/movies?${params}`;
  
  try {
    const res = await fetch(reqUrl);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.log(err);
  }
};

export const fetchMovie = async (movieId) => {
  const reqUrl = `http://localhost:4000/movies/${movieId}`;
  console.log(reqUrl)
  try {
    const res = await fetch(reqUrl);
    const json = await res.json();
    console.log('data is ', json)
    return json || {};
  } catch (err) {
    console.log(err);
  }
};

export const getRandomId = () => {
  return Math.floor(Math.random() * 2901292);
};

export const convertTimeToReadableString = (num) => {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  return `${hours}h ${minutes}min`;
};
