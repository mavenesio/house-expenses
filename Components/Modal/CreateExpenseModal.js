import React, {useCallback, useState, useEffect} from 'react';
import Modal from './Modal';
import CreateExpenseCard from '../CardModal/CreateExpenseCard';

const CreateExpenseModal = ({visibility, setVisibility}) => {

    return (
        <Modal isVisible={visibility} changeVisibility={() => setVisibility(!visibility)}>
            <CreateExpenseCard changeVisibility={() => {setVisibility(!visibility)}}/>
        </Modal>
        )
}

export default CreateExpenseModal;

