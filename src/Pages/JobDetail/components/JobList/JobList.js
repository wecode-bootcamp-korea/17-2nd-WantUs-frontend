import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import Job from './Job';

const JobList = ({ match }) => {
  const [jobListData, setJobListData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef();

  const lastJobElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('Visible ✅');
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  //백엔드 통신 데이터
  useEffect(() => {
    setLoading(true);

    axios({
      method: 'GET',
      url: `http://172.30.1.55:8000/posting/pagination/${match.params.id}`,
      params: { page: pageNumber },
    }).then(res => {
      console.log(res);
      console.log(pageNumber);
      console.log(res.data.data);

      setJobListData(prevJobs => [...prevJobs, ...res.data.data]);
      setHasMore(res.data.data.length > 0);
      setLoading(false);
    });
  }, [pageNumber]);

  //mockdata
  // useEffect(() => {
  //   setLoading(true);

  //   axios({
  //     method: 'GET',
  //     url: '/data/JobData.json',
  //     params: { page: pageNumber },
  //   }).then(res => {
  //     console.log(res);
  //     console.log(pageNumber);
  //     console.log(res.data.data);
  //     console.log(res.data);
  //     setJobListData(prevJobs => [...prevJobs, ...res.data]);
  //     setHasMore(res.data.length > 0);
  //     setLoading(false);
  //   });
  // }, [pageNumber]);

  return (
    <>
      <JobContainer>
        {jobListData.map((job, index) => {
          if (jobListData.length === index + 1) {
            return <Job lastJobElementRef={lastJobElementRef} job={job} />;
          } else {
            return <Job job={job} />;
          }
        })}
        {/* <Loading>{loading && 'Loading...'}</Loading> */}
      </JobContainer>
      <Loading>{loading && 'More...'}</Loading>
    </>
  );
};

const Loading = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 700;
  padding-bottom: 40px;
`;

const JobContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`;

export default withRouter(JobList);
