import React, { useState, useEffect } from "react";
import axios from "axios";
import {axiosWithAuth} from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const [dependency, setDependency] = useState(false)

  
  
  const getColors = () => {
    axiosWithAuth()
    .get('/colors')
    .then((res) => {
      console.log('succesfull get request from BubblePage', res)
      setColorList(res.data)
      setDependency(false)
    })
  }

  useEffect(() => {
    getColors()
  }, [dependency])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} setDependency={setDependency} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
