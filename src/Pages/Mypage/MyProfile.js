import React, { useState } from 'react';
import Profile from './components/Profile';
import EditPage from './components/EditPage';
import styled from 'styled-components';
import SetProfile from './components/SetProfile';
import theme from '../../Styles/theme';

const MyProfile = () => {
  const [onEditMode, setEditMode] = useState(false);

  const handleEditMode = () => {
    setEditMode(prevStatus => !prevStatus);
  };

  return (
    <MyProfileContainer>
      <PageTitle>MY 원트어스</PageTitle>
      <section>
        <Profile handleEditMode={handleEditMode} onEditMode={onEditMode} />
        {!onEditMode ? <SetProfile /> : <EditPage />}
      </section>
    </MyProfileContainer>
  );
};

const MyProfileContainer = styled.div`
  ${theme.profileContainer};

  section {
    ${theme.profileSection};
  }
`;

const PageTitle = styled.h1`
  ${theme.pageTitle};
`;

export default MyProfile;
