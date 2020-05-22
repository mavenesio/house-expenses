
import React from 'react';
import styled from 'styled-components';

import {SyncLoader} from "react-spinners";

const SpinnerContainer = styled.div`
    position: absolute;
    z-index:200;
    width:100%;
    height:calc(100%);
    top:0px;
    left:0px;
    background-color:rgba(245, 245, 245,0.3);
`;
const SpinnerWrapper = styled.div`
    position:relative;    
    top: 150px;
    width: 200px;
    left: calc(50% - 100px);
    @media (max-width: 768px) {
        left: 0px;
    }
`;
const Spinner = ({loading}) => (
        <>
            {
                loading &&
                <SpinnerContainer>
                    <SpinnerWrapper>
                        <SyncLoader size={50} color='#42404d' loading={loading}/>
                    </SpinnerWrapper>
                </SpinnerContainer>
            }
        </>
    )
export default Spinner;