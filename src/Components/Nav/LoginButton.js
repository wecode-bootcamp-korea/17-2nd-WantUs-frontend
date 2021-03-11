import React, { useContext } from 'react';
import styled from 'styled-components';
import BoardContext from '../../BoardContext';

const LoginButton = () => {
  const { isLogin, handleModal } = useContext(BoardContext);

  return (
    <Button onClick={() => handleModal(4)}>
      <span>Login</span>
    </Button>
  );
};

export default LoginButton;

const Button = styled.button`
  background: white;
  border: none;
  outline: none;
  margin: 0 5px;
  cursor: pointer;
`;
