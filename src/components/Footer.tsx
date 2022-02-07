import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.footer`
  background-color: #8080801c;
  height: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 22px;
  /* position: relative; */
  position: absolute;
  transform: translateY(-100%);
  /* top: 550px; */
`;

const IconBox = styled.div`
  flex-direction: row;
  float: left;
`;

const Img = styled.img`
  height: 20px;
  /* display: flex;
  justify-content: center;
  align-content: center; */
  margin-right: 10px;
`;

function Footer() {
  const location = useLocation();
  console.log(location);

  return (
    <>
      {location.pathname === "/" ? null : (
        <Container>
          <IconBox>
            <a href="https://nomadcoders.co/" target="_blank">
              <Img
                src="https://nomadcoders.co/m.svg"
                alt=""
                aria-labelledby="노마드코더"
                aria-required="true"
              />
            </a>
            <a href="https://github.com/emsthf" target="_blank">
              <i className="fab fa-github" style={{ margin: "0px 10px 10px 0px" }}></i>
            </a>
          </IconBox>
          © 2022 Sol Park - All right reserved
        </Container>
      )}
    </>
  );
}

export default Footer;
