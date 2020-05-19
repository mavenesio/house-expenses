// @ts-nocheck
import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';

import Card from '../Card/Card';
import { MonthOptions} from '../../constants/constants';
import Pen from '../Icons/Pen';
import Times from '../Icons/TimesSolid';
import Check from '../Icons/CheckSolid';
import Input from '../Input/Input';
import {getDateFromISO, getNameMonthFromDate} from '../../Utils/DateUtils';

const PenButton = styled(Pen)`
    cursor: pointer;
    align-self:center;
    font-size: 20px;
    color: ${props => props.theme.font.color.primary};
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.primaryColor};
    }
    &:active{
        color: ${props => props.theme.color.primaryColor};
    }
`;
const CrossButton = styled(Times)`
    cursor: pointer;
    align-self:center;
    font-size: 20px;
    color: ${props => props.theme.font.color.primary};
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.primaryColor};
    }
    &:active{
        color: ${props => props.theme.color.primaryColor};
    }
`;
const CheckButton = styled(Check)`
    cursor: pointer;
    align-self:center;
    font-size: 20px;
    color: ${props => props.theme.font.color.primary};
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.primaryColor};
    }
    &:active{
        color: ${props => props.theme.color.primaryColor};
    }
`;

const ExpensesDataTableContainer = styled.div`
    height:100%;
    font-family: ${props => props.theme.font.family}, cursive;
    font-size:25px;
    display: flex;
    justify-content: center;
`;
const Table = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-self:flex-start;
    min-width:300px;
`;
const Row = styled.div`
    background-color:${props => props.theme.color.backgroundColor};
    border: 1px solid ${props => props.theme.color.backgroundColor};
    color:${props => props.theme.color.white};
    display:flex;
    flex-direction:row;
    justify-content:${props => props.position};
    padding: 0rem.6rem 0rem .6rem;
    &:hover{
        border: ${props => props.hover ? `1px solid ${props.theme.color.gray}` : 'unset'};
        border-radius:${props => props.hover ? '8px' :'unset'};
    }
    
`;
const Cell = styled.div`
    cursor: default;
    overflow:hidden;
    white-space:nowrap;
    text-align:${props => props.textAling};
    position:relative;
    margin-right:0.5rem;
    width: ${props => props.cellWith};
    font-size:20px;
    color: ${props => props.theme.font.color.primary};
    text-transform: capitalize;
    @media (max-width: 800px) {
        font-size:15px;
    }
`;
const HeaderCell = styled.div`
    cursor: default;
    overflow:hidden;
    white-space:nowrap;
    text-align:${props => props.textAling};
    position:relative;
    margin-right:0.5rem;
    width: ${props => props.cellWith};
    font-size:40px;
    color: ${props => props.theme.font.color.primary};
    @media (max-width: 800px) {
        font-size:20px;
    }
`;
const NoData = styled.p`
    color: ${props => props.theme.font.color.primary};
`;
const CustomInput = styled(Input)`
    border:2px solid ${props => props.theme.color.gray};
    background-color: ${props => props.theme.color.backgroundColor};
    color: ${props => props.theme.font.color.primary};
    padding:unset;
    font-size:40px;
    @media (max-width: 800px) {
        font-size:20px;
        height:30px;
    }
`;
const EditBox = styled.div`
    display:flex;
    flex-direction:row;

`;
const UPDATE_EXPENSE_NAME = gql`
    mutation updateExpenseName($input:UpdateExpenseNameInput!){
        updateExpenseName(input: $input){
            name   
        }
    }
`;

const ExpensesDataTable = ({dataTable, updateSelect}) => {
    const [OnEditName, setOnEditName] = useState(false);
    const [NewName, setNewName] = useState('');
    const [CurrentName, setCurrentName] = useState('');
    useEffect(() => { if(dataTable) setCurrentName(dataTable[0].name) }, [dataTable])
    const [updateExpenseName] = useMutation(UPDATE_EXPENSE_NAME);
    const UpdateName = useCallback( async (oldName, newName)  => {
        try {
            await updateExpenseName(
                {variables: { 
                    input: {
                        oldName: oldName,
                        newName: newName
                        }
                    }
                });
            setOnEditName(false);
            updateSelect();
            setCurrentName(newName);
        } catch (err) {console.log(err.message.replace('GraphQL error:', ''))}
    }, [])


    const renderRows = useCallback(
         (data) => {
            return data.map(
                row => 
                <Row key={row.id} position='center' hover={true}> 
                    <Cell cellWith='45px' textAling='start'> 
                        {getDateFromISO(row.currentDate).getFullYear()}
                    </Cell>
                    <Cell cellWith='100px' textAling='start'> 
                        {getNameMonthFromDate(row.currentDate, true)}
                    </Cell>
                    <Cell cellWith='76px' textAling='end'> 
                        {`$ ${row.amount}`}
                    </Cell>
                    <Cell cellWith='67px' textAling='start'> 
                        {row.paid ? 'Paid' : 'Unpaid'}
                    </Cell>
                </Row>
                )}, []);
    return (
        <ExpensesDataTableContainer>
            <Card>
                {dataTable && dataTable.length > 0
                    ?
                    <>
                        <Row position='space-between' hover={false}>
                            {OnEditName 
                            ?
                                <>
                                    <HeaderCell cellWith='200px' textAling='start'> 
                                        <CustomInput
                                            name='updateName'
                                            id='updateName'
                                            value={NewName}
                                            onChange={(event) => setNewName(event.target.value)}
                                        />
                                    </HeaderCell>
                                    <EditBox>
                                        <HeaderCell cellWith='45px' textAling='start'>
                                            <CrossButton onClick={() => setOnEditName(false)}/>
                                        </HeaderCell>
                                        <HeaderCell cellWith='45px' textAling='start'>
                                            <CheckButton onClick={() => UpdateName(CurrentName, NewName)}/>
                                        </HeaderCell>
                                    </EditBox>
                                </>
                            :
                                <>
                                    <HeaderCell cellWith='200px' textAling='start'> 
                                        {CurrentName}
                                    </HeaderCell>
                                    <HeaderCell cellWith='45px' textAling='start'>
                                        <PenButton onClick={() => {setNewName(CurrentName);setOnEditName(true)}}/>
                                    </HeaderCell>
                                </>
                            }
                        </Row>
                        <Table>
                            {renderRows(dataTable)}
                        </Table>
                    </>
                    :
                <NoData>No expenses</NoData>
                }
            </Card>
        </ExpensesDataTableContainer>
    )
}

export default ExpensesDataTable;
