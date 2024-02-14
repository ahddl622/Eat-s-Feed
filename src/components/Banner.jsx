import "../style/BannerStyle.css"
import styled from "styled-components";

function Banner() {
  return (
    <div className="my-container">
      <div>
        <Title className="title">Eat;s peed</Title>
      </div>
      <div>
        <h3 className="sub">새로운 소식을 빠르게</h3>
        <h6 className="sub">여러분의 이야기를 들려주세요!</h6>
      </div>
    </div>
  )
}

export default Banner;

const Title = styled.h1`
  color: black;
`

