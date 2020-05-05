
import React from 'react';
import styled from 'styled-components';

import {PacmanLoader} from "react-spinners";

const SpinnerContainer = styled.div`
    position: absolute;
    z-index:200;
    width:100%;
    height:calc(100%);
    top:0px;
    right:0px;
    background-color:rgba(245, 245, 245,0.3);
`;
const SpinnerWrapper = styled.div`
    position:relative;    
    top: 100px;
    left: calc(30%);
    @media (max-width: 768px) {
        left: 0px;
    }
`;
const Spinner = (props) => {
    const {loading} = props;

    return (
        <>
            {
                loading &&
                <SpinnerContainer>
                    <SpinnerWrapper>
                        <PacmanLoader size={90} color='#006064' loading={loading}/>
                    </SpinnerWrapper>
                </SpinnerContainer>
            }
        </>
        
    )
}
export default Spinner;