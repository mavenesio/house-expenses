// @ts-nocheck
import React, {useState, useCallback} from 'react';
import styled from 'styled-components';

import pen from '../Icons/Pen';
import PaperCard from '../Card/PaperCard';
import Checkbox from '../CheckBox/Checkbox';

const ExpensesTableContainer = styled.div`
    width:100%;
    height:100%;
    font-family: ${props => props.theme.font.family}, cursive;
    font-size:25px;
    display: flex;
    justify-content: center;
`;
const PenButton = styled(pen)`
    align-self:center;
    font-size: 20px;
    color: black;
    margin: 0rem 1rem 0rem 1rem;
    pointer-events: ${props => props.disabled ? 'none': 'unset'};
    cursor:${props => props.disabled ? 'not-allowed': 'pointer'};
    color: ${props => props.disabled ? 'gray' : props.theme.color.primaryDarkColor};
    &:hover{
        color: ${props => props.disabled ? 'gray' : props.theme.color.primaryLightColor};
    }
    &:active{
        color: ${props => props.disabled ? 'gray' : props.theme.color.primaryLightColor};
    }
`;
const Table = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-self:flex-start;
    width: 60%;
    min-width:300px;
`;
const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    padding: 0rem.6rem 0rem .6rem;
    &:hover{
        background-color:lightgray;
        border-radius:8px;
    }
`;
const HorizonalLine = styled.div`
    height:0px;
    border: 1.5px solid ${props => props.theme.color.primaryColor};
    position:absolute;
    top:calc(50%);
    width:100%;
    display: ${props => props.isvisible ? 'block' : 'none' };
`;
const FooterLine = styled.div`
    height:0px;
    border: 1.5px solid ${props => props.theme.color.primaryColor};
    position:absolute;
    top:0px;
    width:100%;
    display:block;
`;


const NameCell = styled.div`
    cursor: default;
    overflow:hidden;
    white-space:nowrap;
    text-align:start;
    position:relative;
    width: 70%;
`;
const AmoutCell = styled.div`
    text-align:end;
    position:relative;
    width: 20%;
    
`;
const IconCell = styled.div`
    text-align:start;
    width:10%;
    margin-left:1rem;
`;

const ExpensesTable = (props) => {
    const {dataTable, onEdit, onCheck} = props;

    const renderRows = useCallback(
        
        (data) => {
            return data.map(
                row => 
                <Row key={row.name}>
                    <NameCell>
                        {row.name}
                        <HorizonalLine isvisible={row.paid}/>
                    </NameCell>
                    <AmoutCell> 
                        {row.amount}
                        <HorizonalLine isvisible={row.paid}/>
                    </AmoutCell>
                    <IconCell>
                        <Checkbox title='' checked={row.paid} onCheck={() => onCheck(row.id,row.paid)}/>
                    </IconCell>
                    <IconCell>
                        <PenButton disabled={row.paid}  onClick={() => onEdit(row)}/>
                    </IconCell>
                </Row>
                )}, []);
    return (
        <>
            <ExpensesTableContainer>
                {dataTable && dataTable.length > 0
                    ?
                    <PaperCard>
                        <Table>
                            {renderRows(dataTable)}
                            <Row>
                                <NameCell><FooterLine/>Total a pagar</NameCell>
                                <AmoutCell><FooterLine/>{dataTable.reduce((accumulator, expense) => accumulator + expense.amount, 0)}</AmoutCell>
                                <IconCell/>
                                <IconCell/>
                            </Row>
                        </Table>
                    </PaperCard>
                    :
                    <PaperCard><p>No hay gastos</p></PaperCard>
                }
            </ExpensesTableContainer>
        </>
    )
}

export default ExpensesTable;