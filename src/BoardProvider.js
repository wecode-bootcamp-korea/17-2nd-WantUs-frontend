import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoardContext from './BoardContext';
import { JOB_LIST } from './config';

const BoardProvider = ({ children }) => {
  const [postingData, setPostingData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isTagModal, setTagModal] = useState(false);
  const [isLocationModal, setLocationModal] = useState(false);
  const [urlQuery, setUrlQuery] = useState('');
  const [requestFilterData, setRequestFetchFilterData] = useState({
    tag: [],
    location: [],
  });
  const [modalNum, setModalNum] = useState({
    tagNum: 0,
    locationNum: 0,
  });
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    tagModalRequest();
  }, []);

  const handleModal = id => {
    switch (id) {
      case 1:
        setTagModal(!isTagModal);
        setLocationModal(false);
        break;
      case 2:
        setLocationModal(!isLocationModal);
        setTagModal(false);
        break;
      case 3:
        setTagModal(false);
        setLocationModal(false);
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
      url: `${JOB_LIST}${urlQuery}`,
    });
    setPostingData(postings);
    setLocationData(locations);
    setTagData(tags);
    setCategoryData(categories);
    ssetModalNum({
      tagNum: tags.length,
      locationNum: locations.length,
    });
  };

  const handleSeperatedData = (tagData, locationData) => {
    let tagQuery = ``;
    let locationQuery = ``;

    for (let i of tagData) {
      tagQuery = tagQuery + `tag=${i.name}&`;
    }

    for (let i of locationData) {
      locationQuery = locationQuery + `location=${i.name}&`;
    }

    const encordedQuery = ('&' + tagQuery + locationQuery)
      .replace(/#/gi, '%23')
      .slice(0, -1);

    setUrlQuery(encordedQuery);
    return encordedQuery;
  };

  const tagModalRequest = async () => {
    const tagData = requestFilterData.tag;
    const locationData = requestFilterData.location;
    handleSeperatedData(tagData, locationData);
    const {
      data: {
        data: { postings },
        data: { locations },
        data: { tags },
        data: { categories },
      },
    } = await axios(
      {
        method: 'get',
        url: `${JOB_LIST}${urlQuery}`,
      },
      () => console.log(urlQuery),
    );
    setPostingData(postings);
    setLocationData(locations);
    setTagData(tags);
    setCategoryData(categories);
    ssetModalNum({
      tagNum: tags.length,
      locationNum: locations.length,
    });
  };

  const handleTagModal = tagList => {
    setRequestFetchFilterData({
      ...requestFilterData,
      tag: [...tagList],
    });
    tagModalRequest();
  };

  const handleLocationModal = locationList => {
    setRequestFetchFilterData({
      ...requestFilterData,
      location: [...locationList],
    });
    tagModalRequest();
  };

  const fetchUserInfo = () => {
    //목데이터
    axios({
      method: 'GET',
      url: '/data/forLayout.json',
    }).then(res => {
      console.log(res);
      setUserInfo(res.data.user);
    });

    //채현님 통신
    // axios({
    //   method: 'GET',
    //   url: 'http://10.58.5.159:8000/apply',
    // }).then(res => {
    //   console.log(res);
    //   setUserInfo(res.data.user);
    // });
  };

  const handleProfileEdit = (name, email, phoneNumber) => {
    console.log('context', name, email, phoneNumber);

    const newProfile = {
      name,
      email,
      phoneNumber,
    };

    setUserInfo(newProfile);

    //백엔드 POST fetch
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
        handleTagModal,
        handleLocationModal,
        handleModal,
        fetchFirstData,
        fetchUserInfo,
        handleProfileEdit,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
