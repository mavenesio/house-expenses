import React from 'react';
import Modal from './Modal';
import CreateUserCard from './ModalCard/CreateUserCard';

const CreateUserModal = ({visibility, setVisibility, setSignUpSuccess}) => {

    return (
        <Modal isVisible={visibility} changeVisibility={() => setVisibility(!visibility)}>
            <CreateUserCard setSignUpSuccess={setSignUpSuccess} changeVisibility={() => {setVisibility(!visibility)}}/>
        </Modal>
        )
}

export default CreateUserModal;

