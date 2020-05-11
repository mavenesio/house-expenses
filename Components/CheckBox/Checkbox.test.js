import { shallow, mount } from "enzyme";
import React from "react";
import {describe, expect, it} from '@jest/globals'
import { ThemeProvider } from 'styled-components'
import dark from '../../Theme/dark';

import Checkbox from "./Checkbox";

it('should render correctly with no props', () => {
  const component = shallow(
  <ThemeProvider theme={dark}>
    <Checkbox />
  </ThemeProvider>);
  expect(component).toMatchSnapshot();
});

it('should render with props', () => {
    const component = shallow(
        <ThemeProvider theme={dark}>
            <Checkbox title='test' onCheck={console.log} checked={false} />
        </ThemeProvider>);
    expect(component).toMatchSnapshot();
});