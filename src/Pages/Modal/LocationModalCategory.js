import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import BoardContext from '../../BoardContext';
import theme from '../../Styles/theme';
import LocationSelector from './LocationSelector';

function LocationModalCategory() {
  const {
    handleLocationModal,
    handleModal,
    locationData: { state },
    locationData: { county },
  } = useContext(BoardContext);

  const [stateList, setStateList] = useState([]);
  const [detailList, setDetailList] = useState([]);

  const handleSelectedState = stateInfo => {
    const validatedState = stateList.find(item => item.id === stateInfo.id);
    !validatedState
      ? setStateList([...stateList, stateInfo])
      : setStateList(prev => {
          const tempList = prev.filter(item => item.id !== stateInfo.id);
          return tempList;
        });
  };

  const handleState = states => {
    setDetailList(states.locationDetail);
  };

  return (
    <ModalItemContainer>
      <LocationContainer>
        <CityContainer>
          <h6>지역</h6>
          <CityItemContainer>
            {state &&
              state.length >= 1 &&
              state.map(cityItem => {
                return (
                  <CityItem key={cityItem.id}>
                    <div onClick={() => handleState(cityItem)}>
                      {cityItem.name}
                    </div>
                  </CityItem>
                );
              })}
          </CityItemContainer>
        </CityContainer>
        <StateContainer>
          <h6>상세지역</h6>
          <StateItemContainer>
            {county &&
              county.length >= 1 &&
              county.map(stateItem => {
                return (
                  <StateItem
                    key={stateItem.id}
                    onClick={() => {
                      handleSelectedState(stateItem);
                    }}
                  >
                    <label htmlFor={stateItem.id}>{stateItem.name}</label>
                    <input type="button" id={stateItem.id} />
                  </StateItem>
                );
              })}
          </StateItemContainer>
        </StateContainer>
      </LocationContainer>
      <LocationSelector
        selectedStateList={stateList}
        handleDelete={handleSelectedState}
      />
      <SubmitBtn
        onClick={() => {
          stateList.length >= 1 && handleLocationModal(stateList);
          stateList.length >= 1 && handleModal(3);
        }}
      >
        확인
      </SubmitBtn>
    </ModalItemContainer>
  );
}

export default LocationModalCategory;

const ModalItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 20px;
  width: 450px;
  height: 80px;
`;

const StateContainer = styled.div`
  width: 30%;

  h6 {
    margin-bottom: 10px;
  }
`;

const StateItemContainer = styled.div``;

const StateItem = styled.div`
  padding: 5px;
  ${theme.border1pxStyle};

  input {
    display: none;
  }

  &:hover,
  &:focus {
    background-color: ${theme.hoverGray};
  }
`;

const CityContainer = styled.div`
  width: 30%;

  h6 {
    margin-bottom: 10px;
  }
`;

const CityItem = styled.div`
  ${theme.border1pxStyle};
  padding: 5px;

  &:hover {
    background-color: ${theme.hoverGray};
  }
`;

const CityItemContainer = styled.div``;

const SubmitBtn = styled.div`
  padding: 10px 30px;
  margin: 30px 80px;
  width: 100px;
  border-radius: 17px;
  text-align: center;
  background-color: ${theme.mainBlue};
`;

const LocationContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;
