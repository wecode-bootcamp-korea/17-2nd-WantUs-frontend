import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoardContext from './BoardContext';
import { JOB_LIST, APPLY, USER_PROFILE } from './config';

const BoardProvider = ({ children }) => {
  const [postingData, setPostingData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isTagModal, setTagModal] = useState(false);
  const [isLocationModal, setLocationModal] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [requestFilterData, setRequestFetchFilterData] = useState({
    tag: [],
    location: [],
    filter: 'new',
  });
  const [modalNum, setModalNum] = useState({
    tagNum: 0,
    locationNum: 0,
  });
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    (requestFilterData.tag.length >= 1 ||
      requestFilterData.location.length >= 1) &&
      tagModalRequest();
  }, [requestFilterData]);

  const handleModal = id => {
    switch (id) {
      case 1:
        setTagModal(!isTagModal);
        setLocationModal(false);
        setLogin(false);
        break;
      case 2:
        setLocationModal(!isLocationModal);
        setTagModal(false);
        setLogin(false);
        break;
      case 3:
        setTagModal(false);
        setLocationModal(false);
        setLogin(false);
        break;
      case 4:
        setLogin(!isLogin);
        setTagModal(false);
        setLocationModal(false);
        break;
    }
  };

  const fetchFirstData = async () => {
    const {
      data: {
        data: { postings },
        data: { locations },
        data: { tags },
        data: { categories },
      },
    } = await axios({
      method: 'GET',
      url: `${JOB_LIST}`,
    });
    setPostingData(postings);
    setLocationData(locations);
    setTagData(tags);
    setCategoryData(categories);
    setModalNum({
      tagNum: tags.length,
      locationNum: locations.length,
    });
  };

  const handleSeperatedData = (tagData, locationData, filterData) => {
    let tagQuery = ``;
    let locationQuery = ``;

    for (let i of tagData) {
      tagQuery = tagQuery + `tag=${i.name}&`;
    }

    for (let i of locationData) {
      locationQuery = locationQuery + `location=${i.name}&`;
    }

    const encordedQuery = (
      '&' +
      tagQuery +
      locationQuery +
      'sorting=' +
      filterData
    ).replace(/#/gi, '%23');
    return encordedQuery;
  };

  const tagModalRequest = async () => {
    const tagData = requestFilterData.tag;
    const locationData = requestFilterData.location;
    const filterData = requestFilterData.filter;
    const urlQuery = handleSeperatedData(tagData, locationData, filterData);
    const {
      data: {
        data: { postings },
        data: { locations },
        data: { tags },
        data: { categories },
      },
    } = await axios({
      method: 'get',
      url: `${JOB_LIST}${urlQuery}`,
    });

    setPostingData(postings);
    setLocationData(locations);
    setTagData(tags);
    setCategoryData(categories);
    setModalNum({
      tagNum: tagData.length,
      locationNum: locationData.length,
    });
  };

  const handleTagModal = tagList => {
    setRequestFetchFilterData({
      ...requestFilterData,
      tag: [...tagList],
    });
  };

  const handleLocationModal = locationList => {
    setRequestFetchFilterData({
      ...requestFilterData,
      location: [...locationList],
    });
  };

  const handleFilterData = filter => {
    setRequestFetchFilterData({
      ...requestFilterData,
      filter: filter,
    });
  };

  const fetchUserInfo = () => {
    axios({
      method: 'GET',
      headers: {
        Authorization: sessionStorage.getItem('access_token'),
      },
      url: `${APPLY}`,
    }).then(res => {
      setUserInfo(res.data.data);
    });
  };

  const handleProfileEdit = (name, email, phoneNumber) => {
    const newProfile = {
      name,
      email,
      phoneNumber,
    };

    setUserInfo(newProfile);

    axios({
      method: 'PATCH',
      url: `${USER_PROFILE}`,
      headers: {
        Authorization: sessionStorage.getItem('access_token'),
      },
      data: {
        name,
        phoneNumber,
      },
    }).then(res => {
      setUserInfo(res.data.user);
    });
  };

  return (
    <BoardContext.Provider
      value={{
        isTagModal,
        isLocationModal,
        postingData,
        locationData,
        tagData,
        modalNum,
        categoryData,
        userInfo,
        isLogin,
        handleTagModal,
        handleLocationModal,
        handleModal,
        fetchFirstData,
        fetchUserInfo,
        handleProfileEdit,
        handleFilterData,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
