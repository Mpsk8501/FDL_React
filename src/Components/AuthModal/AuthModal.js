import React from 'react';
import Modal from "../../HOC/Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {authClose} from "../../ReduxStore/actions/authAction";


const AuthModal = () => {
  //const dispatch = useDispatch();
  const isOpen = useSelector(state=>state.auth.isOpen);

  return (
      <Modal title={'Войти'} isOpen={isOpen} onClose={authClose}>
        <h2>Auth</h2>
      </Modal>
  );
};

export default AuthModal;