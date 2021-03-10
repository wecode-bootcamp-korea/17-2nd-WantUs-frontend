import React from 'react';
import ModalHeader from './ModalHeader';
import LocationModalCategory from './LocationModalCategory';
import styled from 'styled-components';
import theme from '../../Styles/theme';

const LocationModal = () => {
  return (
    <LocationModalContainer>
      <ModalHeader />
      <LocationModalCategory />
    </LocationModalContainer>
  );
};

export default LocationModal;

const LocationModalContainer = styled.div`
  ${theme.modalStyle}
  height:300px;
`;
