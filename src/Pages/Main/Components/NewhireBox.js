import React, { Component } from 'react';
import styled from 'styled-components';

class NewhireBox extends Component {
  goToDetail = id => {
    this.props.history.push(`/detail/${id}`);
  };

  render() {
    const { imageUrl, job, name } = this.props;

    return (
      <PositionContainer onClick={() => this.goToDetail(this.props.id)}>
        <CompanyImage src={imageUrl} />
        <CompanyBox>
          <Name>{name}</Name>
          <Job>{job}</Job>
        </CompanyBox>
      </PositionContainer>
    );
  }
}

export default NewhireBox;

const PositionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 300px;
  cursor: pointer;
`;

const CompanyImage = styled.img`
  width: 100%;
  height: 160px;
  border-radius: 4px;
`;

const CompanyBox = styled.div`
  width: 250px;
  height: 50px;
  padding: 14px 10px;
`;

const Name = styled.p`
  line-height: 1.2;
  color: #333;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
`;

const Job = styled.p`
  margin-top: 6px;
  color: #999;
  font-size: 14px;
`;
