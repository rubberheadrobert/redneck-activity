import { useState, useEffect } from "react";
import { styled } from "styled-components";
import NextPrevButtons from "../UI/NextPrevButtons/NextPrevButtons";
import img from "../../images/purple-paper-2.jpg";

const Container = styled.div`
  background-image: url(${img});
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 0rem 0;
  text-align: center;
  align-items: center;
  background-color: rgb(137, 54, 214);

  & h1 {
    font-size: 2.2rem;
    font-weight: 300;
    background-color: rgb(100, 54, 214, 0.8);
    display: inline;
    padding: 1rem 2rem;
    margin: 2rem auto 0rem;
    border-radius: 1rem;
    color: yellow;
    text-shadow: darkslategray 1px 2px;
  }

  & input,
  & label {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

const Form = styled.form`
  margin: 2rem 1rem;
  padding: 1rem 0.5rem 2rem 0.5rem;
  display: flex;
  flex-direction: column;
  background-color: rgb(100, 54, 214, 0.8);
  border-radius: 1rem;

  & label {
    color: yellow;
    text-shadow: darkslategray 1px 2px;
  }

  & button {
    transition: font-size 0.5s;
    flex-grow: 0;
    flex-shrink: 0;
    width: 10rem;
    height: 5rem;
    padding: 10px 20px;
    font-size: 16px;
    background-color: rgb(218, 186, 0);
    color: black;
    font-size: 2rem;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    align-self: center;
  }

  &:button:active {
    font-size: 2rem;
  }
`;

const Input = styled.input`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  width: 70%;
  align-self: center;
  border-color: ${({ $valid }) => ($valid ? "red" : "yellow")};
  border-radius: 1rem;
  transition: padding 0.5s;
  &:focus {
    padding: 1rem 0rem;
  }
`;

const ShakingText = styled.label`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    10% {
      transform: translateX(-5px);
    }
    20% {
      transform: translateX(5px);
    }
    30% {
      transform: translateX(-5px);
    }
    40% {
      transform: translateX(5px);
    }
    50% {
      transform: translateX(-5px);
    }
    60% {
      transform: translateX(5px);
    }
    70% {
      transform: translateX(-5px);
    }
    80% {
      transform: translateX(5px);
    }
    90% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(0);
    }
  }
  animation: shake 0.8s;
`;
export default function FindGame({ handleCreateGameSettings }) {
  const [gameId, setGameId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const idValid = submitted && gameId.trim().length >= 6;

  function handleForm(e) {
    e.preventDefault();
    console.log("in handle form");
    setSubmitted(true);
    if (idValid) {
      console.log(submitted);
      console.log("valid");
    } else {
      console.log("invalid");
    }
  }

  return (
    <Container>
      <h1>Find Game</h1>
      <Form onSubmit={handleForm}>
        {!idValid ? (
          <ShakingText htmlFor="gameId">Game ID </ShakingText>
        ) : (
          <label htmlFor="gameId">Game ID</label>
        )}
        <Input
          $valid={idValid}
          type="text"
          id="gameId"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        />
        <button>Connect</button>
      </Form>
      <NextPrevButtons
        prev="home"
        next="no-next"
        buttonOnClick={handleCreateGameSettings}
      />
    </Container>
  );
}
