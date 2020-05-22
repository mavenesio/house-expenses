import React, {useCallback} from 'react';
import styled from 'styled-components';

const Card = styled.div`
    background: #fff;
    padding: 20px;
    position: relative;
    min-width:300px;
    background-color:${props => props.theme.color.backgroundColor};
    color:${props => props.theme.color.white};
    border: 1px solid ${props => props.theme.color.gray};
    border-radius:8px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
    padding: 2rem;

`;

export default Card;
