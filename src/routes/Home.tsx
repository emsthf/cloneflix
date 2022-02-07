import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import {
  getNowMovies,
  getPopularMovies,
  getTopRateMovies,
  getUpcomingMovies,
  IGetVideoResult,
  IVideo,
} from "../api";
import SliderCon from "../components/SliderCon";
import { makeImagePath } from "../utils";
import Loading from "../components/Loading";

const Wrapper = styled.div`
  background-color: black;
  height: auto;
  min-height: 100%;
  padding-bottom: 150px;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const BannerContainer = styled.div`
  flex-direction: column;
  /* top: 300px; */
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  /* position: relative; */
  z-index: 0;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  /* padding-left: 20px; */
  margin-bottom: 60px;
  margin-top: 25px;
`;

const Playbox = styled.div`
  cursor: pointer;
  width: 150px;
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  background-color: ${(props) => props.theme.white.lighter};
  transition: all 300ms ease;
  &:hover {
    background-color: #ff9f43;
  }
  i {
    margin-right: 10px;
  }
`;

const Morebox = styled.div`
  cursor: pointer;
  width: 150px;
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  background-color: ${(props) => props.theme.white.lighter};
  transition: all 300ms ease;
  &:hover {
    i {
      color: #ff9f43;
    }
  }
  i {
    margin-right: 10px;
  }
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

function Home() {
  const nowPlayingMovieData: IVideo[] = [];
  const topRatedMovieData: IVideo[] = [];
  const upcommingMovieData: IVideo[] = [];
  const PopularMovieData: IVideo[] = [];
  // const navigate = useNavigate();
  // const bigMovieMatch = useMatch("/movies/:movieId");
  // const { scrollY } = useViewportScroll();
  // useQuery의 배열 첫번째는 카테고리, 두번째는 고유 키. 두번째 항목은 사용할 fetcher
  const nowPlayingMovies = useQuery<IGetVideoResult>(
    ["movies", "nowPlaying"],
    getNowMovies
  );
  const topRatedMovies = useQuery<IGetVideoResult>(
    ["movies", "topRated"],
    getTopRateMovies
  );
  const upcomingMovies = useQuery<IGetVideoResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );
  const popularMovies = useQuery<IGetVideoResult>(
    ["movies", "popular"],
    getPopularMovies
  );
  nowPlayingMovies?.data?.results.map((item) => nowPlayingMovieData.push(item));
  topRatedMovies?.data?.results.map((item) => topRatedMovieData.push(item));
  upcomingMovies?.data?.results.map((item) => upcommingMovieData.push(item));
  popularMovies?.data?.results.map((item) => PopularMovieData.push(item));

  const location = useLocation();

  // 배너 디테일 모달용 추가 옵션들
  const navigate = useNavigate();
  const onBoxClicked = (id: number) => {
    navigate(`/movies/${id}`);
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Solfilx | Movie</title>
      </Helmet>
      {nowPlayingMovieData.length < 20 ? (
        // <Loader>Loading...</Loader>
        <Loading />
      ) : (
        <>
          {/* backdrop_path의 타입은 string | undefined이므로
          string만 받고, 리턴하는 makeImagePath()에는 맞지 않는 타입이다.
          그래서 backdrop_path가 undefined라고 해도 makeImagePath에서 읽고 리턴할 수 있도록 or ""을 추가해준다 */}
          <Banner
            bgPhoto={makeImagePath(nowPlayingMovies.data?.results[0].backdrop_path || "")}
          >
            <BannerContainer>
              <Title>{nowPlayingMovies.data?.results[0].title}</Title>
              <Overview>{nowPlayingMovies.data?.results[0].overview}</Overview>
              <UserBox>
                <a
                  href={`https://www.youtube.com/results?search_query=${nowPlayingMovies.data?.results[0].title}`}
                  target="_blank"
                >
                  <Playbox>
                    <i className="fas fa-play"></i>
                    <span> Play</span>
                  </Playbox>
                </a>
                <Morebox
                  onClick={() =>
                    onBoxClicked(nowPlayingMovies.data?.results[0].id as number)
                  }
                  style={{
                    backgroundColor: "rgba(85, 86, 86, 0.3)",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  <i className="fas fa-info-circle"></i>
                  <span> More Info</span>
                </Morebox>
              </UserBox>
            </BannerContainer>
          </Banner>

          {nowPlayingMovieData && (
            <SliderCon
              sliderKey="m1"
              whatType="movie"
              videoData={nowPlayingMovieData}
              sliderTitle={"Now Playing"}
              search={location.search ? location.search : ""}
            />
          )}
          {upcommingMovieData && (
            <SliderCon
              sliderKey="m2"
              whatType="movie"
              videoData={upcommingMovieData}
              sliderTitle={"Upcoming Movies"}
              search={location.search ? location.search : ""}
            />
          )}
          {PopularMovieData && (
            <SliderCon
              sliderKey="m3"
              whatType="movie"
              videoData={PopularMovieData}
              sliderTitle={"Popular Movies"}
              search={location.search ? location.search : ""}
            />
          )}
          {topRatedMovieData && (
            <SliderCon
              sliderKey="m4"
              whatType="movie"
              videoData={topRatedMovieData}
              sliderTitle={"Top Rated Movies"}
              search={location.search ? location.search : ""}
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Home;
