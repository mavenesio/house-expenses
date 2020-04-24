// @ts-nocheck
import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import pen from '../Icons/Pen';
import Card from '../Card/Card';
import Checkbox from '../CheckBox/Checkbox';
import {useMutation, gql} from'@apollo/client';


const ExpensesTableContainer = styled.div`
    width:100%;
    height:100%;
    font-family: ${props => props.theme.font.family}, cursive;
    font-size:25px;
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
`;
const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
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


const AmoutCell = styled.div`
    text-align:end;
    width:15%;
    position:relative;
`;
const NameCell = styled.div`
    text-align:start;
    width:30%;
    position:relative;
`;
const IconCell = styled.div`
    text-align:start;
    width:5%;
    margin-left:1rem;
`;
const PAID_EXPENSE = gql`
    mutation payExpense($input:payExpenseInput!){
        payExpense(input: $input){
            id,
            name,
            paid,
            amount
        }
    }
`;
const TotalPay = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap:nowrap;
    justify-content:flex-end;
    color: red;
    text-decoration: ${props => props.paySome ? 'line-through' : 'none'};
`;
const Paid = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    flex-wrap:nowrap;
    color: green;

`;

const ExpensesTable = (props) => {
    const {dataTable} = props;
    const [payExpense] = useMutation(PAID_EXPENSE);
    const paidExpense = useCallback(
        async (expenseId, paid) => {
            try {
                const {data} = await payExpense({
                    variables: { input: {expenseId: expenseId, paid: !paid }}
                });
            } catch (err) {
                console.log(err);
            }
        }
    )

    const renderRows = useCallback(
        (data) => {
            return data.map(row => <Row key={row.id}>
                                        <NameCell>
                                            {row.name}
                                            <HorizonalLine isvisible={row.paid}/>
                                        </NameCell>
                                        <AmoutCell> 
                                            {row.amount}
                                            <HorizonalLine isvisible={row.paid}/>
                                        </AmoutCell>
                                        <IconCell>
                                            <Checkbox title='' checked={row.paid} onCheck={() => paidExpense(row.id,row.paid)}/>
                                        </IconCell>
                                        <IconCell>
                                            <PenButton disabled={row.paid}  onClick={() => {setCurrentExpense(row); setModalIsVisible(true)}}/>
                                        </IconCell>
                                    </Row>)

        }, [])
    const getFooter = useCallback(
        (totalToPay, paid) => {

            return (
                    <>
                    <Row><NameCell><FooterLine/>Total a pagar</NameCell><AmoutCell>
                        <FooterLine /><TotalPay paySome={paid !== 0}>{totalToPay}</TotalPay>
                    </AmoutCell><IconCell></IconCell><IconCell></IconCell></Row>
                    <Row><NameCell>Pagado</NameCell><AmoutCell>
                        <Paid>{paid}</Paid>
                    </AmoutCell><IconCell></IconCell><IconCell></IconCell></Row>
                    <Row><NameCell>Falta</NameCell><AmoutCell>
                        <TotalPay paySome={false}>{totalToPay-paid}</TotalPay>
                    </AmoutCell><IconCell></IconCell><IconCell></IconCell></Row>
                    </>)
        }

    )
    const getTotal = useCallback( (data) => data.reduce((accumulator, expense) => accumulator + expense.amount, 0));
    const getTotalPaid = useCallback( (data) => data.reduce((accumulator, expense) => accumulator + (expense.paid ? expense.amount : 0), 0));

    return (
        <>
            <ExpensesTableContainer>
                {dataTable && dataTable.length > 0
                    ?
                    <Table>
                        {renderRows(dataTable)}
                        {getFooter(getTotal(dataTable), getTotalPaid(dataTable))}
                    </Table>
                    :
                    <Card><p>No hay gastos</p></Card>
                }
            </ExpensesTableContainer>
        </>
    )


}


export default ExpensesTable;