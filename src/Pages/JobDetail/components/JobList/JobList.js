import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import Job from './Job';
import { JOB_DETAIL } from '../../../../config';

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
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'GET',
      url: `${JOB_DETAIL}/${match.params.id}/related-posting`,
      params: { page: pageNumber },
    }).then(res => {
      setJobListData(prevJobs => [...prevJobs, ...res.data.data]);
      setHasMore(res.data.data.length > 0);
      setLoading(false);
    });
  }, [pageNumber]);

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
