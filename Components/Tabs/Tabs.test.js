import { shallow } from "enzyme";
import React from "react";
import {describe, expect, it} from '@jest/globals'
import { ThemeProvider } from 'styled-components'
import dark from '../../Theme/dark';

import Tabs from "./Tabs";
import Tab from "./Tab/Tab";

it('should render correctly with no props', () => {
  const component = shallow(
  <ThemeProvider theme={dark}>
    <Tabs>
        <Tab></Tab>
    </Tabs>
  </ThemeProvider>);
  expect(component).toMatchSnapshot();
});
