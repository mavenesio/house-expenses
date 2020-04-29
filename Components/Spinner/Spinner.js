
import React, {useCallback} from 'react';
import styled from 'styled-components';
import theme from '../../constants/Theme';

import {ClimbingBoxLoader, ClockLoader, DotLoader, HashLoader, PacmanLoader} from "react-spinners";

const SpinnerContainer = styled.div`
    position: absolute;
    width:100%;
    height:100%;
    z-index:100;
    background-color:rgba(245, 245, 245,0.3);
`;
const SpinnerWrapper = styled.div`
    position:relative;    
    top: 100px;
    left: calc(50%);
    @media (max-width: 768px) {
        left:0px;
    }
`;
const Spinner = (props) => {
    const {loading} = props;
    const getThemeColor = useCallback(
        (colors) =>{
            const keys = Object.keys(colors)
            return colors[keys[Math.random() * keys.length]]
        },[]);

    return (
        <>
            {
                loading &&
                <SpinnerContainer>
                    <SpinnerWrapper>
                        <PacmanLoader size={90} color={getThemeColor(theme.color)} loading={loading}/>
                    </SpinnerWrapper>
                </SpinnerContainer>
            }
        </>
        
    )
}
export default Spinner;