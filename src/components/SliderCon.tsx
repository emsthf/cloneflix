import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IVideo } from "../api";
import { makeImagePath } from "../utils";
import DetailModal from "./DetailModal";

const Slider = styled.div`
  position: relative;
  top: -180px;
  margin-bottom: 70px;
  height: 250px;
`;

const ListTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
  padding-left: 65px;
  margin-bottom: 15px;
`;

const ArrowBtn = styled(motion.div)`
  color: white;
  z-index: 10;
  width: 65px;
  height: 185px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  i {
    position: relative;
    text-align: center;
    transition: all 300ms ease;
    cursor: pointer;
  }
  i:hover {
    transform: scale(1.8);
  }
  &:first-child {
    left: 0;
  }
  &:last-child {
    right: 0;
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  padding: 0px 65px 0px 65px;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  border-radius: 8px;
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  overflow: hidden;
  cursor: pointer;
  &:first-child {
    // origin으로 센터와 왼쪽은 고정하겠다는 뜻 = 오른쪽으로만 움직임
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  /* background-color: ${(props) => props.theme.black.lighter}; */
  background: linear-gradient(
    to top,
    ${(props) => props.theme.black.lighter},
    70%,
    transparent
  );
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const rowVariants = {
  hidden: (isBack: boolean) => ({
    // 사용자의 화면 크기를 읽어서 그만큼 밀어버리는 애니매이션 재생
    x: isBack ? -window.outerWidth + 6 : window.outerWidth - 6,
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth - 6 : -window.outerWidth + 6,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const offset = 6;

interface ISliderConProps {
  sliderTitle: string;
  videoData: IVideo[];
  whatType: string;
  sliderKey: string;
  search: string;
}

function SliderCon({
  sliderKey,
  sliderTitle,
  whatType,
  videoData,
  search,
}: ISliderConProps) {
  console.log("sliderKey : ", sliderKey);

  const navigate = useNavigate();
  const location = useLocation();
  // const bigMovieMatch = useMatch("/movies/:movieId");
  const bigMovieMatch = useMatch(!search ? `/movies/:movieId` : "undefined");
  const bigTvMatch = useMatch(!search ? `/tv/:tvId` : "undefined");
  console.log(bigMovieMatch, bigTvMatch);
  const locationMovie = {
    params: {
      movieId: new URLSearchParams(location.search).get("movies"),
    },
  };
  const locationTv = {
    params: {
      tvId: new URLSearchParams(location.search).get("tv"),
    },
  };

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  // 슬라이드 다음 버튼 함수
  const increaseIndex = () => {
    // data가 존재하지 않을 수도 있으므로 타입스크립트를 위해 조건을 걸어주자
    if (videoData) {
      // leaving이 참이면 바로 종료
      if (leaving) return;
      // leaving이 거짓이면 leaving을 참으로 바꾸고 인덱스 1 증가
      toggleLeaving();
      setBack(false);
      const totalMovies = videoData.length - 1; // 배너에서 사용한 1개 제외
      const maxIndex = Math.floor(totalMovies / offset) - 1; // floor는 숫자를 내림처리. 배너에서 사용한 1개 제외
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  // 슬라이드 이전 버튼 함수
  const decreaseIndex = () => {
    if (videoData) {
      if (leaving) return;
      setBack(true);
      toggleLeaving();
      const totalMovies = videoData.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  let keyword = new URLSearchParams(location.search).get("keyword");
  const onBoxClicked = (id: number) => {
    if (!search) {
      if (whatType === "movie") {
        navigate(`/movies/${id}`);
      } else if (whatType === "tv") {
        navigate(`/tv/${id}`);
      }
    } else if (search) {
      if (whatType === "movie") {
        navigate(`/search?keyword=${keyword}&movies=${id}`);
      } else if (whatType === "tv") {
        navigate(`/search?keyword=${keyword}&tv=${id}`);
      }
    }
  };
  const onOverlayClick = () => {
    navigate("/");
  };
  // 슬라이드를 클릭했을 때, url의 id로 data 중에 일치하는 id가 있는지 확인
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    videoData.find((movie) => String(movie.id) === bigMovieMatch.params.movieId);
  console.log(clickedMovie);

  const NEXFLIX_LOGO_URL =
    "https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4";

  return (
    <>
      <Slider>
        <AnimatePresence
          // 컴포넌트가 마운트 될 때 첫 애니메이션을 막음
          initial={false}
          // exit가 끝났을 때 실행하는 prop. leaving의 상태를 반대로 바꿔준다
          onExitComplete={toggleLeaving}
          custom={back}
        >
          <ListTitle key={sliderTitle + sliderKey}>{sliderTitle}</ListTitle>
          <ArrowBtn key="leftBtn" onClick={decreaseIndex}>
            <motion.i key="leftI" className="fas fa-chevron-left"></motion.i>
          </ArrowBtn>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
            custom={back}
          >
            {videoData
              // 배너에 들어간 배열의 첫 영화 제외
              .slice(1)
              // 남은 배열을 슬라이드에 들어가는 만큼 잘라서 각 인덱스에 넣음
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  key={movie.id + sliderKey}
                  layoutId={movie.id + sliderKey}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                  onClick={() => onBoxClicked(movie.id)}
                  bgPhoto={
                    movie.backdrop_path
                      ? makeImagePath(movie.backdrop_path, "w500")
                      : makeImagePath(movie.poster_path, "w500")
                      ? makeImagePath(movie.poster_path, "w500")
                      : NEXFLIX_LOGO_URL
                  }
                >
                  <Info key="boxInfo" variants={infoVariants}>
                    <h4>{movie.title || movie.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
          <ArrowBtn key="rightBtn" onClick={increaseIndex}>
            <motion.i key="rightI" className="fas fa-chevron-right"></motion.i>
          </ArrowBtn>
        </AnimatePresence>
      </Slider>

      {(locationMovie.params.movieId
        ? locationMovie.params.movieId?.length >= 1
        : false || bigMovieMatch) &&
        whatType === "movie" && (
          <DetailModal
            key={"mDetail"}
            bigVideoMatch={bigMovieMatch ? bigMovieMatch : locationMovie}
            videoData={videoData}
            search={search}
            whatType="movie"
            keyword={keyword ? keyword : undefined}
            unqKey={sliderKey}
          />
        )}
      {(locationTv.params.tvId
        ? locationTv.params.tvId?.length >= 1
        : false || bigTvMatch) &&
        whatType === "tv" && (
          <DetailModal
            key={"tDetail"}
            bigVideoMatch={bigTvMatch ? bigTvMatch : locationTv}
            videoData={videoData}
            search={search}
            whatType="tv"
            keyword={keyword ? keyword : undefined}
            unqKey={sliderKey}
          />
        )}
    </>
  );
}

export default SliderCon;
