import styled from 'styled-components';
import member1 from 'assets/member1.png';
import member2 from 'assets/member2.png';
import member3 from 'assets/member3.png';
import member4 from 'assets/member4.png';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <StArticle>
      <StInfoSection>
        <h1>Eat's Feed!</h1>
        <h4>여러분들의 따뜻하고 맛있는 피드를 올려주세요!</h4>
        <p>"맛집 찾기에 진심인 네 사람이 모여 만든 맛집 공유 사이트"</p>
      </StInfoSection>
      <StMemberSection>
        <StMemberDiv>
          <img src={member1} alt="사람 일러스트" />
          <p>
            <StLink to="https://github.com/aotoyae" target="_blank">
              SOHYEON KIM
            </StLink>
          </p>
        </StMemberDiv>
        <StMemberDiv>
          <img src={member2} alt="사람 일러스트" />
          <p>
            <StLink to="https://github.com/sohye-kim" target="_blank">
              SOHYE KIM
            </StLink>
          </p>
        </StMemberDiv>
        <StMemberDiv>
          <img src={member3} alt="사람 일러스트" />
          <p>
            <StLink to="https://github.com/ahddl622" target="_blank">
              JAEMIN PARK
            </StLink>
          </p>
        </StMemberDiv>
        <StMemberDiv>
          <img src={member4} alt="사람 일러스트" />
          <p>
            <StLink to="https://github.com/2njeong" target="_blank">
              INJUNG HWANG
            </StLink>
          </p>
        </StMemberDiv>
      </StMemberSection>
    </StArticle>
  );
}

const StArticle = styled.article`
  text-align: center;
`;

const StInfoSection = styled.section`
  height: 35vh;

  & h1 {
    padding-top: 45px;

    font-size: 120px;
    color: #e0aed0;
  }
  & h4 {
    padding-top: 30px;

    font-size: 25px;
    color: #503178;
  }
  & p {
    padding-top: 15px;

    font-size: 14px;
    color: #ac87c5;
  }
`;

const StMemberSection = styled.section`
  padding-top: 35px;
  display: flex;
  justify-content: space-around;
`;

const StMemberDiv = styled.div`
  & p {
    margin-top: 40px;
  }
  & img {
    width: 20vw;
  }
  & img:hover {
    transform: rotate(5deg);
  }
`;
const StLink = styled(Link)`
  text-decoration: none;
  color: #ac87c5;
`;
