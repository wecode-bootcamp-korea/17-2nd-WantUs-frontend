import React from 'react';
import styled from 'styled-components';
import theme from '../../../../Styles/theme';
import { GoTriangleDown } from 'react-icons/go';

function Filter() {
  return (
    <FilterContainer>
      <FilterButtonContainer>
        <div className="btnContainer">
          {filterData.map(data => {
            return (
              <FilterButton key={data.id}>
                {data.classification}
                <FilterContent>{data.content}</FilterContent>
                <GoTriangleDown size={'10px'} />
              </FilterButton>
            );
          })}
        </div>
        <PriorityContainer>
          <PrioritySelect>
            {subFilterData.map(data => {
              return (
                <PriorityOption value={data.id}>{data.content}</PriorityOption>
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

const FilterButton = styled.button`
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

const filterData = [
  { id: 1, classification: '태그', content: '딱 맞는 기업 찾기' },
  { id: 2, classification: '지역', content: '한국' },
  { id: 3, classification: '경력', content: '신입' },
];

const subFilterData = [
  { id: 1, content: '최신순' },
  { id: 2, content: '보상금순' },
  { id: 3, content: '인기순' },
];
