const API_KEY = "8aae65da6b0d8d376bc48f4e94bf7973";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IVideo {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

// 타입스크립트를 사용하기 위해서 API 응답의 타입을 지정해줘야 한다. 그래야 자동완성을 사용할 수 있음
export interface IGetVideoResult {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IVideo[];
  total_pages: number;
  total_results: number;
}

// Movie fetching
export function getNowMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getTopRateMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getPopularMovies() {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

// TV Show fetching
export function getAiringTodayTv() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getOnTheAirTv() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getPopularTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

// Search fetching
export function getSearchVideo(format: string, id: string) {
  return fetch(`${BASE_PATH}/search/${format}?api_key=${API_KEY}&query=${id}`).then(
    (response) => response.json()
  );
}
