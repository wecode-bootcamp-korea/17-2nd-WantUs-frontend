import React, { Component } from 'react';
import AcceptedPositionBox from './AcceptedPositionBox';
import CareerBox from './CareerBox';
import NewhireBox from './NewhireBox';
import ThemeBox from './ThemeBox';
import ThisWeekBox from './ThisWeekBox';

import styled from 'styled-components';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { MAIN } from '../../../config';

class Positions extends Component {
  constructor() {
    super();
    this.state = {
      acceptList: [],
      newList: [],
      thisweekList: [],
      careerList: [],
      themeList: [],
    };
  }

  componentDidMount() {
    fetch(`${MAIN}`, {
      method: 'GET',
      headers: {
        Authorization: sessionStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(res => this.setDatas(res));

    fetch('data/CareerData.json')
      .then(res => res.json())
      .then(res => this.setMockDatas(res));
  }

  setDatas = res => {
    this.setState({
      acceptList: res['likePosting'],
      newList: res['new'],
      thisweekList: res['thisWeek'],
    });
  };

  setMockDatas = res => {
    this.setState({
      careerList: res['career'],
      themeList: res['theme'],
    });
  };

  render() {
    return (
      <PositionContainer>
        <Title>
          wanted 합격예측 포지션
          <AiOutlineQuestionCircle size="25" color="gray" className="icon" />
        </Title>
        <PositionBox>
          {this.state.acceptList &&
            this.state.acceptList.map(acceptList => {
              return (
                <AcceptedPositionBox
                  key={acceptList.id}
                  id={acceptList.id}
                  imageUrl={acceptList.imageUrl}
                  job={acceptList.job}
                  name={acceptList.name}
                  city={acceptList.city}
                  state={acceptList.state}
                  price={acceptList.price}
                />
              );
            })}
        </PositionBox>
        <Title>커리어 성장의 기회</Title>
        <PositionBox>
          {this.state.careerList.map(careerList => {
            return (
              <CareerBox
                key={careerList.id}
                id={careerList.id}
                imageUrl={careerList.imageUrl}
                title={careerList.title}
              />
            );
          })}
        </PositionBox>
        <Title>신규 채용 회사</Title>
        <PositionBox>
          {this.state.newList.map(newList => {
            return (
              <NewhireBox
                key={newList.id}
                id={newList.id}
                imageUrl={newList.imageUrl}
                job={newList.job}
                name={newList.name}
              />
            );
          })}
        </PositionBox>
        <Title>테마별 채용</Title>
        <PositionBox>
          {this.state.themeList.map(themeList => {
            return (
              <ThemeBox
                key={themeList.id}
                id={themeList.id}
                imageUrl={themeList.imageUrl}
                context={themeList.context}
                title={themeList.title}
                sub={themeList.sub}
              />
            );
          })}
        </PositionBox>
        <Title>금주의 추천</Title>
        <PositionBox>
          {this.state.thisweekList.map(thisweekList => {
            return (
              <ThisWeekBox
                key={thisweekList.id}
                id={thisweekList.id}
                imageUrl={thisweekList.imageUrl}
                job={thisweekList.job}
                name={thisweekList.name}
                city={thisweekList.city}
                state={thisweekList.state}
                price={thisweekList.price}
              />
            );
          })}
        </PositionBox>
      </PositionContainer>
    );
  }
}

export default Positions;

const PositionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Title = styled.h2`
  display: inline-block;
  padding: 0;
  margin-bottom: 20px;
  line-height: 1.05;
  color: #333;
  font-size: 22px;
  font-weight: 600;
  text-align: left;
  letter-spacing: normal;

  .icon {
    position: absolute;
    margin-left: 8px;
  }
`;

const PositionBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1000px;
`;
