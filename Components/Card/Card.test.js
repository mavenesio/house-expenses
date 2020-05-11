import { shallow } from "enzyme";
import React from "react";
import {describe, expect, it} from '@jest/globals'

import Card from "./Card";

it('should render correctly with no props', () => {
  const component = shallow(<Card><></></Card>);
  expect(component).toMatchSnapshot();
});
