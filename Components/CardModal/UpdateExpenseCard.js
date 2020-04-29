// @ts-nocheck
import React, {useState, useEffect, useContext, useCallback} from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation, gql} from'@apollo/client';
import ExpenseContext from '../../context/expenses/ExpenseContext';
import TimesCircle from '../Icons/TimesCircle';
import Input from '../Input/Input';
import Button from '../Button/Button';
import ErrorField from '../ErrorField/ErrorField';
import StyledSelect from '../StyledSelect/StyledSelect';
import {ExpenseTypeOptions} from '../../constants/constants';

const CrossButton = styled(TimesCircle)`
    align-self:center;
    font-size: 20px;
    color: black;
    margin: 0rem 1rem 0rem 1rem;
    cursor: pointer;
    &:hover{
        color: ${props => props.theme.color.primaryLightColor};
    }
`;
const UpdateExpenseCardContainer = styled.form`
    z-index:5;
    position:relative;
    align-self:center;
    background-color:${props => props.theme.color.white};
    border-radius:5px;
`;
const ModalHeader = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    padding:1rem;
    margin:1rem;
    height:10%;
    border-bottom: 2px solid ${props => props.theme.color.primaryLightColor};
`;
const ModalHeaderText = styled.div`
    font-family:${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.subTitle};
    font-weight: 800;
`;
const ModalBody = styled.div`
    display:flex;
    flex-direction:column;
    overflow-y: auto;
`;

const InputContainer = styled.div`
    margin:0.1rem 1rem 0.1rem 1rem;
    width:50%;
    display:flex;
    flex-direction:column;
    position:relative;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
`;
const ButtonContainer = styled.div`
    margin:0.1rem 1rem 0.1rem 1rem;
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    position:relative;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
`;
const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    margin-top:1rem;
`;
const CustomButton = styled(Button)`
  margin:1rem 0rem 1rem 0rem;
  width:50%;
  @media screen {
    width:100%;
  }
  cursor: pointer;
`;

const UPDATE_EXPENSE = gql`
    mutation updateExpense($input:UpdateExpenseInput!){
        updateExpense(input: $input){
            id,
            name,
            paid,
            amount,
            type
        }
    }
`;
const UpdateExpenseCard = (props) => {
    const {changeVisibility, expense} = props;
    const [ErrorMessage, setErrorMessage] = useState(null);
    const [updateExpense] = useMutation(UPDATE_EXPENSE);
    const expenseContext = useContext(ExpenseContext);
    const removeWhiteSpaces = useCallback((value) => value.toString().trim());
    const formik = useFormik({
        initialValues: {
            updateAmount: (expense) ? expense.amount : '',
            updateType: (expense) ? ExpenseTypeOptions.find(option => option.value === expense.type) : ExpenseTypeOptions[0],
        },
        validationSchema: Yup.object({
            updateAmount: Yup.number('Must be number')
                            .required('Amount is required.')
                            .min(0, 'Amount greater than 0.')
                            .max(9999999,'Amount must be lower than 9999999 characters'),
            updateType: Yup.object().required('Type is required.'),
        }),
        onSubmit: async values => {
                const {updateAmount, updateType} = values;
                const {id} = expense;
                try {
                    const {data} = await updateExpense({
                        variables: { 
                            input: {
                                expenseId: id, 
                                amount: parseFloat(updateAmount),
                                type:updateType.value
                            }
                        }
                    });
                    expenseContext.updateExpense(data.updateExpense);
                    changeVisibility();
                } catch (err) {
                    const message = err.message.replace('GraphQL error:', '');
                    setErrorMessage(message);
                    setTimeout( () => {
                    setErrorMessage(null);
                    },4000);
                }
            }    
        });
    
    const { setFieldValue } = formik;
    useEffect(() => {
        setFieldValue('updateAmount', (expense) ? expense.amount : '');
        setFieldValue('updatetype', (expense) ? ExpenseTypeOptions.find(option => option.value === expense.type) : ExpenseTypeOptions[0]);
    }, [expense]);

    const handleTypeSelect = useCallback((value) => setFieldValue('updateType', value), [setFieldValue]);

    return (
        <UpdateExpenseCardContainer onSubmit={formik.handleSubmit} id='updateExpenseForm'>
            <ModalHeader>
                <ModalHeaderText>
                    Update {expense !== null ? expense.name : ''}
                </ModalHeaderText>
                <CrossButton onClick={changeVisibility}/>
            </ModalHeader>
            <ErrorField ErrorMessage={ErrorMessage} touched={true} />
            <ModalBody >
                <Row>
                    <InputContainer>
                    <StyledSelect
                        options={ExpenseTypeOptions}
                        value={formik.values.updateType}
                        onChange={handleTypeSelect}
                        name='type'
                        label='Type'
                    />
                    <ErrorField errorMessage={formik.errors.updateName} touched={formik.touched.updateName} />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            value={removeWhiteSpaces(formik.values.updateAmount)}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='updateAmount'
                            id='updateAmount'
                        />
                        <label>Amount</label>
                    <ErrorField errorMessage={formik.errors.updateAmount} touched={formik.touched.updateAmount} />
                    </InputContainer>
                </Row>
                <ButtonContainer>
                    <CustomButton type='submit' form='updateExpenseForm' >Update!</CustomButton>
                </ButtonContainer>
            </ModalBody>
        </UpdateExpenseCardContainer>
    )
}

export default UpdateExpenseCard;