import { useEffect } from "react";
import { styled } from "styled-components";
import img from "../../../images/background-turquoise-new.png";
import SliderArea from "./SliderArea/SliderArea";
import NextPrevButtons from "../../UI/NextPrevButtons/NextPrevButtons";
import Container from "../../UI/Container/Container";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Title = styled.h1`
  display: inline-block;
  margin: 1rem auto;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  background-color: #00b386;
  color: whitesmoke;
`;

const SliderInformation = styled.p`
  font-size: 0.7rem;
  background-color: "00b386";
  box-shadow: 0 0 10px rgb(255, 204, 102);
  border-radius: 1rem;
  padding: 0.5rem 1rem;
`;

const CustomSlider = styled(Slider)`
  margin: 0rem 0rem 0.2rem 0rem;
  width: ${({ sliderWidth }) => sliderWidth};
  .rc-slider-rail {
    background-color: whitesmoke;
  }
  .rc-slider-track {
    background-color: whitesmoke; /* Set the color of the filled track */
  }
  .rc-slider-handle {
    background-color: black; /* Set the color of the slider handle */
    border-color: black; /* Set the color of the slider handle border */
  }
`;
const sliderMinValue = 10;
const sliderMaxValue = 60;

const wordsSliderMin = 2;
const wordsSliderMax = 10;

export default function SettingsSliders({
  secondsRound,
  handleCreateGameSettings,
  secondsRoundOnChange,
  wordsAmount,
  wordsAmountOnChange,
}) {
  useEffect(() => {
    // load roundLength from localStorage
    const savedRoundLength = localStorage.getItem("roundLength");
    if (savedRoundLength) {
      secondsRoundOnChange(parseInt(savedRoundLength));
    }
    // load wordsAmount from localStorage
    const savedWordsAmount = localStorage.getItem("wordsAmount");
    if (savedWordsAmount) {
      wordsAmountOnChange(parseInt(savedWordsAmount));
    }
  }, []);

  useEffect(() => {
    // save roundLength to localStorage
    localStorage.setItem("roundLength", secondsRound);
  }, [secondsRound]);

  useEffect(() => {
    // save wordsAmount to localStorage
    localStorage.setItem("wordsAmount", wordsAmount);
  }, [wordsAmount]);
  return (
    <Container backgroundImage={img}>
      <Title>Settings</Title>
      <SliderArea>
        <h2>Round Length</h2>
        <CustomSlider
          width="60%"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={parseInt(secondsRound)}
          onChange={secondsRoundOnChange}
        />
        <span>{secondsRound}</span>

        <SliderInformation>
          Rounds will last {secondsRound} seconds.
        </SliderInformation>
      </SliderArea>

      <SliderArea>
        <h2>Words Amount</h2>
        <CustomSlider
          width="60%"
          min={wordsSliderMin}
          max={wordsSliderMax}
          value={parseInt(wordsAmount)}
          onChange={wordsAmountOnChange}
        />
        <span>{wordsAmount}</span>
        <SliderInformation>
          Each player will submit {wordsAmount} words.
        </SliderInformation>
      </SliderArea>

      <NextPrevButtons
        prev="settings"
        next="players"
        buttonOnClick={handleCreateGameSettings}
      />
    </Container>
  );
}
