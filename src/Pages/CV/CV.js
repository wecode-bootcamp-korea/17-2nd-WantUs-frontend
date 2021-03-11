import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { RiFileWordLine } from 'react-icons/ri';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { VscFiles } from 'react-icons/vsc';
import { BsUpload } from 'react-icons/bs';
//추가 구현 사항
// import { BiDotsVerticalRounded } from 'react-icons/bi';
// import { GoFile } from 'react-icons/go';
import axios from 'axios';

class CV extends React.Component {
  constructor() {
    super();
    this.state = {
      cvList: [],
      selectedFile: null,
      deleteUrl: [],
      image: '',
      uploadFile: false,
      pdfUrl: '',
    };
  }

  componentDidMount() {
    this.handleData();
  }
  handleData(e) {
    fetch('http://10.58.2.45:8000/resume', {
      // 백엔드 통신 요청
      // fetch(`http://10.58.2.240:8000/product/${this.props.match.params.id}`)
      // fetch('data/CVData.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        console.log({ res });
        this.setState({
          cvList: res.result,
        });
      });
  }
  goToWrite = id => {
    this.props.history.push(`/cv/write/${id}`);
  };

  delete = async (info, e) => {
    e.stopPropagation();
    // mock data 사용시 필요한 코드
    // const remainItem = this.state.cvList.filter(cv => {
    //   return info.id !== cv.id;
    // });

    await fetch(`http://10.58.2.45:8000/resume/${info}`, {
      method: 'DELETE',
      // head사용시 필요한 코드
      // headers: {
      //   Authorization: localStorage.getItem('accessToken'),
      // },
    }).then(response => response.json());
    this.handleData();

    // mock data 사용시 필요한 코드
    // this.setState({
    //   cvList: remainItem,
    // });
  };

  showPDF = url => {
    this.handleData();
    setTimeout(() => window.open(url), 2000);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedFile !== this.state.selectedFile) {
      const formData = new FormData();
      formData.append('resume', this.state.selectedFile);
      fetch(`http://10.58.2.45:8000/resume/upload`, {
        method: 'POST',
        // headers: {
        //   Authorization: localStorage.getItem('accessToken'),
        // },
        body: formData,
      })
        .then(response => response.json())
        .then(({ data }) => this.showPDF(data));
    }
  }

  handleFileInput(e) {
    this.setState({
      selectedFile: e.target.files[0],
    });
  }

  sendResume = () => {
    fetch(`http://10.58.2.45:8000/resume`, {
      method: 'POST',

      // head사용시 필요한 코드
      // headers: {
      //   Authorization: localStorage.getItem('accessToken'),
      // },
      body: JSON.stringify({
        resumeView: this.state.cvList.filter(info => info.id),
      }),
    })
      .then(response => response.json())
      .then(res => this.goToWrite());
  };

  render() {
    console.log(this.state.cvList);

    return (
      <MainContainer>
        <CVContainer>
          <TitleBox>
            <RecentTitle>최근 문서</RecentTitle>
            <ResemeInfo>
              원티드 이력서 소개
              <AiOutlineInfoCircle size="18" color="#258BF7" className="icon" />
            </ResemeInfo>
          </TitleBox>
          <CVBox>
            <NewComming>
              {this.state.cvList.map((info, index) => {
                if (index === 0) {
                  return (
                    <>
                      {' '}
                      <AlreadyExist>
                        <ResumeBox
                          onClick={() => {
                            this.sendResume();
                          }}
                        >
                          <ResumeRound>
                            <VscFiles size="25" color="white" />
                          </ResumeRound>
                          새 이력서 작성
                        </ResumeBox>
                        <ResumeBox>
                          <input
                            type="file"
                            name="file"
                            onChange={e => this.handleFileInput(e)}
                          />
                          <NewRound>
                            <BsUpload size="25" />
                          </NewRound>
                          파일 업로드
                        </ResumeBox>
                      </AlreadyExist>
                      <MatchUp
                        onClick={
                          info.status === '첨부파일'
                            ? () => {}
                            : () => this.goToWrite(info.id)
                        }
                        key={info.id}
                        id={info.id}
                      >
                        <h3>{info.name}</h3>
                        <Date>{info.date}</Date>
                        {info.matchUp && <Title>매치업 이력서</Title>}
                        {!info.matchUp && <TitleNo>추가 이력서</TitleNo>}
                        <hr />
                        <Writing>
                          <RiFileWordLine size="22" className="wordicon" />
                          <p>{info.status}</p>
                          <Delete onClick={e => this.delete(info.id, e)}>
                            <RiDeleteBin5Fill
                              size="22"
                              color="gray"
                              className="icondot"
                            />
                          </Delete>
                        </Writing>
                      </MatchUp>
                    </>
                  );
                }
                return (
                  <MatchUp
                    onClick={
                      info.status === '첨부파일'
                        ? () => {}
                        : () => this.goToWrite(info.id)
                    }
                    key={info.id}
                    id={info.id}
                  >
                    <h3>{info.name}</h3>
                    <Date>{info.date}</Date>
                    {info.matchUp && <Title>매치업 이력서</Title>}
                    {!info.matchUp && <TitleNo>추가 이력서</TitleNo>}
                    <hr />
                    <Writing>
                      <RiFileWordLine size="22" className="wordicon" />
                      <p>{info.status}</p>
                      <Delete onClick={e => this.delete(info.id, e)}>
                        <RiDeleteBin5Fill
                          size="22"
                          color="gray"
                          className="icondot"
                        />
                      </Delete>
                    </Writing>
                  </MatchUp>
                );
              })}
            </NewComming>
            {/* 추가구현사항 */}
            {/* <MatchUp>
              <AttachedFile>WantUs_resume</AttachedFile>
              <Day>2021. 03. 02</Day>
              <hr />
              <Writing>
                <GoFile size="22" className="wordicon" color="black" />
                <Attached>첨부 완료</Attached>
                <BiDotsVerticalRounded
                  size="22"
                  className="icondot"
                  color="black"
                />
              </Writing>
            </MatchUp> */}
          </CVBox>
        </CVContainer>
      </MainContainer>
    );
  }
}

export default withRouter(CV);

const MainContainer = styled.div`
  padding-top: 50px;
  min-height: 1000px;
  height: fit-content;
  background-color: #f8f8fa;
`;

const CVContainer = styled.div`
  margin: 35px auto;
  width: 1000px;
  height: auto;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;

  .icon {
    margin-left: 8px;
  }
`;

const RecentTitle = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
`;

const ResemeInfo = styled(RecentTitle)`
  color: #258bf7;
`;

const CVBox = styled.div`
  position: relative;
  margin-top: 20px;
`;

const AlreadyExist = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  padding-right: 13px;
  margin-right: 16px;
`;

const NewComming = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  position: absolute;
  top: 0px;
  width: 1100px;
`;

const ResumeBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 230px;
  height: 188px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid lightgray;
  font-weight: bold;
  z-index: 200;
  cursor: pointer;

  input {
    position: absolute;
    height: 178px;
    width: 238px;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
  }
`;

const MatchUp = styled.div`
  padding: 20px 20px 5px 20px;
  width: 230px;
  height: 188px;
  margin-right: 27px;
  margin-bottom: 25px;
  border-radius: 4px;
  border: 1px solid lightgray;
  background-color: white;
  cursor: pointer;
  &:first-child {
    margin-left: 514px;
  }

  h3 {
    line-height: 1.33;
    color: #999999;
    text-align: left;
    font-size: 18px;
    font-weight: bold;
  }

  hr {
    height: 1px;
    background-color: lightgray;
    border: none;
  }
`;

const ResumeRound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 74px;
  height: 74px;
  margin-bottom: 15px;
  background-color: #258bf7;
  border-radius: 50%;
  border: none;
`;

const NewRound = styled(ResumeRound)`
  background-color: #e1e2e3;
`;

const Date = styled.p`
  margin-top: 5px;
  color: #999999;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
`;

const Title = styled.p`
  margin-top: 5px;
  margin-bottom: 60px;
  color: #258bf7;
  font-weight: 600;
  font-size: 16px;
  text-align: left;
`;

const TitleNo = styled(Title)`
  color: gray;
`;

const Writing = styled.p`
  position: relative;
  line-height: 20px;
  color: #999999;
  font-size: 16px;
  font-weight: 600;
  text-align: left;

  .wordicon {
    position: absolute;
    top: 8px;
  }

  p {
    position: absolute;
    top: 9px;
    left: 30px;
  }
`;
const Delete = styled.button`
  width: 20px;
  height: 40px;
  margin-left: 165px;
  background-color: white;
  border: none;
  z-index: 1;
  outline: none;
  cursor: pointer;
`;

const Day = styled.p`
  margin-top: 5px;
  margin-bottom: 80px;
  color: #999999;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
`;

const Attached = styled.p`
  color: black;
`;

const AttachedFile = styled.p`
  line-height: 1.33;
  color: black;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
`;
