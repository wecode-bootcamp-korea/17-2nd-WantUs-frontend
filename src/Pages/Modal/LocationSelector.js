import React, { useContext, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import styled from 'styled-components';
import theme from '../../Styles/theme';

function LocationSelector({ selectedStateList, handleDelete }) {
  return (
    <SelectorContainer>
      {selectedStateList.map(state => {
        return (
          <SeletorItem key={state.id} onClick={() => handleDelete(state)}>
            {state.name}
            <TiDelete />
          </SeletorItem>
        );
      })}
    </SelectorContainer>
  );
}

export default LocationSelector;

const SelectorContainer = styled.ul`
  display: flex;

  &:last-of-type {
    color: ${theme.logoBlue};
  }
`;

const SeletorItem = styled.li`
  ${theme.itemStyle}
  padding:10px;
  border-radius: 17px;
  background-color: ${theme.lightGray};
`;
