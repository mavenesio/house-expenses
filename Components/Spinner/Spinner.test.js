import { shallow } from "enzyme";
import React from "react";
import {describe, expect, it} from '@jest/globals'
import { ThemeProvider } from 'styled-components'
import dark from '../../Theme/dark';

import Spinner from "./Spinner";

it('should render correctly with no props', () => {
  const component = shallow(
  <ThemeProvider theme={dark}>
    <Spinner />
  </ThemeProvider>);
  expect(component).toMatchSnapshot();
});


it('should render with props', () => {
    const component = shallow(
        <ThemeProvider theme={dark}>
            <Spinner loading={true} />
        </ThemeProvider>);
    expect(component).toMatchSnapshot();
});