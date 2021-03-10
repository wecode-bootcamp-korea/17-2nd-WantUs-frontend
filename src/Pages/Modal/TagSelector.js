import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardContext from '../../BoardContext';
import theme from '../../Styles/theme';

const TagSelector = ({ detailTagInfo }) => {
  const { id, tagDetail } = detailTagInfo;
  const { handleTagModal } = useContext(BoardContext);
  const [selectedTagList, setSelectedTagList] = useState([]);

  useEffect(() => {}, [selectedTagList]);

  const handleId = tag => {
    if (selectedTagList.length > 2) {
      alert('최대 적용가능 태그는 3개입니다.');
      return;
    }
    !selectedTagList.find(item => item.id === tag.id) &&
      setSelectedTagList([...selectedTagList, tag]);
  };

  const deleteTag = id => {
    const tempTagList = selectedTagList.filter(tag => tag.id !== id);
    setSelectedTagList([...tempTagList]);
  };

  return (
    <TagSelectorContainer>
      <TagSelectorItem>
        <h3>2. 태그선택</h3>
        {tagDetail &&
          tagDetail.map(tag => {
            return (
              <SelectItem
                onClick={() => {
                  handleId(tag);
                }}
                key={tag.id}
              >
                {tag.name}
              </SelectItem>
            );
          })}
      </TagSelectorItem>
      <>
        <MultipleTags>
          {selectedTagList.length >= 1 &&
            selectedTagList.map(tag => {
              return (
                <SelectedTag key={tag.id} onClick={() => deleteTag(tag.id)}>
                  {tag.name}
                </SelectedTag>
              );
            })}
        </MultipleTags>
      </>

      <Button
        onClick={() =>
          selectedTagList.length >= 1 && handleTagModal(selectedTagList)
        }
      >
        확인
      </Button>
    </TagSelectorContainer>
  );
};

export default TagSelector;

const TagSelectorContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const TagSelectorItem = styled.div`
  ${theme.borderStyle}
  width:260px;
  height: 230px;
  padding: 5px;

  h3 {
    margin-top: 10px;
  }
`;
const SelectItem = styled.div`
  ${theme.itemStyle}
  background-color: ${theme.darkGray};
  opacity: 0.3;
  border-radius: 17px;
`;

const Button = styled.div`
  ${theme.categoryStyle};
  display: table;
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
  opacity: none;
  background-color: ${theme.mainBlue};
  text-align: center;
`;

const MultipleTags = styled.div`
  ${theme.categoryStyle};
`;
const SelectedTag = styled.div`
  margin: 10px;
  color: ${theme.logoBlue};
`;
