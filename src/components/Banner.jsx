import styled from "styled-components";

const Grid = styled.div`
  display : grid;
  grid-template-columns:1fr max-content;
`;

function Banner() {
  return (
    <Grid>
      <div>
        <h3>새로운 소식을 빠르게</h3>
        <h6>여러분의 이야기를 들려주세요!</h6>
      </div>
      <div>
        <h1>Eat's peed</h1>
      </div>
    </Grid>
  )
}

export default Banner