import { styled } from "styled-components";
import React from "react";
import ToggleContainer from "../../../UI/ToggleContainer/ToggleContainer";

export default function SliderArea({ children, id}) {
  return <ToggleContainer id={id}>{children}</ToggleContainer>;
}
