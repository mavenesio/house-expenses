import styled from 'styled-components';

const Input = styled.input`
    width:100%;
    border-radius:8px;
    padding: 20px 20px 5px 20px;
    border: 2px solid ${props => props.theme.color.primaryLightColor};
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    box-sizing: border-box;
    line-height: 1.2em;
    height:55px;
    outline: unset;
    &:focus {
        outline: none;
        border: 2px solid ${props => props.theme.color.primaryDarkColor};
    };
    & ~ label{
        color:${props => props.theme.color.primaryDarkColor};
        font-family: ${props => props.theme.font.family};
        font-size: 14px;
        position:absolute;
        top:0px;
        left:10px;
    }
`;
export default Input;