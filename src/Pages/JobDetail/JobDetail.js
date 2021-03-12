import React, { useState, useEffect, useContext } from 'react';
import JobList from './components/JobList/JobList';
import styled from 'styled-components';
import axios from 'axios';
import { FaRegBookmark, FaBookmark, FaHeart } from 'react-icons/fa';
import theme from '../../Styles/theme';
import BoardContext from '../../BoardContext';
import { JOB_DETAIL, RESUME_API, APPLY } from '../../config';

const JobDetail = ({ history, match }) => {
  const [jobDetailData, setJobDetailData] = useState([]);
  const [onApplying, setApply] = useState(false);
  const [uploadFile, setUploadFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [pdfUrl, setPdfUrl] = useState();
  const [bookmark, setBookmark] = useState();
  const [like, setLike] = useState();
  const [numberOfLike, setNumberOfLike] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPhoneNumber, setUserPhoneNumber] = useState();
  const { handleModal } = useContext(BoardContext);

  useEffect(() => {
    const token = sessionStorage.getItem('access_token') && {
      Authorization: sessionStorage.getItem('access_token'),
    };

    axios({
      method: 'GET',
      url: `${JOB_DETAIL}/${match.params.id}`,
      headers: token,
    }).then(res => {
      setJobDetailData(res.data.data[0]);
      setBookmark(res.data.data[0].userBookmark);
      setLike(res.data.data[0].userLike);
      setNumberOfLike(res.data.data[0].like);
      setUserName(res.data.data[0].user);
      setUserEmail(res.data.data[0].userEmail);
      setUserPhoneNumber(res.data.data[0].userPhone);
    });
  }, []);

  const handleBookmark = () => {
    if (!sessionStorage.getItem('access_token')) {
      handleModal(4);
      return;
    }

    axios({
      method: 'POST',
      url: `${JOB_DETAIL}/bookmark/${match.params.id}`,
      headers: {
        Authorization: sessionStorage.getItem('access_token'),
      },
    }).then(res => {
      setBookmark(prevStatus => !prevStatus);
    });
  };

  const handleLike = () => {
    if (!sessionStorage.getItem('access_token')) {
      handleModal(4);
      return;
    }

    axios({
      method: 'POST',
      url: `${JOB_DETAIL}/like/${match.params.id}`,
      headers: {
        Authorization: sessionStorage.getItem('access_token'),
      },
    }).then(res => {
      setLike(prevStatus => !prevStatus);
      like
        ? setNumberOfLike(like => like - 1)
        : setNumberOfLike(like => like + 1);
    });
  };

  const handleApply = () => {
    if (!sessionStorage.getItem('access_token')) {
      handleModal(4);
      return;
    }
    setApply(prevStatus => !prevStatus);
  };

  const addFile = e => {
    const file = e.target.files[0];

    setUploadFile(file.name);
    setSelectedFile(file);
  };

  const handlePost = () => {
    const formData = new FormData();
    formData.append('resume', selectedFile);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: sessionStorage.getItem('access_token'),
      },
    };

    return axios
      .post(`${RESUME_API}/upload`, formData, config)
      .then(res => {
        setPdfUrl(res.data.data);
        alert('성공');
        postApply();
      })
      .catch(err => {
        alert('실패');
      });
  };

  const postApply = () => {
    axios({
      method: 'POST',
      url: `${APPLY}`,
      headers: {
        Authorization: sessionStorage.getItem('access_token'),
      },
      data: {
        posting: match.params.id,
      },
    });
  };

  const goToCV = () => {
    history.push('/cv');
  };

  return (
    <DetailPage>
      <DetailSection>
        <article>
          <div>
            <img src={jobDetailData.image} alt="job image" />
          </div>
          <h2>{jobDetailData.title}</h2>
          <div>
            <span>{jobDetailData.company}</span>
            <span>응답률 평균 이상</span>
            <span>
              {jobDetailData.city} · {jobDetailData.district}
            </span>
          </div>
          <TagList>
            {jobDetailData.tags &&
              jobDetailData.tags.map(tag => {
                return <li>{tag}</li>;
              })}
          </TagList>
          <Description>
            <div
              dangerouslySetInnerHTML={{ __html: jobDetailData.description }}
            ></div>
          </Description>
          <Map>
            <ul>
              <li>
                <span>마감일</span>
                <span>{jobDetailData.deadline}</span>
              </li>
              <li>
                <span>근무지역</span>
                <span>
                  {jobDetailData.city} {jobDetailData.district}{' '}
                  {jobDetailData.detailAddress}
                </span>
              </li>
            </ul>
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?language=ko&zoom=14&size=700x254&markers=color:red|${jobDetailData.latitude},${jobDetailData.longitude}&key=AIzaSyAJlf7syl_651cgegVuXoh1jKX9MlA7bIw`}
              alt="location"
            />
          </Map>
          <CompanyInfo>
            <img src={jobDetailData.logoSrc} alt="company logo" />
            <div>
              <span>{jobDetailData.company}</span>
              <span>{jobDetailData.category}</span>
            </div>
            <button>팔로우</button>
          </CompanyInfo>
        </article>
        {!onApplying && (
          <Box>
            <h3>채용보상금</h3>
            <ul>
              <li>
                <h4>추천인</h4>
                <p>{(jobDetailData.bonus / 2).toLocaleString()} 원</p>
              </li>
              <li>
                <h4>지원자</h4>
                <p>{(jobDetailData.bonus / 2).toLocaleString()} 원</p>
              </li>
            </ul>
            <Button
              color={'#3366ff'}
              bgColor={'white'}
              onClick={handleBookmark}
            >
              {bookmark ? (
                <div>
                  <FaBookmark className="icon" /> 북마크
                </div>
              ) : (
                <div>
                  <FaRegBookmark className="icon" /> 북마크하기
                </div>
              )}
            </Button>
            <Button color={'white'} bgColor={'#3366ff'} onClick={handleApply}>
              지원하기
            </Button>
            <LikeBtn onClick={handleLike} like={like}>
              <FaHeart className="heart" />
              <span>{numberOfLike}</span>
            </LikeBtn>
          </Box>
        )}
        {onApplying && (
          <ApplyBox>
            <header>
              <h2>지원하기</h2>
              <span onClick={handleApply}>뒤로</span>
            </header>
            <div>
              <h3>지원 정보</h3>
              <ul>
                <li>
                  <span>이름</span>
                  <input value={userName} type="text" />
                </li>
                <li>
                  <span>이메일</span>
                  <input value={userEmail} type="email" />
                </li>
                <li>
                  <span>연락처</span>
                  <input value={userPhoneNumber} type="tel" />
                </li>
              </ul>
              <h3>첨부파일</h3>
              {/* {pdfUrl && (
                <a target="_blank" href={pdfUrl}>
                  pdf
                </a>
              )} */}
              {uploadFile && (
                <a target="_blank" href={pdfUrl}>
                  {uploadFile} <span>{pdfUrl ? '제출완료' : '작성 중...'}</span>
                </a>
              )}
              <form action="">
                <div>
                  <button disabled type="button">
                    파일 업로드
                  </button>
                  <input type="file" onChange={addFile} />
                </div>
                <div onClick={goToCV}>새 이력서 작성</div>
                <footer>
                  <button onClick={handlePost} type="button">
                    제출하기
                  </button>
                </footer>
              </form>
            </div>
            {/* <footer>
              <button disabled>제출하기</button>
            </footer> */}
          </ApplyBox>
        )}
      </DetailSection>
      <Suggest>
        <h5>
          {jobDetailData.user !== null && (
            <>
              <span>{jobDetailData.user}</span>
              <span> 님, </span>
            </>
          )}
          이 포지션을 찾고 계셨나요?
        </h5>
        <JobList />
      </Suggest>
    </DetailPage>
  );
};

export default JobDetail;

const ApplyBox = styled.div`
  position: sticky;
  top: 70px;
  width: 340px;
  height: fit-content;

  border: 1px solid #e1e2e3;
  border-radius: 3px;

  header {
    position: relative;
    width: 100%;
    padding: 15px 20px 13px;
    border-bottom: 1px solid #e1e2e3;
    text-align: center;

    h2 {
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
    }

    span {
      position: absolute;
      right: 20px;
      top: 15px;
      color: #999999;
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
      cursor: pointer;
    }
  }

  & > div {
    padding-top: 20px;
    /* overflow: scroll;
    height: 450px; */

    h3 {
      width: 100%;
      padding-left: 20px;
      margin-bottom: 20px;
      border-left: 2px solid #258bf7;
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
    }

    ul {
      width: 100%;
      padding: 0 20px;
      margin-bottom: 30px;

      li {
        border-bottom: 1px solid #e1e2e3;

        span {
          display: inline-block;
          width: 80px;
          font-size: 16px;
          font-weight: 600;
          line-height: 50px;
        }

        input {
          width: 200px;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          outline: none;

          &:focus {
            outline: none;
          }
        }
      }
    }

    & > a {
      display: inline-block;
      width: 298px;
      height: 40px;
      margin: 0 20px;
      background-color: #f2f4f7;
      color: #767676;
      font-weight: 900;
      font-size: 14px;
      margin-bottom: 20px;
      border-radius: 5px;
      text-align: center;
      line-height: 40px;
      text-decoration: none;

      span {
        display: inline-block;
        font-size: 10px;
        color: #76767670;
        transform: translate(3px, -1px);
      }
    }

    form {
      div {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 298px;
        margin: 0 20px;
        height: 54px;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 600;
        border: 1px solid #e1e2e3;
        border-radius: 27px;
        /* cursor: pointer; */

        &:active,
        &:focus {
          outline: none;
        }

        button {
          position: absolute;
          top: 26px;
          transform: translateY(-50%);
          color: #666666;
          font-size: 14px;
          font-weight: 600;
          border: none;
          background-color: inherit;
        }

        input {
          width: 298px;
          height: 54px;
          border-radius: 27px;
          position: relative;
          top: -10px;
          opacity: 0;
          cursor: pointer;
        }
      }

      div:last-child {
        padding-top: 0;
        margin-bottom: 30px;
        color: #666666;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }

  footer {
    width: 100%;
    padding: 24px 20px;
    border-top: 1px solid #ececec;

    button {
      width: 298px;
      height: 54px;
      border: none;
      border-radius: 27px;
      font-size: 16px;
      font-weight: 600;
      background-color: #3366ff;
      color: #ffffff;

      &:disabled {
        background-color: #f2f4f7;
        color: #cccccc;
      }
    }
  }
`;

const DetailPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  color: #333333;
`;

const DetailSection = styled.section`
  padding-top: 50px; /* Nav check! */
  display: flex;

  article {
    margin-right: 20px;
    /* width: 575px; */
    width: 640px;
    height: fit-content; /* for checking sticky */

    & > div:first-child {
      width: 100%;
      height: 400px;
      margin-bottom: 40px;
      border-radius: 5px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }

    h2 {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    div:nth-child(3) {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      span:nth-child(1) {
        margin-right: 10px;
        font-size: 14px;
        font-weight: 600;
        line-height: 1.4;
      }

      span:nth-child(2) {
        display: inline-block;
        margin-right: 10px;
        padding: 5px;
        color: #855af0;
        border: 1px solid #855af0;
        border-radius: 2px;
        font-size: 10px;
        font-weight: 600;
      }

      span:nth-child(3) {
        position: relative;
        padding-left: 10px;
        color: #999999;
        font-size: 14px;

        &::before {
          content: '';
          display: block;
          position: absolute;
          top: 0px;
          left: 0;
          width: 1px;
          height: 12px;
          background-color: #e1e2e3;
        }
      }
    }
  }
`;

const TagList = styled.ul`
  ${theme.TagUl}

  li {
    ${theme.TagLi}
  }
`;

const Box = styled.aside`
  position: sticky;
  top: 70px;
  padding: 24px 20px;
  width: 340px;
  height: 324px;
  border: 1px solid #e1e2e3;
  border-radius: 3px;

  h3 {
    margin-bottom: 20px;
    font-size: 15px;
    font-weight: 600;
  }

  ul {
    display: flex;
    margin-bottom: 30px;

    li {
      width: 50%;

      h4 {
        font-size: 14px;
        font-weight: 600;
        color: #999999;
        margin-bottom: 8px;
        line-height: 1.2;
      }

      p {
        font-size: 15px;
        font-weight: 900;
      }
    }
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 54px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  border: 1px solid #3366ff;
  border-radius: 27px;
  cursor: pointer;

  &:active,
  &:focus {
    outline: none;
  }

  .icon {
    margin-right: 5px;
  }
`;

const LikeBtn = styled.button`
  display: flex;
  align-items: center;
  margin-top: 23px;
  height: 30px;
  border: 1px solid #e1e2e3;
  border-radius: 15px;
  padding: 0 15px;
  background-color: inherit;
  cursor: pointer;

  .heart {
    margin-right: 10px;
    color: ${props => (props.like ? '#red' : '#d6d6d6')};
    font-size: 14px;
  }

  span {
    font-size: 14px;
    font-weight: 600;
    line-height: 30px;
  }
`;

const Description = styled.div`
  & > div {
    font-size: 16px;
    line-height: 1.7;

    p {
      margin-bottom: 25px;
    }

    ul {
      margin-bottom: 25px;

      &:last-child {
        margin-bottom: 80px;
      }

      h4 {
        font-weight: 600;
      }

      li {
        &::before {
          display: inline-block;
          position: relative;
          top: -4px;

          width: 4px;
          height: 4px;
          margin-right: 6px;
          border-radius: 50%;
          background-color: #333333;
          content: '';
        }
      }
    }
  }
`;

const Map = styled.div`
  padding-top: 30px;
  border-top: 1px solid #eeeeee;
  margin-bottom: 70px;

  ul {
    li {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 20px;

      span:first-child {
        display: inline-block;
        width: 80px;
        color: #999999;
      }

      span:last-child {
      }
    }
  }

  img {
    width: 100%;
  }
`;

const CompanyInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 20px;
  /* margin-bottom: 100px; */
  border: 1px solid #e1e2e3;
  border-radius: 3px;

  img {
    width: 50px;
    height: 50px;
    margin-right: 15px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;

    span:first-child {
      margin-bottom: 7px;
      font-size: 15px;
      font-weight: 600;
    }

    span:last-child {
      color: #999999;
      font-size: 15px;
      font-weight: 600;
    }
  }

  button {
    background-color: #258bf7;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 30px;
    border: none;
    border-radius: 3px;
    position: absolute;
    right: 20px;
  }
`;

const Suggest = styled.section`
  /* width: 935px; */
  width: 1000px;
  /* height: 200vh; */
  margin-top: 80px;
  /* background: whitesmoke; */

  h5 {
    margin-bottom: 25px;
    font-size: 20px;
    font-weight: 600;

    span:first-child {
      font-weight: 800;
    }
  }
`;
