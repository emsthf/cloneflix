import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
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
  /* top: -132px; */
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
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  /* top: -90px; */
  position: relative;
  font-size: 18px;
  h1 {
    margin-top: 20px;
  }
`;

interface IDetailProps {
  key: string;
  search: string;
  videoData: IVideo[];
  bigMovieMatch: { params?: { movieId?: string | null; tvId?: string | null } };
}

function DetailModal({ key, search, videoData, bigMovieMatch }: IDetailProps) {
  const navigate = useNavigate();
  // const bigMovieMatch = useMatch("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const onOverlayClick = () => {
    navigate("/");
  };
  // 슬라이드를 클릭했을 때, url의 id로 data 중에 일치하는 id가 있는지 확인
  // const clickedMovie =
  //   bigMovieMatch?.params.movieId &&
  //   videoData.find((movie) => String(movie.id) === bigMovieMatch.params.movieId);
  // console.log(clickedMovie);

  // const location = useLocation();
  // const movieKeyword: string = new URLSearchParams(location.search).get(
  //   "movies"
  // )
  //   ? String(new URLSearchParams(location.search).get("movies"))
  //   : "";
  // const movieSearch = bigMovieMatch?.params?.movieId
  //   ? bigMovieMatch?.params.movieId
  //   : movieKeyword;
  // const clickedData = videoData.find((item) => item.id === +movieSearch)
  //   ? videoData.find((item) => item.id === +movieSearch)
  //   : detailData.data;

  return (
    <>
      {/* <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <BigMovie
              layoutId={bigMovieMatch.params.movieId}
              style={{ top: scrollY.get() + 100 }}
            >
              {clickedMovie && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedMovie.backdrop_path,
                        "original"
                      )})`,
                    }}
                  >
                    <BigTitle>{clickedMovie.title}</BigTitle>
                    <UserBox>
                      <Playbox>
                        <i className="fas fa-play"></i>
                        <a
                          href={`https://www.youtube.com/results?search_query=${clickedMovie.title}`}
                          target="_blank"
                        >
                          <span> Play</span>
                        </a>
                      </Playbox>
                      <IconBox>
                        <i className="far fa-thumbs-up"></i>
                      </IconBox>
                      <IconBox>
                        <i className="fas fa-plus"></i>
                      </IconBox>
                    </UserBox>
                  </BigCover>
                  <BigOverview>
                    {clickedMovie.overview}
                    <br />
                    <h1>Release Date</h1>
                    <p>{clickedMovie.release_date}</p>
                    <br />
                    <h1>User Score</h1>
                    <p>{clickedMovie.vote_average}</p>
                  </BigOverview>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence> */}
    </>
  );
}

export default DetailModal;
