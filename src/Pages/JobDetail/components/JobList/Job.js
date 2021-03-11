import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

const Job = ({ lastJobElementRef = null, job, history }) => {
  const goToDetailPage = job => {
    history.push(`/detail/${job.id}`);
    window.location.reload(true);
    window.scrollTo(0, 0);
  };

  return (
    <JobCard
      ref={lastJobElementRef}
      key={job.id}
      onClick={() => goToDetailPage(job)}
    >
      <header>
        <Image src={job.image}></Image>
        <button>
          <FaHeart className="icon" />
          {job.like}
        </button>
      </header>
      <p>{job.title}</p>
      <p>{job.company}</p>
      <p>
        {job.city} · {job.nation}
      </p>
      <p>채용보상금 {job.bonus.toLocaleString()}원</p>
    </JobCard>
  );
};

export default withRouter(Job);

const Image = styled.div`
  background: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 235px;
  height: 170px;
  margin-bottom: 15px;
  border-radius: 4px;
`;

const JobCard = styled.div`
  width: 235px;
  margin-right: 20px;
  margin-bottom: 80px;
  cursor: pointer;

  &:nth-child(4n) {
    margin-right: 0;
  }

  header {
    position: relative;

    img {
      width: 235px;
      height: 170px;
      margin-bottom: 15px;
      border-radius: 4px;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 10px;
      right: 10px;
      width: 60px;
      height: 30px;
      border: none;
      border-radius: 3px;
      background: rgba(0, 0, 0, 0.3);
      color: #ffffff;
      font-size: 12px;
      font-weight: 400;

      .icon {
        margin-right: 6px;
      }
    }
  }

  p:nth-child(2) {
    margin-bottom: 4px;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.2;
  }

  p:nth-child(3) {
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.6;
  }

  p:nth-child(4) {
    margin-bottom: 8px;
    color: #999999;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
  }

  p:nth-child(5) {
    font-size: 13px;
    font-weight: 400;
  }
`;
