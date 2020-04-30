// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

import Card from '../Components/Card/Card';
import Header from '../Components/Header/Header';
import Construction from '../Components/Icons/construction';

const ConstructionIcon = styled(Construction)`
  margin-left:1rem;
  font-size:5rem;
  color:orange;
`;

const ExpenseTrackingContainer = styled.div`
  padding:5rem;
`;


const ExpenseReports = () => {

  return (
    <>
      <ExpenseTrackingContainer>
        <Card>
          <h1>
            Working Progress
            <ConstructionIcon />
          </h1>
          <h2>
            On this page you can will see different kind of charts
          </h2>
        </Card>
      </ExpenseTrackingContainer>
    </>
  )

}

export default ExpenseReports
