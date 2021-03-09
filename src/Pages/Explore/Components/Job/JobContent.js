import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../../../Styles/theme';
import { AiTwotoneHeart } from 'react-icons/ai';

const JobContent = ({ job, isLazy }) => {
  return (
    <JobItem key={job.id}>
      <div className="wholeWrapper">
        <JobImage img={job.img} className={isLazy ? 'lazy' : ''}>
          <Like>
            <AiTwotoneHeart />
            <div>{job.like}</div>
          </Like>
        </JobImage>
        <Title>{job.title}</Title>
        <Company>{job.company}</Company>
        <div className="wrapper">
          <City>
            {job.state} <span>.</span>
          </City>
          <Nation>{job.county}</Nation>
        </div>
        <Bonus>채용보상금 {Number(job.reward).toLocaleString()}원</Bonus>
      </div>
    </JobItem>
  );
};

export default JobContent;

const JobItem = styled.div`
  width: 250px;
  height: 350px;

  .wholeWrapper {
    position: relative;
    margin: 0 10px;

    .wrapper {
      display: flex;
    }
  }
`;

const JobImage = styled.div`
  position: relative;
  margin-bottom: 17px;
  width: 250px;
  height: 180px;
  background: url(${props => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 8px;
`;

const Like = styled.div`
  display: flex;
  position: absolute;
  width: 70px;
  height: 30px;
  top: 15px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.3);
  color: ${theme.white};
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const Company = styled.div`
  position: relative;
  margin-bottom: 14px;
  font-size: 14px;
  font-weight: bold;
`;

const City = styled.p`
  ${theme.cityStyle};
  color: ${theme.darkGray};
`;

const Nation = styled.p`
  ${theme.cityStyle};
  color: ${theme.darkGray};
`;

const Bonus = styled.div`
  font-size: 13px;
  color: ${theme.darkGray};
`;

const ResponseRate = styled.div``;

const HightRate = styled.p`
  display: inline-block;
  padding: 5px;
  margin-bottom: 6px;
  border: 1.7px solid ${theme.crayonGreen};
  color: ${theme.crayonGreen};
  border-radius: 5px;
  font-size: 10px;
`;
