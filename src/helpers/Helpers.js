export const joinItems = (list) => {
  if (list.length === 2) {
    return list.join(" & ");
  } else {
    return list.join(", ");
  }
};

export const fetchMovies = async (
  sortBy = "release_date",
  genre = "All",
  query = ""
) => {
  const params = new URLSearchParams();

  if (sortBy) {
    params.append("sortBy", sortBy);
    params.append("sortOrder", "asc");
  }
  if (genre && genre !== "All") {
    params.append("filter", genre);
  }
  if (query) {
    params.append("search", query);
    params.append("searchBy", "title");
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
  try {
    const res = await fetch(reqUrl);
    const json = await res.json();
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

export const isValidURL = (data) => {
  try {
    new URL(data);
    return true;
  } catch (_) {
    return "Please enter a valid url";
  }
};

export const postMovieData = async (data) => {
  const reqUrl = `http://localhost:4000/movies`;
  try {
    const response = await fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result;
    } else {
      console.error("Response Error:", response);
      return { error: response.status };
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    return { error: error.message };
  }
};

export const editMovieData = async (data) => {
  const reqUrl = `http://localhost:4000/movies`;
  try {
    const response = await fetch(reqUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result;
    } else {
      console.error("Response Error:", response);
      return { error: response.status };
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    return { error: error.message };
  }
};

export const deleteMovieData = async (id) => {
  const reqUrl = `http://localhost:4000/movies/${id}`;
  try {
    const response = await fetch(reqUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return "Deleted!";
    } else {
      console.error("Response Error:", response);
      return { error: response.status };
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    return { error: error.message };
  }
};