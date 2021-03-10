import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Slide from './Components/Slider/Slide';
import Filter from './Components/Filter/Filter';
import BookmarkLink from './Components/Bookmark/BookmarkLink';
import Job from './Components/Job/Job';
import BoardContext from '../../BoardContext';

function Explore({ history, match }) {
  const { fetchFirstData } = useContext(BoardContext);

  useEffect(() => {
    fetchFirstData();
  }, []);

  return (
    <ExploreWrapper>
      <Slide />
      <Filter />
      <BookmarkLink />
      <Job />
    </ExploreWrapper>
  );
}

export default Explore;

const ExploreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 50px auto;
`;
