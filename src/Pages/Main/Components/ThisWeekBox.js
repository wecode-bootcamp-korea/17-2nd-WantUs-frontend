import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

class ThisWeekBox extends Component {
  goToDetail = id => {
    this.props.history.push(`/detail/${id}`);
    window.scrollTo(0, 0);
  };

  render() {
    const { imageUrl, job, name, state, city, price } = this.props;

    return (
      <PositionContainer onClick={() => this.goToDetail(this.props.id)}>
        <CompanyImage src={imageUrl} />
        <ComapnyBox>
          <Job>{job}</Job>
          <Name>{name}</Name>
          <Address>
            {city}·{state}
          </Address>
          <Reward>채용보상금 {price.toLocaleString()} 원</Reward>
        </ComapnyBox>
      </PositionContainer>
    );
  }
}

export default withRouter(ThisWeekBox);

const PositionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 355px;
  cursor: pointer;
`;

const CompanyImage = styled.img`
  width: 100%;
  height: 160px;
  border-radius: 4px;
`;

const ComapnyBox = styled.div`
  width: 250px;
  height: 148px;
  padding: 14px 10px;
`;

const Job = styled.p`
  line-height: 1.2;
  color: #333;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
`;

const Name = styled.p`
  margin: 4px 0px 0px;
  line-height: 1.6;
  font-size: 14px;
  text-align: left;
`;

const Address = styled.p`
  margin-top: 6px;
  color: #999;
  font-size: 14px;
`;

const Reward = styled.p`
  margin: 10px 0px 0px;
  color: #666666;
  font-size: 13px;
  text-align: left;
`;
