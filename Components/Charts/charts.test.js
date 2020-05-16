import { shallow } from "enzyme";
import React from "react";
import {describe, expect, it} from '@jest/globals'

import HortizontalBarChart from "./HortizontalBarChart";
import PieChart from "./PieChart";
import VerticalBarChart from "./VerticalBarChart";

it('should render correctly with no props', () => {
    const component = shallow(<HortizontalBarChart />);
    expect(component).toMatchSnapshot();
});

it('should render correctly with no props', () => {
const component = shallow(<PieChart />);
expect(component).toMatchSnapshot();
});

it('should render correctly with no props', () => {
const component = shallow(<VerticalBarChart />);
expect(component).toMatchSnapshot();
});
      