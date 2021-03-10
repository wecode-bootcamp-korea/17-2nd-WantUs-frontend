import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import theme from '../../../../Styles/theme';

function Slide() {
  const [categoryData, setcategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const settings = {
    dots: true,
    arrow: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
    lazyLoad: true,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const fetchData = async () => {
    const { data } = await axios('/data/subCategory.json');
    setcategoryData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Text>전체</Text>
      <StyledSlider {...settings}>
        {!isLoading &&
          categoryData.map(category => {
            return (
              <ImageContainer key={category.id}>
                <ImgDiv img={category.img}>
                  <Title>{category.title}</Title>
                </ImgDiv>
              </ImageContainer>
            );
          })}
      </StyledSlider>
    </Container>
  );
}

export default Slide;

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid ${theme.darkGray};
`;

const StyledSlider = styled(Slider)`
  margin: 0 20px 30px;
  width: 850px;

  .slick-slide div {
    outline: none;
  }
`;

const ImageContainer = styled.div`
  margin: 0 16px;
  width: 500px;
`;

const ImgDiv = styled.div`
  position: relative;
  width: 150px;
  height: 55px;
  text-align: center;
  border-radius: ${theme.imgRadius};
  background: url(${props => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 10px;
  opacity: 0.8;
`;

const Title = styled.div`
  position: absolute;
  margin: 20px 50px;
  font-size: 13px;
  color: ${theme.white};
`;

const Text = styled.h1`
  margin: 10px 30px;
`;
