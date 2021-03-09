import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import JobContent from './JobContent';
import styled from 'styled-components';
import { JOB_LIST, Loading_Log } from '../../../../config';

const Job = () => {
  const [jobListData, setJobListData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [message1, setMessage] = useState('');

  const fetchData = async pageNumber => {
    const {
      data: { data },
      data: { message },
    } = await axios({
      method: 'get',
      url: `${JOB_LIST}파이썬 개발자&page=${pageNumber}&per_page=8`,
    });

    setMessage(message);
    if (data) {
      setJobListData(job => [...job, ...data]);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  const loadMore = () => {
    if (message1 !== 'NONE_PAGE') {
      setPageNumber(prev => prev + 1);
    }
  };

  const pageEndPoint = useRef();
  let num = 1;

  const getObserver = () => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          num++;
          loadMore();
          if (num >= 8) {
            observer.unobserve(pageEndPoint.current);
          }
          message1 === 'NONE_PAGE' && observer.disconnect();
        }
      },
      { threshold: [0.2, 0.5, 0.8, 1] },
    );
    observer.observe(pageEndPoint.current);
  };

  useEffect(() => {
    if (isLoading) {
      getObserver();
    }
  }, [isLoading, num]);

  return (
    <Scroll>
      <JobBoardContainer>
        {isLoading &&
          jobListData.map(job => {
            return <JobContent key={job.id} job={job} isLazy />;
          })}
      </JobBoardContainer>
      <Loding className="loading">
        <Button onClick={loadMore} ref={pageEndPoint}>
          More
          <img className="loadingImage" src="Loading_Log" alt="loading" />
        </Button>
      </Loding>
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

const Button = styled.div``;
