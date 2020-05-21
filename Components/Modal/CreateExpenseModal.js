import React, {useCallback, useState, useEffect} from 'react';
import Modal from './Modal';
import CreateExpenseCard from './ModalCard/CreateExpenseCard';

const CreateExpenseModal = ({visibility, setVisibility, setMessage}) => {

    return (
        <Modal isVisible={visibility} changeVisibility={() => setVisibility(!visibility)}>
            <CreateExpenseCard changeVisibility={() => {setVisibility(!visibility)}} setMessage={setMessage}/>
        </Modal>
        )
}

export default CreateExpenseModal;

