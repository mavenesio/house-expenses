// @ts-nocheck
import React, {useCallback} from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
    display: ${props => props.isVisible ? 'flex' : 'none'};
    justify-content: center;
    z-index:1;
    position:absolute;
    top:0;
    left:0;
    right:0;
    background-color:rgba(222, 222, 222,0.5);
    width:100%;
    height:100%;
`;

const Modal = (props) => {
    const {isVisible, children} = props;
    const renderModalBody = useCallback(
        (ch) => {
            return React.Children.map(ch, (child) => {
                return React.cloneElement(child);
                });
            }
        , []);
    return (
        <ModalContainer isVisible={isVisible}>
            {renderModalBody(children)}
        </ModalContainer>
    )
}

export default Modal;