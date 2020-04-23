// @ts-nocheck
import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import pen from '../Icons/Pen';
import Checkbox from '../CheckBox/Checkbox';


const ExpensesTableContainer = styled.div`
    width:100%;
    height:100%;
    margin-top:2rem;
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
    & > div{
        padding:0.5rem 0rem 0.5rem 0rem;
    }
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

const ExpensesTable = (props) => {
    const {dataTable} = props;

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
                                            <Checkbox title='' checked={row.paid} onCheck={console.log}/>
                                        </IconCell>
                                        <IconCell>
                                            <PenButton disabled={row.paid}  onClick={() => {setCurrentExpense(row); setModalIsVisible(true)}}/>
                                        </IconCell>
                                    </Row>)

        }, [])

    return (
        <>
            <ExpensesTableContainer>
                {dataTable && dataTable.length > 0
                    ?
                    <Table>
                        {renderRows(dataTable)}
                    </Table>
                    :
                    <h1>No hay gastos</h1>
                }
            </ExpensesTableContainer>
        </>
    )


}


export default ExpensesTable;