// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

import Header from '../Components/Header/Header';

const ExpenseTracking = () => {

  return (
    <>
      <Header title={`EXPENSE TRACKING`} logOutVisible={true}/>
    </>
  )

}

export default ExpenseTracking
