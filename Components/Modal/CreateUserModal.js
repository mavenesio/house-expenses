import React from 'react';
import Modal from './Modal';
import CreateUserCard from './ModalCard/CreateUserCard';

const CreateUserModal = ({visibility, setVisibility, setMessage}) => {

    return (
        <Modal isVisible={visibility} changeVisibility={() => setVisibility(!visibility)}>
            <CreateUserCard 
                setMessage={setMessage}
                changeVisibility={() => {setVisibility(!visibility)}}
            />
        </Modal>
        )
}

export default CreateUserModal;

