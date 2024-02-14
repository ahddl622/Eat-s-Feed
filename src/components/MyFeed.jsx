import styled from 'styled-components';
import Show from './Show';

const StSection = styled.section`
  padding: 10px;

  border: 2px solid #fff;
  box-shadow: 3px 5px 12px 3px #ffe5e5;
  border-radius: 35px;
`;

function MyFeed() {
  return <StSection>
    <Show/>
  </StSection>;
}

export default MyFeed;
