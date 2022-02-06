import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearchVideo, IGetVideoResult } from "../api";
import SliderCon from "../components/SliderCon";

const Wrapper = styled.div`
  padding-top: 400px;
`;

const Loader = styled.div`
  font-size: 48px;
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 400px;
`;

function Search() {
  // 지금 있는 곳에 관한 정보를 준다
  const location = useLocation();
  // URLSearchParams는 자바스크립트 기본 기능으로, 파싱하기 쉽게 =단위로 value를 분리해 준다
  const keyword = new URLSearchParams(location.search).get("keyword");
  useEffect(() => {}, [location]);
  console.log("keyword : ", keyword);
  console.log("location : ", location);

  const word =
    keyword
      ?.toString() // 문자열로 만들고
      .trim() // 앞뒤 공백 자르고
      ?.replace(/ /g, "%20") + ""; // 사이 공백 "%20"으로 치환

  const searchTvData = useQuery<IGetVideoResult>(
    ["movies", "search"],
    () => getSearchVideo("tv", word),
    { refetchInterval: 100 }
  );
  const searchMovieData = useQuery<IGetVideoResult>(
    ["movies", "search2"],
    () => getSearchVideo("movie", word),
    { refetchInterval: 200 }
  );

  return (
    <>
      <Wrapper>
        {!searchTvData.data?.results[0] && !searchMovieData.data?.results[0] ? (
          <Loader>Couldn't find anything... 😱</Loader>
        ) : (
          <>
            {searchTvData.data?.results[0] && (
              <SliderCon
                key={new URLSearchParams(location.search).get("keyword")}
                sliderKey="s1"
                whatType="tv"
                search={location.search ? location.search : ""}
                videoData={searchTvData.data?.results}
                sliderTitle={`TV Show Searcing : ${keyword}`}
              />
            )}
            {searchMovieData.data?.results[0] && (
              <SliderCon
                key={word + "456"}
                sliderKey="s2"
                search={location.search ? location.search : ""}
                videoData={searchMovieData.data?.results}
                whatType="movie"
                sliderTitle={`Movie Searching : ${keyword}`}
              />
            )}
          </>
        )}
      </Wrapper>
    </>
  );
}

export default Search;
