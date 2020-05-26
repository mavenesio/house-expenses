import React, {useCallback} from 'react';
import styled from 'styled-components';

const Card = styled.div`
    padding: 20px;
    position: relative;
    min-width:300px;
    color:${props => props.theme.color.white};
    border: 1px solid ${props => props.theme.color.gray};
    border-radius:8px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
    padding: 1rem;
    background-color:${props => props.theme.color.backgroundPrimaryColor};
    @media (max-width: 650px) {
        padding: 0.5px;
    }

`;

export default Card;
