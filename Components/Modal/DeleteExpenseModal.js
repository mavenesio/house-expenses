import React, {useCallback, useState, useEffect} from 'react';
import Styled from 'styled-components';
import Modal from './Modal';
import DeleteExpenseCard from '../CardModal/DeleteExpenseCard';

const DeleteExpenseModal = ({visibility, setVisibility, expense}) => {

    return (
        <Modal isVisible={visibility} changeVisibility={() => setVisibility(!visibility)}>
            <DeleteExpenseCard changeVisibility={() => {setVisibility(!visibility)}} expense={expense}/>
        </Modal>
        )
}

export default DeleteExpenseModal;

