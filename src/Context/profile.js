import { createContext, useState, Children } from 'react';

const ProfileContext = createContext({
  state: { name: 'saemsol' },
  actions: {
    setUserInfo: () => {},
  },
});

const ProfileProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();

  const value = {
    state: { userInfo },
    action: { setUserInfo },
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

const ProfileConsumer = ProfileContext.Consumer;

export { ProfileProvider, ProfileConsumer };

export default ProfileContext;
