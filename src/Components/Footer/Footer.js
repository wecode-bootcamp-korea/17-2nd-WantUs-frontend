import React, { Component } from 'react';
import styled from 'styled-components';
import FOOTERDATA from './FooterData';

class Footer extends Component {
  render() {
    return (
      <FooterContainer>
        <TextContainer>
          <TopContainer>
            <TextMenu>
              <FooterLogo>
                <Img
                  alt="footerlogo"
                  src={process.env.PUBLIC_URL + '/images/footer/logo.png'}
                />
              </FooterLogo>
              <TextMenuDetail>
                <TextDetail>
                  {FOOTERDATA[0].map(index => {
                    return <Context>{index}</Context>;
                  })}
                </TextDetail>
              </TextMenuDetail>
            </TextMenu>
            <Select>
              {FOOTERDATA[1].map(index => {
                return <option>{index}</option>;
              })}
            </Select>
          </TopContainer>
          <TextInfo>
            {FOOTERDATA[2].map(index => {
              return <Paragraph>{index}</Paragraph>;
            })}
          </TextInfo>
        </TextContainer>
      </FooterContainer>
    );
  }
}

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  height: 246px;
  padding: 30px 0px 70px;
  background-color: #2b2d2e;
  color: #b9b9ba;
  font-size: 12px;
  z-index: 1000px;
`;

const TextContainer = styled.div`
  width: 1000px;
  margin: 0 auto 25px;
`;

const TopContainer = styled.div`
  width: 1000px;
  margin: 0 auto 25px;
  display: flex;
  justify-content: space-between;
`;

const TextMenu = styled.div`
  width: 625px;
  height: 36px;
  float: left;
  display: flex;
  justify-content: left;
  margin-top: 5px;
`;

const TextMenuDetail = styled.div`
  width: 395px;
  height: 36px;
  font-size: 16px;
`;

const TextDetail = styled.span`
  font-size: 16px;
`;

const Select = styled.select`
  width: 250px;
  height: 34px;
  padding: 0px 45px;
  background: black;
  border-radius: 0;
  border: 0;
  font-size: 14px;
  line-height: 36px;
  color: white;
`;

const TextInfo = styled.div`
  width: 1024px;
  height: 60px;
  margin-top: 40px;
`;

const Paragraph = styled.p`
  width: 900px;
  font-size: 12px;
  padding-bottom: 10px;
`;

const Context = styled.a`
  color: white;
  font-size: 16px;
  text-decoration: none;
  margin: 0px 20px;
`;

const FooterLogo = styled.div`
  margin-right: 30px;
`;

const Img = styled.img`
  width: 120px;
  height: 16px;
`;
