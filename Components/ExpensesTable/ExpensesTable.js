// @ts-nocheck
import React, {useState, useCallback} from 'react';
import styled from 'styled-components';

import Card from '../Card/Card';
import Checkbox from '../CheckBox/Checkbox';
import {ExpenseTypes} from '../../constants/constants';

import Modal from '../Modal/Modal';
import PlusSquare from '../Icons/PlusSquare';
import Trash from '../Icons/Trash';
import Pen from '../Icons/Pen';

const ExpensesTableContainer = styled.div`
    height:100%;
    font-family: ${props => props.theme.font.family}, cursive;
    font-size:25px;
    display: flex;
    justify-content: center;
`;
const PenButton = styled(Pen)`
    align-self:center;
    font-size: 20px;
    color: black;
    margin: 0rem 1rem 0rem 1rem;
    pointer-events: ${props => props.disabled ? 'none': 'unset'};
    cursor:${props => props.disabled ? 'not-allowed': 'pointer'};
    color: ${props => props.disabled ? 'gray' : props.theme.color.primaryDarkColor};
    &:hover{
        color: ${props => props.disabled ? 'gray' : props.theme.color.secondaryColor};
    }
    &:active{
        color: ${props => props.disabled ? 'gray' : props.theme.color.secondaryColor};
    }
`;
const TrashButton = styled(Trash)`
    align-self:center;
    font-size: 20px;
    color: black;
    margin: 0rem 1rem 0rem 1rem;
    pointer-events: ${props => props.disabled ? 'none': 'unset'};
    cursor:${props => props.disabled ? 'not-allowed': 'pointer'};
    color: ${props => props.disabled ? 'gray' : props.theme.color.primaryDarkColor};
    &:hover{
        color: ${props => props.disabled ? 'gray' : props.theme.color.secondaryColor};
    }
    &:active{
        color: ${props => props.disabled ? 'gray' : props.theme.color.secondaryColor};
    }
`;
const Table = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-self:flex-start;
    min-width:300px;
`;
const Row = styled.div`
    background-color:${props => props.theme.color.darkGray};
    border: 1px solid ${props => props.theme.color.darkGray};
    color:${props => props.theme.color.white};
    display:flex;
    flex-direction:row;
    justify-content:center;
    padding: 0rem.6rem 0rem .6rem;
    &:hover{
        border: 1px solid ${props => props.theme.color.gray};
        border-radius:8px;
    }
`;
const FooterRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    padding: 1rem.6rem 1rem .6rem;
    border-top:  1.5px solid ${props => props.theme.color.primaryColor};
        border: 1px solid ${props => props.theme.color.darkGray};
    &:hover{
        border: 1px solid ${props => props.theme.color.gray};
        border-radius:8px;
    }
`;
const HorizonalLine = styled.div`
    height:0px;
    border: 1.5px solid ${props => props.theme.color.secondaryColor};
    position:absolute;
    top:calc(40%);
    width:100%;
    display: ${props => props.isvisible ? 'block' : 'none' };
    @media (max-width: 800px) {
        top:calc(30%);
        border: 1px solid ${props => props.theme.color.secondaryColor};
    }
`;

const NameCell = styled.div`
    cursor: default;
    overflow:hidden;
    white-space:nowrap;
    text-align:start;
    position:relative;
    width: 70%;
    font-size:20px;
    @media (max-width: 800px) {
        font-size:15px;
    }
`;
const AmoutCell = styled.div`
    cursor: default;
    text-align:end;
    position:relative;
    width: 20%;
    font-size:20px;
    @media (max-width: 800px) {
        font-size:15px;
    }
    
`;
const PlusButton = styled(PlusSquare)`
    position:absolute;
    top: -33px;
    right: -48px;
    align-self:flex-start;
    padding:0.5rem;
    cursor: pointer;
    font-size: 50px;
    background-color: ${props => props.theme.color.darkGray};
    color: ${props => props.theme.color.secondaryColor};
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.lightGray};
    }
`;
const IconCell = styled.div`
    text-align:start;
    width:10%;
    margin-left:0.2rem;
`;

const ExpensesTable = ({dataTable, onEdit, onCheck, onDelete, onCreate}) => {
    const renderIcon = useCallback(
        (rowType) => {
            const icon = ExpenseTypes.find(type => type.key === rowType);
            if (icon !== undefined) return icon.value;
            return ExpenseTypes.find(type => type.key === 'Market').value
        }
    )

    const renderRows = useCallback(
        
        (data) => {
            return data.map(
                row => 
                <Row key={row.name}>
                    {renderIcon(row.type)}
                    <NameCell>
                        {row.name}
                        <HorizonalLine isvisible={row.paid}/>
                    </NameCell>
                    <AmoutCell> 
                        {row.amount}
                        <HorizonalLine isvisible={row.paid}/>
                    </AmoutCell>
                    {onCheck &&
                        <IconCell>
                            <Checkbox title='' checked={row.paid} onCheck={() => onCheck(row.id,row.paid)}/>
                        </IconCell>
                    }
                    {onEdit &&
                        <IconCell>
                            <PenButton disabled={row.paid}  onClick={() => onEdit(row)}/>
                        </IconCell>
                    }
                    {onDelete &&
                        <IconCell>
                            <TrashButton disabled={row.paid}  onClick={() => onDelete(row)} />
                        </IconCell>
                    }
                </Row>
                )}, []);
    return (
        <>
            <ExpensesTableContainer>
                <Card>
                    {dataTable && dataTable.length > 0
                        ?
                            <Table>
                                {renderRows(dataTable)}
                                <FooterRow>
                                    <NameCell>Total </NameCell>
                                    <AmoutCell>{dataTable.reduce((accumulator, expense) => accumulator + expense.amount, 0)}</AmoutCell>
                                    <IconCell/>
                                    <IconCell/>
                                    <IconCell/>
                                </FooterRow>
                            </Table>
                        :
                    <p>No expenses</p>
                    }
                    {onCreate && <PlusButton onClick={onCreate}/>}
                </Card>
            </ExpensesTableContainer>
        </>
    )
}

export default ExpensesTable;