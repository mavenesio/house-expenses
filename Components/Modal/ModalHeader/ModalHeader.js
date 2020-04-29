import React from 'react';
import styled from 'styled-components';
import TimesCircle from '../../Icons/TimesCircle';

const CrossButton = styled(TimesCircle)`
    align-self:center;
    font-size: 25px;
    color: ${props => props.theme.color.primaryDarkColor};
    margin: 0rem 1rem 1rem 1rem;
    cursor: pointer;
    &:hover{
        color: ${props => props.theme.color.secondaryColor};
    }
`;

const ModalHeaderContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    margin:1rem;
    height:10%;
    cursor:default;
    border-bottom: 2px solid ${props => props.theme.color.secondaryColor};
    color: ${props => props.theme.color.primaryDarkColor};
`;
const ModalHeaderText = styled.div`
    font-family:${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.subTitle};
    font-weight:800;
`;


const ModalHeader = ({title, onClose}) => (
    <ModalHeaderContainer>
        <ModalHeaderText>
            {title}
        </ModalHeaderText>
        <CrossButton onClick={onClose}/>
    </ModalHeaderContainer>
)

export default ModalHeader;