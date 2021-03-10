import React from 'react';
import styled from 'styled-components';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import theme from '../../../../Styles/theme';

function BookmarkLink() {
  return (
    <BookMark>
      <BsFillBookmarkFill color={theme.logoBlue} />
      북마크 모아보기 <IoIosArrowForward color={theme.logoBlue} />
    </BookMark>
  );
}

export default BookmarkLink;

const BookMark = styled.div`
  margin: 0 25px 15px;
`;
