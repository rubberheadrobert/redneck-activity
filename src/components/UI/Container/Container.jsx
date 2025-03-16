import { styled } from "styled-components";

const ContainerComp = styled.div`
  align-items: center;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 700px;
  min-height: 100vh;
  min-height:
  margin: 0 0;
  padding: 0 1rem;
  text-align: center;
  justify-content: space-around;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${(props) =>
    props.backgroundImage && `url(${props.backgroundImage})`};
    
`;

export default function Container({ children, backgroundImage }) {
  return (
    <ContainerComp backgroundImage={backgroundImage}>{children}</ContainerComp>
  );
}
