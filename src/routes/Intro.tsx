import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BackImg = styled.div`
  background-image: linear-gradient(black, rgba(0, 0, 0, 0.5)),
    url(https://assets.nflxext.com/ffe/siteui/vlv3/eb482c64-e879-4e88-9ddc-d839cb7d1232/df2916c4-fbc7-4814-8dc9-bf307b678808/KR-ko-20220131-popsignuptwoweeks-perspective_alpha_website_large.jpg);
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  /* justify-content: center;
  align-content: center; */
  position: absolute;
  /* flex-direction: column; */
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: {
    ${(props) => props.theme.white.lighter}
  }
  font-size: 62px;
  text-align: center;
  font-weight: 600;
`;

const Explanation = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 28px;
  margin-top: 20px;
`;

const Enter = styled(motion.div)`
  background-color: #dc0510;
  height: 65px;
  width: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  margin: auto;
  margin-top: 35px;
`;

function Intro() {
  return (
    <BackImg>
      <Title>
        Unlimited movies, TV
        <br />
        shows, and more.
      </Title>
      <Explanation>Watch anywhere. Search anytime.</Explanation>
      <Link to="/movies">
        <Enter layoutId="circle">
          Let's Start &nbsp;<i className="fas fa-chevron-right"></i>
        </Enter>
      </Link>
    </BackImg>
  );
}

export default Intro;
