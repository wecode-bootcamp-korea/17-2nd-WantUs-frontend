import React, { useState, useContext, Fragment } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import theme from '../../Styles/theme';
import BoardContext from '../../BoardContext';
import TagSelector from './TagSelector';

const TagModalCategory = () => {
  const { filterData } = useContext(BoardContext);
  const [selectedTag, setSelectedTag] = useState([]);

  const genColor = () => {
    const hexNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let result = '#';

    for (let i = 0; i < 6; i++) {
      const randomColor = Math.floor(Math.random() * hexNumber.length);
      result += hexNumber[randomColor];
    }
    return result;
  };

  const SendDetailTagInfo = selectedOne => {
    setSelectedTag(selectedOne);
  };

  return (
    <Fragment>
      <CategoryModalContainer>
        <h3>
          기업의 특별한 복지, 혜택 등 태그를 선택하여 나에게 꼭 맞는 포지션을
          찾아보세요!
        </h3>
        <h3>1. 카테고리 선택</h3>
        <CategoryItemContainer>
          {filterData.tagData.length >= 1 &&
            filterData.locationData.length >= 1 &&
            filterData.tagData[0].map(tag => {
              return (
                <CategoryItem
                  key={tag.id}
                  genColor={genColor}
                  onClick={() => {
                    SendDetailTagInfo(tag);
                  }}
                >
                  {tag.name}
                </CategoryItem>
              );
            })}
        </CategoryItemContainer>
        <TagSelector detailTagInfo={selectedTag} />
      </CategoryModalContainer>
    </Fragment>
  );
};

export default TagModalCategory;

const CategoryModalContainer = styled.div`
  margin: 30px 20px;

  h3 {
    margin: 10px 17px;
  }
`;

const CategoryItemContainer = styled.div`
  display: flex;
  ${theme.widthHeightAuto};
`;

const CategoryItem = styled.div`
  margin: 10px;
  padding: 5px;
  ${theme.categoryStyle}
  background-color: ${props => props.genColor};
`;
