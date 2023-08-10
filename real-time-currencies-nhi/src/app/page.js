"use client"; // specify this when we're doing client-side rendering. next prefers server side rendering and will complain otherwise?

// import components and styles
import Image from 'next/image'
import styles from './page.module.css'
import LineChart from './components/LineChart';

// useState and useEffect are hooks
import { useState, useEffect } from 'react'

import { resolve } from 'styled-jsx/css';

export default function Home() {
  // declare a state
  // const [stateName (use a "crackable" name), setStateName] = useState(initialValue)
  // setStockInfo is a func that updates the body of the state
  // the stockInfo is an array of objects, so we init it to []
  // poke img is a url, so we init it to ""
  const [stockInfo, setStockInfo] = useState([])

  // copy pasted from options.js
  const [options, setOptions] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        // timestamps
        categories: []
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 95, 91]
      }
    ]
  });



  // useEffect is a hook
  // hooks are pre-build funcs used to do stuff like:
  // - handle states
  // - handle the react dom
  // arg1 = func to run
  // arg2 = vars/states that useEffect observes. when the state changes, useEffect runs itself
  // this runs when we refresh the page
  useEffect(() => {
    // get info from polygon api docs: https://polygon.io/docs/stocks/get_v2_aggs_ticker__stocksticker__range__multiplier___timespan___from___to 
    // async: this func runs at the same time as hte rest of our code
    async function getInfo() {
      try {
        // good practice to store api key as a const
        const APIKEY = "n_3DyIOIplkKfROXDClkaAxKCVLtVXIh"
        // we're waiting for the info to arrive
        // using promises: "i'll give you this info, but wait until i finish your request"
        // await waits until we get the info
        const data = await fetch(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/2023-08-03/2023-08-04?adjusted=true&sort=asc&limit=120&apiKey=${APIKEY}`)
        // we convert the data, but since we need to wait for the data first, this line needs "await" too
        const jsonData = await data.json()
        
        setStockInfo(jsonData.results)
        console.log(jsonData.results);
      } catch (error) {
        console.error(error)
      }
    }
    // we first declare the func above, then run it below
    getInfo()
  }, [])

  /**
   * print stock info when it changes
   */
  useEffect(() => {
    /**
     * Fill categories and data lists
     * @param elemCount is num of elems we wanna plot
     */
    const fillChart = (elemCount) => {
      for (let i = 0; i < elemCount; i++ ) {
          // fill categories
          options.options.xaxis.categories.append(setCategory(stockInfo[i].t))
      } 
    }

    /**
     * Converts timestamps to date
     * @param {*} timestamp 
     */
    const setCategory = (timestamp) => {
        date = new Date(timestamp)
        return date
    }

    fillChart(10);
    console.log("Hey now I'm in a state", stockInfo);
  }, [stockInfo])


  /**
   * JSX code usually goes here
   */
  return (
    <main className={styles.main}>
     <LineChart options = {options} />
    </main>
  )
}