import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

class CVwriteBottom extends React.Component {
  goToCV = () => {
    this.props.history.push('/cv');
  };

  render() {
    return (
      <MainContainer>
        <ResumeBox>
          <TempoSave onClick={this.goToCV}>임시 저장</TempoSave>
          <Save onClick={this.goToCV}>작성 완료</Save>
        </ResumeBox>
      </MainContainer>
    );
  }
}

export default withRouter(CVwriteBottom);

const MainContainer = styled.div`
  position: sticky;
  height: 73px;
  width: 100%;
  border-top: 1px solid lightgray;
  margin-bottom: 0px;
  background-color: white;
  z-index: 1;
`;

const ResumeBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px auto 150px;
  width: 1000px;
  height: fit-content;
`;

const TempoSave = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 174px;
  height: 52px;
  color: #258bf7;
  background-color: white;
  border: 1px solid #258bf7;
  border-radius: 4px;
  cursor: pointer;
`;

const Save = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 174px;
  height: 52px;
  margin-left: 15px;
  color: white;
  background-color: #258bf7;
  border: 1px solid #258bf7;
  border-radius: 4px;
  cursor: pointer;
`;
