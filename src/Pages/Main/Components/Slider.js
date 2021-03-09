import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import SLIDERDATA from './SliderData';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class SimpleSlider extends Component {
  constructor() {
    super();
    this.state = {
      sliderList: [],
    };
  }

  componentDidMount() {
    this.setState({
      sliderList: SLIDERDATA,
    });
  }

  render() {
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };
    return (
      <SliderContainer>
        <Slider {...settings}>
          {this.state.sliderList.map((data, idx) => {
            return (
              <SliderItem key={idx}>
                <ImageContainer alt={data.name} src={data.src}>
                  <TextContainer>
                    <TextBox>
                      <Title>{data.title}</Title>
                      <SubTitle>{data.detail}</SubTitle>
                      <hr />
                      <DirectLink>바로가기 ></DirectLink>
                    </TextBox>
                  </TextContainer>
                </ImageContainer>
              </SliderItem>
            );
          })}
        </Slider>
      </SliderContainer>
    );
  }
}

const SliderContainer = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const SliderItem = styled.div`
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 300px;
  background: url(${props => props.src});
  background-size: cover;
  background-position: center center;

  hr {
    margin-bottom: 10px;
  }
`;

const TextContainer = styled.div`
  width: 1000px;
`;

const TextBox = styled.div`
  width: 340px;
  height: 147px;
  margin-top: 130px;
  padding: 20px 30px 14px;
  border-radius: 3px;
  background-color: white;
`;

const Title = styled.h2`
  margin-bottom: 5px;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
  font-size: 22px;
  font-weight: 600;
`;

const SubTitle = styled.h3`
  display: block;
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
`;

const DirectLink = styled.span`
  color: #4da0f8;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
`;
