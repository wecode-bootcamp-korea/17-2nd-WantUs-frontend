import React from 'react';
import styled from 'styled-components';
import { AiOutlineReload } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import theme from '../../Styles/theme';

function ModalHeader() {
  return (
    <TagModalHeader>
      <ClearData>
        <AiOutlineReload />
        초기화
      </ClearData>
      <div>
        태그 <span>0</span>
      </div>
      <TiDeleteOutline size={18} />
    </TagModalHeader>
  );
}

export default ModalHeader;

const TagModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 8px;
  width: 90%;
  color: ${theme.iconBlue};
  font-size: 15px;

  div {
    &:last-of-type {
      font-weight: bold;

      span {
        padding: 3px 7px;
        border-radius: 50%;
        color: ${theme.white};
        background: ${theme.iconBlue};
      }
    }
  }
`;
const ClearData = styled.div`
  margin-left: 5px;
`;
