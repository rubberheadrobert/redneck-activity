import { useEffect } from 'react';
import React from 'react';
import { ReactElement } from 'react';
import { styled } from 'styled-components';
import img from '../../../images/background-turquoise-new.png';
import SliderArea from './SliderArea/SliderArea';
import NextPrevButtons from '../../UI/NextPrevButtons/NextPrevButtons';
import Container from '../../UI/Container/Container';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { ROUTES } from '../../../utils/routes';
import { SETTINGS_SLIDERS_CONSTS } from '../../../utils/constants';
import { SettingsSlidersProps } from '../../../types/index';
import { HandleProps } from 'rc-slider/lib/Handles/Handle';
import type { ComponentProps } from 'react';
import RcSlider from 'rc-slider';

type RcSliderProps = ComponentProps<typeof Slider>;
interface CustomSliderProps extends RcSliderProps {
  sliderWidth: string;
}

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
  background-color: '00b386';
  box-shadow: 0 0 10px rgb(255, 204, 102);
  border-radius: 1rem;
  padding: 0.5rem 1rem;
`;

const CustomSlider = styled(RcSlider)<CustomSliderProps>`
  width: ${({ sliderWidth }) => sliderWidth};
  margin: 0rem 0rem 0.2rem 0rem;
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
}: SettingsSlidersProps) {
  useEffect(() => {
    // load roundLength from localStorage
    const savedRoundLength = localStorage.getItem(
      SETTINGS_SLIDERS_CONSTS.ROUND_LENGTH
    );
    if (savedRoundLength) {
      secondsRoundOnChange(parseInt(savedRoundLength));
    }
    // load wordsAmount from localStorage
    const savedWordsAmount = localStorage.getItem(
      SETTINGS_SLIDERS_CONSTS.WORDS_AMOUNT
    );
    if (savedWordsAmount) {
      wordsAmountOnChange(parseInt(savedWordsAmount));
    }
  }, []);

  useEffect(() => {
    // save roundLength to localStorage
    localStorage.setItem(
      SETTINGS_SLIDERS_CONSTS.ROUND_LENGTH,
      secondsRound.toString()
    );
  }, [secondsRound]);

  useEffect(() => {
    // save wordsAmount to localStorage
    localStorage.setItem(
      SETTINGS_SLIDERS_CONSTS.WORDS_AMOUNT,
      wordsAmount.toString()
    );
  }, [wordsAmount]);
  return (
    <Container backgroundImage={img}>
      <Title>Settings</Title>
      <SliderArea id='round-length-area'>
        <h2>Round Length</h2>
        <CustomSlider
          sliderWidth='60%'
          min={sliderMinValue}
          max={sliderMaxValue}
          value={secondsRound as number}
          onChange={(value: any) => secondsRoundOnChange(value as number)}
          handleRender={(origin: ReactElement, props: any) =>
            React.cloneElement(origin, {
              ...origin.props,
              'aria-label': 'Round Length',
            } as any)
          }
        />
        <span>{secondsRound}</span>

        <SliderInformation>
          Rounds will last {secondsRound} seconds.
        </SliderInformation>
      </SliderArea>

      <SliderArea id='words-amount-area'>
        <h2>Words Amount</h2>
        <CustomSlider
          sliderWidth='60%'
          min={wordsSliderMin}
          max={wordsSliderMax}
          value={wordsAmount as number}
          onChange={(value: any) => wordsAmountOnChange(value as number)}
          handleRender={(origin: ReactElement, props: any) =>
            React.cloneElement(origin, {
              ...origin.props,
              'aria-label': 'Words Amount',
            } as any)
          }
        />
        <span>{wordsAmount}</span>
        <SliderInformation>
          Each player will submit {wordsAmount} words.
        </SliderInformation>
      </SliderArea>

      <NextPrevButtons
        prev={ROUTES.SETTINGS}
        next={ROUTES.PLAYERS}
        buttonOnClick={handleCreateGameSettings}
      />
    </Container>
  );
}
