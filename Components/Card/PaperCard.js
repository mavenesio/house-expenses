import React, {useCallback} from 'react';
import styled from 'styled-components';

const Paper = styled.div`
    background: #fff;
    padding: 20px;
    position: relative;
    border: 1px solid gray;
    min-width:300px;
    &:before{
        box-shadow: 1px 1px 1px rgba(0,0,0,0.25);
        border: 1px solid #bbb;
        content: "";
        position: absolute;
        height: 95%;
        width: 99%;
        background-color: #eee;
        right: 15px;
        top: -20px;
        transform: rotate(-3deg);
        z-index: -1;
        border: 1px solid gray;
        background-color:#616161;
    }
    &:after{
        box-shadow: 1px 1px 1px rgba(0,0,0,0.25);
        border: 1px solid #bbb;
        content: "";
        position: absolute;
        height: 95%;
        width: 99%;
        background-color: #eee;
        top: -15px;
        right: -5px;
        transform: rotate(3deg);
        z-index: -2;
        border: 1px solid gray;
        background-color:#9d9e9d;
    }
`;

const PaperCard = ({children}) => {
    const renderCardChildComponents = useCallback(
        (ch) => {
            return React.Children.map(ch, (child) => {
                return React.cloneElement(child);
                });
            }
        , []);
    return (
        <Paper>
            {renderCardChildComponents(children)}
        </Paper>
    );
}

export default PaperCard;
