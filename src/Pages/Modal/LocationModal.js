import React, { useContext } from 'react';
import ModalHeader from './ModalHeader';
import LocationModalCategory from './LocationModalCategory';
import styled from 'styled-components';
import theme from '../../Styles/theme';
import BoardContext from '../../BoardContext';

const LocationModal = () => {
  const { isLocationModal, modalNum } = useContext(BoardContext);
  return (
    <LocationModalContainer openModal={isLocationModal}>
      <ModalHeader data={modalNum.locationNum} />
      <LocationModalCategory />
    </LocationModalContainer>
  );
};

export default LocationModal;

const LocationModalContainer = styled.div`
  display: ${props => (props.openModal ? 'block' : 'none')};
  height: 300px;
  ${theme.modalStyle};
  ${theme.showModaStyle}
`;
