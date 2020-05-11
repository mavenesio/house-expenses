import { shallow, mount } from "enzyme";
import React from "react";
import {describe, expect, it} from '@jest/globals'
import { ThemeProvider } from 'styled-components'
import dark from '../../Theme/dark';

import FooterNavbar from "./FooterNavbar";

it('should render correctly with no props', () => {
  const component = shallow(
  <ThemeProvider theme={dark}>
    <FooterNavbar />
  </ThemeProvider>);
  expect(component).toMatchSnapshot();
});