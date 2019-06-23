function isValidURL(string='') {
  return string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
  );
}

export function getPosterUrl(poster) {
  if (isValidURL(poster)) return poster;
  return 'https://via.placeholder.com/400x300?text=No+Poster+Available';
}

const {
  REACT_APP_OMDB_API_URL: BASE_URL,
  REACT_APP_OMDB_API_KEY: API_KEY
} = process.env;

export const OMDB_URL = `${BASE_URL}?apikey=${API_KEY}&`;
export const LOCAL_STORAGE_TOKEN_KEY = 'movieAppToken';

export const populateHeaderWithAuthToken = (headers={}) => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }
  return headers;
}

export const convertToOMDBFormat = savedMovie => ({
  Title: savedMovie['title'],
  Poster: savedMovie['poster'] || '',
  Year: savedMovie['year'],
  imdbID: savedMovie['movie']
})


export const convertToNativeFormat = movie => ({
  title: movie['Title'],
  poster: movie['Poster'] || '',
  year: movie['Year'],
  movie: movie['imdbID']
})
