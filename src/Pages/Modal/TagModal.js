import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import TagModalCategory from './TagModalCategory';
import theme from '../../Styles/theme';
import ModalHeader from './ModalHeader';
import BoardContext from '../../BoardContext';

const TagModal = () => {
  const { isTagModal, modalNum } = useContext(BoardContext);

  return (
    <TagModalContainer openModal={isTagModal}>
      <ModalHeader data={modalNum.tagNum} />
      <TagModalCategory />
    </TagModalContainer>
  );
};

export default TagModal;

const TagModalContainer = styled.div`
  display: ${props => (props.openModal ? 'block' : 'none')};
  ${theme.modalStyle}
  ${theme.showModaStyle}
  background-color: ${theme.white};
  width: 600px;
  height: 500px;
`;
