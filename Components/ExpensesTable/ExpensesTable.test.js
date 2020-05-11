import { shallow, mount } from "enzyme";
import React from "react";
import {describe, expect, it} from '@jest/globals'
import { ThemeProvider } from 'styled-components'
import dark from '../../Theme/dark';

import ExpensesTable from "./ExpensesTable";

it('should render correctly with no props', () => {
  const component = shallow(
  <ThemeProvider theme={dark}>
    <ExpensesTable 
        dataTable={null}
        onCheck={null}
        onEdit={null}
        onDelete={null}
        onCreate={null} />
  </ThemeProvider>);
  expect(component).toMatchSnapshot();
});

it('should render with props', () => {
    const data = [{"id":"1","name":"test","amount":23,"currentMonth":4,"currentYear":2020,"paid":false},
                  {"id":"2","name":"test","amount":23,"currentMonth":5,"currentYear":2020,"paid":false}];
    const component = shallow(
        <ThemeProvider theme={dark}>
            <ExpensesTable 
                dataTable={data}
                onCheck={console.log}
                onEdit={console.log}
                onDelete={console.log}
                onCreate={console.log} />
        </ThemeProvider>);
    expect(component).toMatchSnapshot();
});

