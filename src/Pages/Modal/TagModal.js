import React, { useContext } from 'react';
import styled from 'styled-components';
import TagModalCategory from './TagModalCategory';
import theme from '../../Styles/theme';
import ModalHeader from './ModalHeader';

const TagModal = () => {
  return (
    <TagModalContainer>
      <ModalHeader />
      <TagModalCategory />
    </TagModalContainer>
  );
};

export default TagModal;

const TagModalContainer = styled.div`
  ${theme.modalStyle}
  width:600px;
  height: 500px;
`;
