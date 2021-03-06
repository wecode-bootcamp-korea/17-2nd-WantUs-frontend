import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import theme from '../../../../Styles/theme';
import { GoTriangleDown } from 'react-icons/go';
import BoardContext from '../../../../BoardContext';

function Filter() {
  const { handleModal, categoryData, handleFilterData } = useContext(
    BoardContext,
  );
  const handleClickedModal = id => {
    handleModal(id);
  };

  const handlePriority = e => {
    handleFilterData(e.target.value);
  };

  return (
    <FilterContainer>
      <FilterButtonContainer>
        <div className="btnContainer">
          {filterData.map(data => {
            return (
              <FilterButton
                key={data.id}
                onClick={() => handleClickedModal(data.id)}
              >
                {data.classification}
                <FilterContent>{data.content}</FilterContent>
                <GoTriangleDown size={'10px'} />
              </FilterButton>
            );
          })}
        </div>
        <PriorityContainer>
          <PrioritySelect onChange={e => handlePriority(e)}>
            {subFilterData.map(data => {
              return (
                <PriorityOption value={data.name} key={data.id}>
                  {data.content}
                </PriorityOption>
              );
            })}
          </PrioritySelect>
        </PriorityContainer>
      </FilterButtonContainer>
    </FilterContainer>
  );
}

export default Filter;

const FilterContainer = styled.div`
  max-width: 935px;
`;

const FilterButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px 20px;
`;

const FilterButton = styled.div`
  display: inline-block;
  border-radius: 5px;
  border: 0.5px solid ${theme.darkGray};
  padding: 13px 15px;
  margin-right: 5px;
  background-color: ${theme.white};
  font-weight: bold;
  cursor: pointer;
`;

const FilterContent = styled.span`
  margin: 0 10px;
  color: ${theme.logoBlue};
`;

const PriorityContainer = styled.div`
  position: relative;
  margin-left: 70px;
  cursor: pointer;
`;

const PrioritySelect = styled.select`
  ${theme.priorityStyle}
`;

const PriorityOption = styled.option`
  ${theme.priorityStyle}
`;

const ModalContainer = styled.div`
  z-index: 8;
`;

const filterData = [
  { id: 1, classification: '태그', content: '딱 맞는 기업 찾기' },
  { id: 2, classification: '지역', content: '한국' },
  { id: 3, classification: '경력', content: '신입' },
];

const subFilterData = [
  { id: 1, content: '최신순', name: 'new' },
  { id: 2, content: '보상금순', name: 'reward' },
  { id: 3, content: '인기순', name: 'popular' },
];
