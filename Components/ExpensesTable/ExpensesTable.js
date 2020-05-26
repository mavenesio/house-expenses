// @ts-nocheck
import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';

import Card from '../Card/Card';
import Checkbox from '../CheckBox/Checkbox';
import {ExpenseTypes} from '../../constants/constants';
import RadioButtonType from '../RadioButtonType/RadioButtonType';
import PlusSquare from '../Icons/PlusSquare';
import Trash from '../Icons/Trash';
import Pen from '../Icons/Pen';

const StyledCard = styled(Card)`
    width:70%;
`;

const ExpensesTableContainer = styled.div`
    height:100%;
    font-family: ${props => props.theme.font.family}, cursive;
    font-size:25px;
    display: flex;
    justify-content: center;
    width: 1000px;
`;
const PenButton = styled(Pen)`
    align-self:center;
    font-size: 20px;
    color: ${props => props.theme.font.color.primary};
    margin: 0rem 0.5rem 0rem 0.8rem;
    pointer-events:${props => props.disabled ? 'none' : 'unset'};
    color: ${props => props.disabled ? 'gray' : props.theme.font.color.primary};
    &:hover{
        color: ${props => props.disabled ? 'gray' : props.theme.color.primaryColor};
    }
    &:active{
        color: ${props => props.disabled ? 'gray' : props.theme.color.primaryColor};
    }
`;

const TrashButton = styled(Trash)`
    align-self:center;
    font-size: 20px;
    color: ${props => props.theme.font.color.primary};
    pointer-events:${props => props.disabled ? 'none' : 'unset'};
    color: ${props => props.disabled ? 'gray' : props.theme.font.color.primary};
    &:hover{
        color: ${props => props.disabled ? 'gray' : props.theme.color.primaryColor};
    }
    &:active{
        color: ${props => props.disabled ? 'gray' : props.theme.color.primaryColor};
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
    border: 1px solid transparent;
    color:${props => props.theme.color.backgroundSecondaryColor};
    display:flex;
    flex-direction:row;
    justify-content:center;
    padding: 0.6rem 0.6rem 0rem 0.6rem;
    &:hover{
        border: 1px solid ${props => props.theme.color.gray};
        border-radius:8px;
    }
`;

const FilterContainer = styled.div`
    border: 1px solid transparent;
    color:${props => props.theme.color.white};
    display:flex;
    flex-direction:row;
    justify-content:center;
    margin-top:3rem;
    padding: 0rem.6rem 0rem .6rem;
    flex-wrap:wrap;
`;

const FooterRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    margin-left: 30px;
    padding-top: 1rem;
    border-top:  1.5px solid ${props => props.theme.color.primaryColor};
    border: 1px solid transparent;
`;

const HorizonalLine = styled.div`
    height:0px;
    border-top: 3px solid ${props => props.theme.color.primaryColor};
    position:absolute;
    top:calc(40%);
    width:100%;
    display: ${props => props.isvisible ? 'block' : 'none' };
    @media (max-width: 800px) {
        top:calc(30%);
        border: 1px solid ${props => props.theme.color.primaryColor};
    }
`;

const Cell = styled.div`
    cursor: default;
    overflow-wrap: normal;
    overflow:hidden;
    text-align:${props => props.align};
    position:relative;
    width: ${props => props.cellWith};
    font-size:20px;
    color: ${props => props.theme.font.color.primary};
    @media (max-width: 800px) {
        font-size:15px;
    }
    ::first-letter {
        text-transform:uppercase;
    }
`;
const PlusButton = styled(PlusSquare)`
    position:absolute;    
    top: -7px;
    right: -23px;
    align-self:flex-start;
    padding:0.5rem;
    cursor: pointer;
    font-size: 50px;
    color: ${props => props.theme.color.backgroundSecondaryColor};
    width: ${props => props.cellWith};
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.gray};
    }
`;
const IconCell = styled.div`
    text-align:start;
    width:35px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;
const NoData = styled.p`
    color: ${props => props.theme.font.color.primary};
`;

const ExpensesTable = ({dataTable, onEdit, onCheck, onDelete, onCreate}) => {
    const [SelectedType, setSelectedType] = useState(null);
    const [Data, setData] = useState(null);
    useEffect(() => setData(dataTable), [dataTable]);
    useEffect(() => setData(SelectedType ? dataTable.filter(expense => expense.type === SelectedType) : dataTable), [SelectedType])

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
                    <Cell align='start' cellWith='60%'>
                        {row.name}
                        <HorizonalLine isvisible={row.paid}/>
                    </Cell>
                    <Cell align='end' cellWith='20%'>
                        {row.amount}
                        <HorizonalLine isvisible={row.paid}/>
                    </Cell >
                    {onCheck &&
                        <IconCell>
                            <Checkbox title='' checked={row.paid} onCheck={() => onCheck(row.id,row.paid)}/>
                        </IconCell>
                    }
                    {onEdit &&
                        <IconCell disabled={row.paid}>
                            <PenButton disabled={row.paid}  onClick={() => onEdit(row)}/>
                        </IconCell>
                    }
                    {onDelete &&
                        <IconCell disabled={row.paid}>
                            <TrashButton disabled={row.paid}  onClick={() => onDelete(row)} />
                        </IconCell>
                    }
                </Row>
                )}, []);
    return (
        <>
            <ExpensesTableContainer>
                <StyledCard >
                    <FilterContainer>
                        <RadioButtonType value={SelectedType} onChange={(value) => setSelectedType(value)} cleanAvailable={true}/>
                    </FilterContainer>
                    {Data && Data.length > 0
                        ?
                            <Table>
                                {renderRows(Data)}
                                <FooterRow>
                                    <Cell align='start' cellWith='60%'>Total </Cell>
                                    <Cell align='end'cellWith='20%'>{Data.reduce((accumulator, expense) => accumulator + expense.amount, 0)}</Cell>
                                    {onCheck && <IconCell/>}
                                    {onEdit && <IconCell/>}
                                    {onDelete && <IconCell/>}
                                </FooterRow>
                            </Table>
                        :
                    <NoData>No expenses</NoData>
                    }
                    {onCreate ? <PlusButton onClick={onCreate}/> : <></>}
                </StyledCard>
            </ExpensesTableContainer>
        </>
    )
}

export default ExpensesTable;
