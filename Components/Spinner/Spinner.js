
import React from 'react';
import styled from 'styled-components';

import {PacmanLoader} from "react-spinners";

const SpinnerContainer = styled.div`
    position: relative;
    z-index:200;
    width:100%;
    height:100%;
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
                        <PacmanLoader size={90} color='#607d8b' loading={loading}/>
                    </SpinnerWrapper>
                </SpinnerContainer>
            }
        </>
        
    )
}
export default Spinner;