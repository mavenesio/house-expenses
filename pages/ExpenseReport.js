// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

import Header from '../Components/Header/Header';

const ExpenseReports = () => {

  return (
    <>
      <Header title={`EXPENSE REPORT`} logOutVisible={true}/>
    </>
  )

}

export default ExpenseReports
