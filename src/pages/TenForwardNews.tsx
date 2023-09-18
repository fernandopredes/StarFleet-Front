import styled from "styled-components";
import guinan from '../assets/guinan.jpg'

const Wrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  background: url(${guinan}) no-repeat center;
  background-size: cover;
  background-position: bottom;
  padding-top: 500px;
  width: 100%;
  position: relative;

  & > span {
    font-size: 48px;
    font-weight: 400;
    position: absolute;
    bottom: 10vh;
    left: 5vw;
    text-align: start;
  }
  @media (max-width: 768px) {
    & > span {
      bottom: 8vh;
      left: 3vw;
    }
  }
`;

const TenForwardNews = () => {
  return (
    <Wrapper>
        <Header>
          <span>Guinan's Ten Foward</span>
        </Header>
    </Wrapper>
  )
}

export default TenForwardNews
