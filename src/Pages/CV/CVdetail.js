import React from 'react';
import { withRouter } from 'react-router-dom';
import styled, { ThemeConsumer } from 'styled-components';
import CVDATA from './CVData';
import { RESUME_API } from '../../config';

class CVdetail extends React.Component {
  constructor() {
    super();
    this.state = {
      infoDisplay: [],
      cvwriteList: [],
    };
  }

  componentDidMount() {
    fetch(`${RESUME_API}/${this.props.match.params.id}`, {
      method: 'GET',
      headers: {
        Authorization: sessionStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          cvwriteList: res.result,
        });
      });
  }

  clickHandler = id => {
    if (this.state.infoDisplay.includes(id)) {
      const newDisplayIds = this.state.infoDisplay.filter(el => el !== id);
      this.setState({ infoDisplay: newDisplayIds });
    } else {
      this.setState({ infoDisplay: [...this.state.infoDisplay, id] });
    }
  };

  delete = async (info, value) => {
    const item = this.state.cvwriteList[value];
    const remainItem = item.filter(cv => {
      return info.Name !== cv.Name;
    });
    const currentState = this.state.cvwriteList;
    currentState[value] = remainItem;

    this.setState({
      cvwriteList: currentState,
    });
  };

  render() {
    const item = this.state.cvwriteList;
    return (
      <div>
        <InfoContents>
          {CVDATA.map(info => {
            return (
              <TopBox key={info.id}>
                <Title>{info.name}</Title>
                <hr />
                <ADD onClick={() => this.clickHandler(info.id)}>+ 추가</ADD>
                <Extra
                  className={
                    this.state.infoDisplay.includes(info.id) ? '' : 'display'
                  }
                >
                  <NewDisplay type="date" placeholder={info.placeholder[0]} />
                  <NewDisplay type="date" placeholder={info.placeholder[1]} />
                  <NewDisplay placeholder={info.placeholder[2]} />
                </Extra>
                {this.state.cvwriteList.length !== 0 &&
                  this.state.cvwriteList[info.key].map(item => (
                    <InfoBox>
                      <Information>{item.Start}</Information>
                      <Information>{item.End}</Information>
                      <Information>{item.Name}</Information>
                      <Delete onClick={() => this.delete(item, info.key)}>
                        X
                      </Delete>
                    </InfoBox>
                  ))}
              </TopBox>
            );
          })}
        </InfoContents>
      </div>
    );
  }
}

export default withRouter(CVdetail);

const InfoContents = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  width: 100%;
  border: none;
  background-color: white;

  hr {
    margin-bottom: 30px;
    height: 1px;
    width: 100%;
    background-color: #999;
    border: none;
  }

  .display {
    display: none;
  }
`;

const TopBox = styled.div`
  width: 100%;
`;

const Title = styled.p`
  margin-top: 50px;
  margin-bottom: 8px;
  color: black;
  font-size: 16px;
  text-align: left;
`;

const Extra = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NewDisplay = styled.input`
  width: 300px;
  height: 50px;
  background-color: white;
  outline: none;
  border: none;
  text-align: center;
`;

const ADD = styled.button`
  padding-bottom: 30px;
  width: 100%;
  color: #176fd8;
  text-align: left;
  font-size: 18px;
  border: none;
  border-bottom: 1px solid #f1f1f1;
  background-color: transparent;
  outline: none;
  cursor: pointer;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid lightgray;
  background-color: #f7f6f3;
`;

const Information = styled.span`
  width: 300px;
  background-color: #f7f6f3;
  text-align: center;
`;

const Delete = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
  width: 19px;
  height: 19px;
  color: white;
  border: none;
  border-radius: 50%;
  background-color: #258bf7;
  font-weight: bold;
  outline: none;
  opacity: 0.1;
  cursor: pointer;

  &:hover {
    background-color: #258bf7;
    opacity: 1;
  }
`;
