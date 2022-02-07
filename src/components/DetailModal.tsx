import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IVideo } from "../api";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  z-index: 80;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 90;
  overflow: auto;
`;

const BigCover = styled.div`
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 400px;
`;

const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: 260px;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  margin-bottom: 60px;
  position: absolute;
  top: 345px;
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

const IconBox = styled.div`
  cursor: pointer;
  width: 40px;
  margin-left: 10px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid ${(props) => props.theme.white.darker};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.white.lighter};
  font-size: 18px;
  font-weight: 100;
  transition: all 300ms ease;
  &:hover {
    transform: rotate(-360deg) scale(1.1);
    color: #ff9f43;
    border-color: #ff9f43;
  }
  i {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const BigOverview = styled.p`
  width: 100%;
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  /* top: -90px; */
  position: relative;
  font-size: 18px;
  h1 {
    margin-top: 20px;
  }
`;

const BigBody = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(2, 1fr);
`;

const BigPoster = styled.div`
  object-fit: contain;
  border-radius: 1rem;
  height: 30rem;
  background-position: center;
  background-size: cover;
`;

const BigSection = styled.div`
  padding-left: 1.5rem;
`;

const modalVariants = {
  entry: { opacity: 0, y: -50 },
  normal: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: -50,
  },
};

interface IDetailModal {
  bigVideoMatch: { params?: { movieId?: string | null; tvId?: string | null } };
  videoData: IVideo[];
  whatType: string;
  search?: string;
  keyword?: string;
  unqKey: string;
}

function DetailModal({
  unqKey,
  search,
  videoData,
  bigVideoMatch,
  whatType,
  keyword,
}: IDetailModal) {
  // 오버레이 클릭 체크용
  const [over, setOver] = useState(false);
  const navigate = useNavigate();
  // const bigMovieMatch = useMatch("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  // const onOverlayClick = () => {
  //   navigate("/");
  // };

  const location = useLocation();
  const movieKeyword: string = new URLSearchParams(location.search).get("movies")
    ? String(new URLSearchParams(location.search).get("movies"))
    : "";

  const tvKeyword: string = new URLSearchParams(location.search).get("tv")
    ? String(new URLSearchParams(location.search).get("tv"))
    : "";
  const searchKeyword = movieKeyword ? movieKeyword : tvKeyword;
  const movieSearch = bigVideoMatch?.params?.movieId
    ? bigVideoMatch?.params.movieId
    : searchKeyword;
  const tvSearch = bigVideoMatch?.params?.tvId
    ? bigVideoMatch.params.tvId
    : searchKeyword;
  const isSearch = movieSearch ? movieSearch : tvSearch;

  // 키워드 검색시 이전 주소
  const backUrl = `${location.pathname}?keyword=${keyword}`;
  // 오버레이를 클릭했을 때 이전 화면으로 돌아가는 함수
  const onOverlayClicked = () => {
    setOver(false);
    if (!search) {
      if (whatType === "movie") {
        navigate("/movies");
      } else if (whatType === "tv") {
        navigate("/tv");
      }
    } else {
      navigate(`${backUrl}`);
    }
  };

  const clickedData = videoData.find((item) => item.id === +isSearch);
  // 슬라이드를 클릭했을 때, url의 id로 data 중에 일치하는 id가 있는지 확인
  // const clickedMovie =
  //   bigMovieMatch?.params.movieId &&
  //   videoData.find((movie) => String(movie.id) === bigMovieMatch.params.movieId);
  // console.log(clickedMovie);

  const starSelector = (score: number) => {
    if (score >= 8.5) {
      return "fas fa-star";
    } else if (8.5 > score && score >= 7) {
      return "fas fa-star-half-alt";
    } else {
      return "far fa-star";
    }
  };

  return (
    <>
      <AnimatePresence>
        {clickedData ? (
          <>
            <Overlay
              key="overlay"
              onClick={onOverlayClicked}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <BigMovie
              key="bigMovie"
              variants={modalVariants}
              initial="entry"
              animate="normal"
              exit="exit"
              layoutId={isSearch + unqKey + "1"}
              style={{ top: scrollY.get() + 100 }}
            >
              {clickedData && (
                <>
                  <BigCover
                    key="bigCover"
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedData.backdrop_path,
                        "original"
                      )})`,
                    }}
                  >
                    <BigTitle key="bigTitle">
                      {clickedData.title ? clickedData.title : clickedData.name}
                    </BigTitle>
                    <UserBox key="userBox">
                      <a
                        href={`https://www.youtube.com/results?search_query=${
                          clickedData.title ? clickedData.title : clickedData.name
                        }`}
                        target="_blank"
                      >
                        <Playbox key="playBox">
                          <i className="fas fa-play"></i>
                          <span> Play</span>
                        </Playbox>
                      </a>
                      <IconBox key="iconBox1">
                        <i className="far fa-thumbs-up"></i>
                      </IconBox>
                      <IconBox key="iconBox2">
                        <i className="fas fa-plus"></i>
                      </IconBox>
                    </UserBox>
                  </BigCover>
                  <BigOverview key="bigOverview">
                    <BigBody key="bigBody">
                      <BigPoster
                        key="bigPoster"
                        style={{
                          backgroundImage: `url(${makeImagePath(
                            clickedData.poster_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigSection key="bigSection">
                        {clickedData.overview}
                        <br />
                        <h1>
                          {clickedData.release_date ? "Release Date" : "First Air Date"}
                        </h1>
                        <p>
                          {clickedData.release_date
                            ? clickedData.release_date
                            : clickedData.first_air_date}
                        </p>
                        <h1>User Score</h1>
                        <p>
                          <i
                            className={starSelector(clickedData.vote_average)}
                            style={{ color: "#ff9f43" }}
                          />
                          &nbsp;&nbsp;{clickedData.vote_average}
                        </p>
                      </BigSection>
                    </BigBody>
                  </BigOverview>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default DetailModal;
