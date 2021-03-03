import React from 'react';
import styled from 'styled-components';

class NavDetail extends React.Component {
  render() {
    const { categoryTitle, onMouseLeave } = this.props;

    return (
      <CategoryBox>
        <MainCategory onMouseLeave={onMouseLeave}>
          {categoryTitle?.map(mainCategory => {
            return (
              <MainCategoryMenu key={mainCategory.id}>
                {mainCategory.catergoriesName}
                <SubCategory>
                  {mainCategory.subCatergoriesName.map((subcategory, index) => {
                    return (
                      <SubcategoryMenu key={index}>
                        {subcategory}
                      </SubcategoryMenu>
                    );
                  })}
                </SubCategory>
              </MainCategoryMenu>
            );
          })}
        </MainCategory>
      </CategoryBox>
    );
  }
}

export default NavDetail;

const CategoryBox = styled.div`
  padding-top: 25px;
  background-color: white;
  min-width: 100%;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: fit-content;
  position: fixed;
  top: 47px;
  left: 0;
  z-index: 2000;
  }
`;

const MainCategory = styled.ul`
  display: flex;
`;

const MainCategoryMenu = styled.ul`
  color: black;
  margin: 20px;
`;

const SubCategory = styled.ul`
  width: 110px;
  padding-top: 10px;
`;

const SubcategoryMenu = styled.ul`
  color: gray;
  margin: 10px 0px;
  font-size: 12px;
`;
