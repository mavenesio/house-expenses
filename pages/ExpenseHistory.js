// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

import Header from '../Components/Header/Header';

const ExpenseHistory = () => {

  return (
    <>
      <Header title={`EXPENSE HISTORY`} logOutVisible={true}/>
    </>
  )

}

export default ExpenseHistory
