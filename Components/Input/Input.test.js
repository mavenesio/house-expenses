import { shallow, mount } from "enzyme";
import React from "react";
import {describe, expect, it} from '@jest/globals'
import { ThemeProvider } from 'styled-components'
import dark from '../../Theme/dark';

import Input, {StyledInput} from "./Input";

it('should render correctly with no props', () => {
  const component = shallow(
  <ThemeProvider theme={dark}>
    <Input />
  </ThemeProvider>);
  expect(component).toMatchSnapshot();
});
