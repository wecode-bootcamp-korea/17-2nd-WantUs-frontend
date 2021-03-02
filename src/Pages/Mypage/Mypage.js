import React, { useState } from 'react';
import styled from 'styled-components';
import Profile from './components/Profile';
import UserData from './components/UserData';
import EditPage from './components/EditPage';
import theme from '../../Styles/theme';

const Mypage = () => {
  const [onEditMode, setEditMode] = useState(false);

  const handleEditMode = () => {
    setEditMode(prevStatus => !prevStatus);
  };

  return (
    <MypageContainer>
      <PageTitle>MY 원트어스</PageTitle>
      <section>
        <Profile handleEditMode={handleEditMode} onEditMode={onEditMode} />
        {!onEditMode ? <UserData /> : <EditPage />}
      </section>
    </MypageContainer>
  );
};

const MypageContainer = styled.div`
  ${theme.profileContainer};

  section {
    ${theme.profileSection};
  }
`;

const PageTitle = styled.h1`
  ${theme.pageTitle};
`;

export default Mypage;
