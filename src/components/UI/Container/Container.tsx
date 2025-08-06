import { styled } from "styled-components";
import { ReactNode } from 'react';
import {ContainerCompProps, ContainerProps} from "../../../types/index"



const ContainerComp = styled.div<ContainerCompProps>`
  align-items: center;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 100vh;
  margin: 0 0;
  padding: 0 1rem;
  text-align: center;
  justify-content: space-around;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: background-image: ${(props) =>
    props.backgroundImage ? `url(${props.backgroundImage})` : 'none'};


  > div {
    width: 80%;
    padding: 0.2rem 0.5rem;
  }

  & h1 {
    display: inline-block;
    margin: 0.5rem auto;
    padding: 0.2rem 1rem;
    border-radius: 1rem;
    background-color: ${(props) =>
      props.secondColor && `${props.secondColor} `};
    color: whitesmoke;
  }
  @media (max-width: 576px) {
    padding: 0 1rem;
  }
  @media (min-width: 576px) {
    > div {
      width: 60%;
    }
  }
  @media (min-width: 768px) {
    > h1 {
      font-size: 3rem;
    }

    > div {
      width: 50%;
      padding: 1rem 2rem;
    }
  }
  @media (min-width: 992px) {
    > div {
      width: 30rem;
    }
  }
  @media (min-width: 1200px) {
    > div {
      width: 35rem;
    }
  }
`;



export default function Container({ children, backgroundImage, secondColor } : ContainerProps) {
  return (
    <ContainerComp backgroundImage={backgroundImage} secondColor={secondColor}>
      {children}
    </ContainerComp>
  );
}
