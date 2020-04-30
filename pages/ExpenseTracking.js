// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

import Header from '../Components/Header/Header';
import Card from '../Components/Card/Card';
import Construction from '../Components/Icons/construction';

const ConstructionIcon = styled(Construction)`
  margin-left:1rem;
  font-size:5rem;
  color:orange;
`;


const ExpenseTrackingContainer = styled.div`
  padding:5rem;
`;

const ExpenseTracking = () => {

  return (
    <>
      <ExpenseTrackingContainer>
        <Card>
          <h1>
            Working Progress
            <ConstructionIcon />
          </h1>
          <h2>
            On this page you can will see tracking of one particular expense month by month
          </h2>
        </Card>
      </ExpenseTrackingContainer>
    </>
  )

}

export default ExpenseTracking
