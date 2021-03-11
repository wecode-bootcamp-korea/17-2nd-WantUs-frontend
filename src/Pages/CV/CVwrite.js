import React from 'react';
import styled from 'styled-components';
import { HiDownload } from 'react-icons/hi';
import CVwriteBottom from './CVwriteBottom';
import CVdetail from './CVdetail';

class CVwrite extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '자기소개서',
      name: '이름',
      email: '@wecode.com',
      phone: '010-1234-5678',
      intro: '간단한 자기소개를 입력하세요',
      cvwriteList: [],
      cvIntro: [],
    };
  }

  componentDidMount() {
    //백엔드 통신 요청
    fetch(`http://10.58.2.45:8000/resume/${this.props.match.params.id}`, {
      method: 'GET',
    })
      // fetch(`http://10.58.1.89:8000/product/${this.props.match.params.id}`)
      // fetch('/data/CVwriteData.json', {
      //   method: 'GET',
      // })
      .then(res => res.json())
      .then(res => {
        this.setState({
          cvwriteList: res.result.userInfo,
          cvIntro: res.result,
          title: res.result.resumeTitle,
          name: res.result.userInfo.name,
          email: res.result.userInfo.email,
          phone: res.result.userInfo.phoneNumber,
          intro: res.result.resumeIntro,
        });
      });
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <MainContainer>
        <ResumeBox>
          <TopContents>
            <Language>
              <option value="KR">한국어</option>
              <option value="JP">일본어</option>
              <option value="CH">중국어</option>
              <option value="EN">영어</option>
            </Language>
            <Download>
              <HiDownload size="17px" color="#999" />
            </Download>
          </TopContents>
          <MidContents>
            <TitleName
              value={this.state.title}
              onChange={this.handleInput}
              name="title"
            />
            <Input
              value={this.state.name}
              onChange={this.handleInput}
              name="name"
            />
            <Input
              value={this.state.email}
              onChange={this.handleInput}
              name="email"
            />
            <Input
              value={this.state.phone}
              onChange={this.handleInput}
              name="phone"
            />
            <p>간단 소개글</p>
            <hr />
            <Input
              value={this.state.intro}
              onChange={this.handleInput}
              name="intro"
            />
          </MidContents>
          <CVdetail />
        </ResumeBox>
        <CVwriteBottom />
      </MainContainer>
    );
  }
}

export default CVwrite;

const MainContainer = styled.div`
  padding-top: 50px;
  background-color: white;
`;

const ResumeBox = styled.div`
  margin: 25px auto 100px;
  width: 1000px;
  height: fit-content;
`;

const TopContents = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1000px;
`;

const Language = styled.select`
  width: 100px;
  height: 38px;
  padding: 2px;
  border: 1px solid #999;
  border-radius: 4px;
  text-align: center;
  text-align-last: center;
`;

const Download = styled.button`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #999;
  outline: none;
  cursor: pointer;
`;

const MidContents = styled.button`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  width: 100%;
  border: none;
  background-color: white;
  outline: none;

  p {
    margin-top: 50px;
    margin-bottom: 3px;
    font-size: 16px;
    color: #3b3d40;
  }

  hr {
    margin-bottom: 30px;
    height: 1px;
    width: 100%;
    border: none;
    background-color: #999;
  }
`;

const TitleName = styled.input`
  width: 100%;
  margin-bottom: 50px;
  border: none;
  outline: none;
  font-size: 42px;
`;

const Input = styled(TitleName)`
  margin-bottom: 10px;
  font-size: 16px;
`;
