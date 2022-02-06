import styled from "styled-components";

const Container = styled.div`
  background-color: #8080801c;
  height: 150px;
  width: 100%;
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 22px;
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
  return (
    <>
      <Container>
        <IconBox>
          <Img
            src="https://nomadcoders.co/m.svg"
            alt=""
            aria-labelledby="노마드코더"
            aria-required="true"
          />
          <a href="https://github.com/emsthf" target="_blank">
            <i className="fab fa-github" style={{ margin: "0px 10px 10px 0px" }}></i>
          </a>
        </IconBox>
        2022 Sol Park - All right reserved
      </Container>
    </>
  );
}

export default Footer;
