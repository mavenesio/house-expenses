import { shallow } from "enzyme";
import React from "react";
import {describe, expect, it} from '@jest/globals'
import { ThemeProvider } from 'styled-components'
import dark from '../../Theme/dark';

import Button from "./Button";

it('should render correctly with no props', () => {
  const component = shallow(
  <ThemeProvider theme={dark}>
    <Button />
  </ThemeProvider>);
  expect(component).toMatchSnapshot();
});
