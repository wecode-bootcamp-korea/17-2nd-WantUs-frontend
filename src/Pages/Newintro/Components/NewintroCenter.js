import React from 'react';
import styled from 'styled-components';
import NEWINTRODATA from './NewintroData';

class NewintroCenter extends React.Component {
  render() {
    return (
      <div>
        {NEWINTRODATA.map(info => {
          return (
            <NewintroPic key={info.id} src={info.src}>
              <Contents>
                <Title>
                  {info.title1}
                  <br />
                  {info.title2}
                </Title>
                <SubTitle>
                  {info.subtitle1}
                  <br />
                  {info.subtitle2}
                </SubTitle>
              </Contents>
            </NewintroPic>
          );
        })}
      </div>
    );
  }
}

export default NewintroCenter;

const NewintroPic = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 480px;
  background: url(${props => props.src});
  background-position: center center;
  background-size: cover;
`;

const Contents = styled.div`
  padding: 160px 0 0 900px;
  height: 266px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  line-height: 48px;
  font-size: 36px;
  font-weight: bold;
`;

const SubTitle = styled.h3`
  line-height: 28px;
  font-size: 16px;
`;
