import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../Styles/theme';
import axios from 'axios';

const UserData = ({ history }) => {
  const [bookmarkShowAll, setBookmarkShowAll] = useState(false);
  const [likesShowAll, setLikesShowAll] = useState(false);
  const [bookmarkList, setBookmarkList] = useState([]);
  const [likesList, setLikesList] = useState([]);
  const [applyStatus, setApplyStatus] = useState();

  const handleShowAll = target => {
    target === 'bookmark' && setBookmarkShowAll(prevStatus => !prevStatus);
    target === 'likes' && setLikesShowAll(prevStatus => !prevStatus);
  };

  const goToDetail = job => {
    console.log(job);
    history.push(`/detail/${job.id}`);
  };

  //채현님 통신
  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: 'http://10.58.5.159:8000/apply',
  //   }).then(res => {
  //     console.log(res.data.book);
  //     setBookmarkList(res.data.book);
  //     setLikesList(res.data.like);
  //     setApplyStatus(res.data.apply);
  //   });
  // }, []);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/data/forLayout.json',
    }).then(res => {
      setBookmarkList(res.data.book);
      setLikesList(res.data.like);
      setApplyStatus(res.data.apply);
    });
  }, []);

  //목데이터
  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: '/data/myWantedData.json',
  //   }).then(res => {
  //     setBookmarkList(res.data[0].book);
  //     setLikesList(res.data[0].like);
  //     setApplyStatus(res.data[0].apply);
  //   });
  // }, []);

  return (
    <UserDataContainer>
      <ApplicationStatus>
        <Title>지원 현황</Title>
        <ul>
          <li>
            <em>{applyStatus && applyStatus.stepOne}</em>
            <span>지원 완료</span>
          </li>
          <li>
            <em>{applyStatus && applyStatus.stepTwo}</em>
            <span>서류 통과</span>
          </li>
          <li>
            <em>{applyStatus && applyStatus.stepThree}</em>
            <span>최종 합격</span>
          </li>
          <li>
            <em>{applyStatus && applyStatus.stepFour}</em>
            <span>불합격</span>
          </li>
        </ul>
      </ApplicationStatus>
      <div>
        <BookMark showAll={bookmarkShowAll}>
          <Title>북마크</Title>
          <More onClick={() => handleShowAll('bookmark')}>
            총 {bookmarkList.length}개 전체보기
          </More>
          <List bookmark>
            {bookmarkList.map(item => {
              return (
                <ListItem id={item.id} oneLine onClick={() => goToDetail(item)}>
                  <img src={item.image} alt="company logo" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.company}</p>
                    <span>
                      {item.city} . {item.state}
                    </span>
                  </div>
                  <div>
                    <h3>{item.category}</h3>
                    <p>{item.subCategory}</p>
                    <span>마감일 : {item.end}</span>
                  </div>
                  <TagList>
                    {item.tags &&
                      item.tags.map(tag => {
                        return <li>{tag}</li>;
                      })}
                  </TagList>
                </ListItem>
              );
            })}
          </List>
        </BookMark>
        <Likes showAll={likesShowAll}>
          <Title>좋아요</Title>
          <More onClick={() => handleShowAll('likes')}>
            총 {likesList.length}개 전체보기
          </More>
          <List>
            {likesList.map(item => {
              return (
                <ListItem onClick={() => goToDetail(item)}>
                  <img src={item.image} alt="company logo" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.company}</p>
                    <span>
                      {item.city} . {item.state}
                    </span>
                  </div>
                </ListItem>
              );
            })}
          </List>
        </Likes>
      </div>
    </UserDataContainer>
  );
};

const UserDataContainer = styled.div`
  width: 753px;
`;

const ApplicationStatus = styled.div`
  ${theme.WhiteBox}
  width: 100%;
  margin-bottom: 20px;
  padding: 26px 0 34px;
  border-radius: 5px;

  h2 {
    padding-bottom: 30px;
  }

  ul {
    display: flex;
    justify-content: center;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 25%;
      border-right: 1px solid #e1e2e3;

      &:last-child {
        border-right: none;
      }

      em {
        padding-bottom: 11px;
        font-weight: 400;
        font-size: 36px;
        line-height: 1;
      }

      span {
        font-size: 16px;
        line-height: 19px;
      }
    }
  }
`;

const BookMark = styled.div`
  ${theme.WhiteBox}
  position: relative;
  padding: 26px 0 34px;
  border-bottom: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  overflow: hidden;

  & {
    height: ${props => (props.showAll ? 'fit-content' : '330px')};

    & > ul > li {
      &:nth-child(2) {
        margin-bottom: ${props => (props.showAll ? '0' : '20px')};
      }
    }
  }
`;

const Likes = styled.div`
  ${theme.WhiteBox}
  position: relative;
  padding: 26px 0 34px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;

  & {
    height: ${props => (props.showAll ? 'fit-content' : '330px')};

    & > ul > li {
      &:nth-child(3),
      &:nth-child(4) {
        margin-bottom: ${props => (props.showAll ? '0' : '20px')};
      }
    }
  }
`;

const Title = styled.h2`
  padding: 0 32px 10px;
  font-size: 18px;
  font-weight: 700;
`;

const More = styled.span`
  position: absolute;
  top: 26px;
  right: 30px;
  font-size: 14px;
  color: #3366ff;
  cursor: pointer;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0 32px;

  & > li {
    width: ${props => (props.bookmark ? '100%' : '50%')};

    &:nth-child(odd) {
      padding-right: ${props => (props.bookmark ? '0' : '10px')};
    }

    &:nth-child(even) {
      padding-left: ${props => (props.bookmark ? '0' : '10px')};
    }
  }
`;

const ListItem = styled.li`
  display: flex;
  margin-top: 20px;
  color: ${props => props.bookmark && 'red'};
  cursor: pointer;

  img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
    border: 1px solid #e1e2e3;
    border-radius: 3px;
  }

  div {
    &:nth-child(2) {
      width: ${props => props.oneLine && '160px'};
    }

    h3 {
      margin-bottom: 8px;
      font-size: 18px;
      font-weight: 700;
      line-height: 22px;
    }

    p {
      margin-bottom: 10px;
      font-size: 15px;
      font-weight: 700;
      line-height: 22px;
    }

    span {
      display: block;
      font-size: 14px;
      line-height: 15px;
      color: #999;
    }
  }

  div:nth-child(3) {
    width: 124px;
    margin-left: 30px;

    p {
      padding: 0 10px;
      background-color: #e1e2e3;
      border-radius: 2px;
      font-size: 13px;
    }
  }
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  height: min-content;
  padding-left: 20px;

  & > li {
    width: fit-content;
    height: fit-content;
    margin: 0 5px 5px 0;
    padding: 5px 10px;
    background-color: #e1e2e380;
    border-radius: 12px;
    font-size: 13px;
  }
`;

export default withRouter(UserData);
