import React, {useCallback, useState, useEffect} from 'react';
import Modal from './Modal';
import UpdateExpenseCard from '../CardModal/UpdateExpenseCard';

const UpdateExpenseModal = ({visibility, setVisibility, expense}) => {

    return (
        <Modal isVisible={visibility} changeVisibility={() => setVisibility(!visibility)}>
            <UpdateExpenseCard expense={expense} changeVisibility={() => {setVisibility(!visibility)}}/>
        </Modal>
        )
}

export default UpdateExpenseModal;

