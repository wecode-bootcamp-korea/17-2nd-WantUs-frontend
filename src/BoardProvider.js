import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoardContext from './BoardContext';
import { JOB_LIST } from './config';

const BoardProvider = ({ children }) => {
  const [postData, setPostData] = useState([]);
  const [filterData, setFilterData] = useState({
    tagData: [],
    locationData: [],
    careerData: [],
  });

  const [requestFilterData, setRequestFetchFilterData] = useState({
    tag: [],
    location: [],
  });

  useEffect(() => {
    fetchFilterData();
  }, []);

  useEffect(() => {});

  const fetchFilterData = async () => {
    const {
      data: { tag, location, career },
    } = await axios('/data/filterData.json');

    setFilterData({
      tagData: [tag],
      locationData: [location],
      careerData: [career],
    });
  };

  const handleSeperatedData = (tagData, locationData) => {
    console.log('tagData,loca', tagData, locationData);
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
    return encordedQuery;
  };

  const tagModalRequest = async () => {
    const tagData = requestFilterData.tag;
    const locationData = requestFilterData.location;
    const query = handleSeperatedData(tagData, locationData);
    const {
      data: { data },
    } = await axios({
      method: 'get',
      url: `${JOB_LIST}${query}`,
    });
    setPostData(data);
  };

  const handleTagModal = tagList => {
    console.log(tagList);
    console.log('hanlde2', requestFilterData);
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

  return (
    <BoardContext.Provider
      value={{
        filterData,
        handleTagModal,
        handleLocationModal,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
