import styled from 'styled-components';

type ContainerProps = {
  children: React.ReactNode;
  backgroundImage?: string;
  secondColor?: string;
};

const ContainerComp = styled.div<{
  $backgroundImage?: string;
  $secondColor?: string;
}>`
  background-image: ${({ $backgroundImage }) =>
    $backgroundImage ? `url(${$backgroundImage})` : 'none'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 0;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  min-height: 100vh;
  padding: 0 1rem;
  text-align: center;
  align-items: center;


  & h1 {
    background-color: ${({ $secondColor }) => $secondColor || 'transparent'};
    color: whitesmoke;
    border-radius: 1rem;
    padding: 0.2rem 1rem;
  }
`;

export default function Container({
  children,
  backgroundImage,
  secondColor,
}: ContainerProps) {
  return (
    <ContainerComp
      $backgroundImage={backgroundImage}
      $secondColor={secondColor}
    >
      {children}
    </ContainerComp>
  );
}
