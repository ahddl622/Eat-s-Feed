import styled from 'styled-components';
import menu1 from 'assets/menu1.png';
import menu2 from 'assets/menu2.png';

const StArticle = styled.article`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #fff4f5;

  & img {
    width: 30%;
    opacity: 0.85;
  }
  & h1 {
    margin: 0 20px;

    letter-spacing: 5px;
    font-size: 50px;
    font-weight: 600;
    color: #fff4f5;
    text-shadow: 1px 1px 10px #e0aed0;
  }
`;

function MainBanner() {
  return (
    <StArticle>
      <img src={menu1} alt="메뉴 이미지" />
      <h1>Eat's Feed</h1>
      <img src={menu2} alt="메뉴 이미지" />
    </StArticle>
  );
}

export default MainBanner;