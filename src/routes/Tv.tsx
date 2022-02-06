import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  getAiringTodayTv,
  getOnTheAirTv,
  getPopularTv,
  getTopRatedTv,
  IGetVideoResult,
  IVideo,
} from "../api";
import SliderCon from "../components/SliderCon";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerContainer = styled.div`
  flex-direction: column;
  top: 45vh;
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  z-index: 0;
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

  return (
    <Wrapper>
      {airingTodayTvData.length < 20 ? (
        <Loader>Loading...</Loader>
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
