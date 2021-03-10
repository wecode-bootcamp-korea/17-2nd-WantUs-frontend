import React, { useContext } from 'react';
import styled from 'styled-components';
import theme from '../../Styles/theme';
import ModalHeader from './ModalHeader';

function CareerModal() {
  return (
    <CareerModalContainer>
      <ModalHeader />
      <CareerModalItems>
        {careerData.length >= 1 &&
          careerData[0].map(career => {
            return (
              <CareerModalItem key={career.id}>{career.name}</CareerModalItem>
            );
          })}
      </CareerModalItems>
    </CareerModalContainer>
  );
}

export default CareerModal;

const CareerModalContainer = styled.div`
  ${theme.modalStyle}
  height: 220px;
  padding: 10px;
`;

const CareerModalItems = styled.select`
  ${theme.priorityStyle}
  height:40px;
  margin: 60px 90px;
`;

const CareerModalItem = styled.option`
  ${theme.priorityStyle}
`;
