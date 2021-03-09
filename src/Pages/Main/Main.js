import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from './Components/Slider';
import Positions from './Components/Positions';
import { BsPieChartFill } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';
import { SiFacebook } from 'react-icons/si';

class Main extends Component {
  render() {
    return (
      <MainContainer>
        <Slider />
        <MainPage>
          <Matching>
            <BsPieChartFill size="70" />
            <span>이력서를 보강하고 원하는 회사의 면접 제안을 받아보세요</span>
            <button>이력서 강화하기</button>
          </Matching>
          <Recommendation>
            <span>추천할만한 사람</span>
            <IoSettingsOutline size="25" color="gray" className="icon" />
            <RecommendBox>
              <SiFacebook size="70" color="#258bf7" />
              <span>간단하게 네트워크 연결하고 지인들의 추천을 받아보세요</span>
              <button>네트워크 연결</button>
            </RecommendBox>
          </Recommendation>
          <Positions />
        </MainPage>
      </MainContainer>
    );
  }
}

export default Main;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  background-color: #fff;
`;

const MainPage = styled.div`
  margin: 0 80px;
  width: 1000px;
  height: fit-content;
  background-color: white;
`;

const Matching = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
  height: 90px;
  margin-bottom: 80px;
  padding: 9px 30px;
  background-color: #258bf7;
  border-radius: 3px;
  color: white;

  span {
    width: 600px;
    margin-left: 23px;
    margin-top: 25px;
    font-weight: 500;
    font-size: 18px;
  }

  button {
    width: 189px;
    height: 41px;
    margin-top: 14px;
    margin-left: 160px;
    padding: 11px 20px;
    color: #258bf7;
    background-color: white;
    border-radius: 3px;
    border: none;
    outline: none;
    font-size: 15px;
    font-weight: bold;
  }
`;

const Recommendation = styled.div`
  position: relative;
  margin-bottom: 80px;
  width: 100%;
  height: 135px;
  background-color: white;

  span {
    display: inline-block;
    margin-top: 2px;
    line-height: 1.05;
    text-align: left;
    color: #333333;
    font-size: 20px;
    font-weight: 600;
  }

  .icon {
    position: absolute;
    margin-left: 8px;
  }
`;

const RecommendBox = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
  height: 90px;
  padding: 9px 30px;
  margin-top: 15px;
  margin-bottom: 80px;
  background-color: white;
  border-radius: 3px;
  border: 1px solid #d7d7d7;
  border-left: 5px solid #258bf7;
  color: white;

  img {
    margin-top: 10px;
    width: 120px;
    height: 52px;
  }

  span {
    width: 600px;
    margin-left: 23px;
    margin-top: 25px;
    font-weight: 500;
    font-size: 18px;
  }

  button {
    width: 200px;
    height: 41px;
    margin-top: 14px;
    margin-left: 160px;
    padding: 11px 20px;
    color: #258bf7;
    background-color: white;
    border-radius: 3px;
    border: 1px solid #258bf7;
    outline: none;
    font-weight: bold;
    font-size: 15px;
  }
`;
