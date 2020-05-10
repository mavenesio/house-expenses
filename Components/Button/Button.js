import styled from 'styled-components';

const Button = styled.button`
    cursor: pointer;
    width:100%;
    padding: 1rem;
    border-radius: 8px;
    border: 2px solid ${props => props.theme.color.primaryDarkColor};
    background-color: ${props => props.theme.color.primaryColor};
    font-size: ${props => props.theme.font.size.text};
    font-weight:${props => props.theme.font.weight.bold};
    color: ${props => props.theme.color.black};
    font-weight:800;
    &:hover{
        background-color: ${props => props.theme.color.primaryDarkColor};
        color: ${props => props.theme.color.white};
    }
    &:focus {
        outline: unset;
    }
    &:disabled {
        background-color: ${props => props.theme.color.gray};
        color: ${props => props.theme.color.darkGray};
    }
`;
export const SecondaryButton = styled(Button)`
    color: ${props => props.theme.color.black};
    border: 2px solid ${props => props.theme.color.primaryDarkColor};
    background-color: ${props => props.theme.color.white};
    &:hover{
        background-color: ${props => props.theme.color.primaryDarkColor};
        color: ${props => props.theme.color.white};
    }
    &:disabled {
        background-color: ${props => props.theme.color.primaryDarkColor};
        color: ${props => props.theme.color.primaryColor};
    }
`;
export default Button;