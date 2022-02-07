import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getAiringTodayTv,
  getOnTheAirTv,
  getPopularTv,
  getTopRatedTv,
  IGetVideoResult,
  IVideo,
} from "../api";
import Loading from "../components/Loading";
import SliderCon from "../components/SliderCon";
import { makeImagePath } from "../utils";

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
  /* top: 40vh; */
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
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

function Tv() {
  const airingTodayTvData: IVideo[] = [];
  const onTheAirTvData: IVideo[] = [];
  const PopularTvData: IVideo[] = [];
  const topRatedTvData: IVideo[] = [];

  const airingTodayTv = useQuery<IGetVideoResult>(
    ["tv", "airingToday"],
    getAiringTodayTv
  );
  const onTheAirTv = useQuery<IGetVideoResult>(["tv", "onTheAir"], getOnTheAirTv);
  const popularTv = useQuery<IGetVideoResult>(["tv", "popular"], getPopularTv);
  const topRatedTv = useQuery<IGetVideoResult>(["tv", "topRated"], getTopRatedTv);
  airingTodayTv?.data?.results.map((item) => airingTodayTvData.push(item));
  onTheAirTv?.data?.results.map((item) => onTheAirTvData.push(item));
  popularTv?.data?.results.map((item) => PopularTvData.push(item));
  topRatedTv?.data?.results.map((item) => topRatedTvData.push(item));

  const location = useLocation();

  // 베너 디테일 모달용 추가 옵션들
  const navigate = useNavigate();
  const onBoxClicked = (id: number) => {
    navigate(`/tv/${id}`);
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Solfilx | TV Show</title>
      </Helmet>
      {airingTodayTvData.length < 20 ? (
        //
        <Loading />
      ) : (
        <>
          {/* backdrop_path의 타입은 string | undefined이므로
          string만 받고, 리턴하는 makeImagePath()에는 맞지 않는 타입이다.
          그래서 backdrop_path가 undefined라고 해도 makeImagePath에서 읽고 리턴할 수 있도록 or ""을 추가해준다 */}
          <Banner
            bgPhoto={makeImagePath(airingTodayTv.data?.results[0].backdrop_path || "")}
          >
            <BannerContainer>
              <Title>{airingTodayTv.data?.results[0].name}</Title>
              <Overview>{airingTodayTv.data?.results[0].overview}</Overview>
              <UserBox>
                <a
                  href={`https://www.youtube.com/results?search_query=${airingTodayTv.data?.results[0].name}`}
                  target="_blank"
                >
                  <Playbox>
                    <i className="fas fa-play"></i>
                    <span> Play</span>
                  </Playbox>
                </a>
                <Morebox
                  onClick={() =>
                    onBoxClicked(airingTodayTv.data?.results[0].id as number)
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

          {airingTodayTvData && (
            <SliderCon
              sliderKey="t1"
              whatType="tv"
              videoData={airingTodayTvData}
              sliderTitle={"Airing Today"}
              search={location.search ? location.search : ""}
            />
          )}
          {onTheAirTvData && (
            <SliderCon
              sliderKey="t2"
              whatType="tv"
              videoData={onTheAirTvData}
              sliderTitle={"On The Air"}
              search={location.search ? location.search : ""}
            />
          )}
          {PopularTvData && (
            <SliderCon
              sliderKey="t3"
              whatType="tv"
              videoData={PopularTvData}
              sliderTitle={"Popular TV Shows"}
              search={location.search ? location.search : ""}
            />
          )}
          {topRatedTvData && (
            <SliderCon
              sliderKey="t4"
              whatType="tv"
              videoData={topRatedTvData}
              sliderTitle={"Top Rated TV Shows"}
              search={location.search ? location.search : ""}
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
