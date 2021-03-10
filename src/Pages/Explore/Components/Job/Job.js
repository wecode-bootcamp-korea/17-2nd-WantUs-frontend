import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import JobContent from './JobContent';
import styled from 'styled-components';
import { JOB_LIST, Loading_Log } from '../../../../config';
import BoardContext from '../../../../BoardContext';

const Job = () => {
  const { postingData } = useContext(BoardContext);

  return (
    <Scroll>
      <JobBoardContainer>
        {postingData.map(job => {
          return <JobContent key={job.id} job={job} />;
        })}
      </JobBoardContainer>
    </Scroll>
  );
};

export default Job;

const JobBoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 20px;
  border-radius: 10px;
`;

const Scroll = styled.div`
  margin-right: 30px;
`;

const Loding = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;

  .loadingImage {
    width: 50px;
    height: 50px;
  }
`;
