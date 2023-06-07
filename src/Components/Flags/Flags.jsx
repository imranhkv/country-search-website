import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useContext } from "react";
import { ThemeContext } from "../../App";
import "./Flags.css"
import CountUp from "react-countup";
import { LoadingOutlined } from '@ant-design/icons';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { Link } from 'react-router-dom';




function Flags() {
    const theme = useContext(ThemeContext);
    const [flags, setFlags] = useState([])
    const [regions, setRegions] = useState([])
    const [categoryRegion, setCategoryRegion] = useState([])
    const [limit, setLimit] = useState(40)
    const [loading, setLoading] = useState("")
    const [loadAll, setLoadAll] = useState(true)
    const [searchCountry, setSearchCountry] = useState("");
    const [spinLoading, setSpinLoading] = useState("");

    // api çağırılması
    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((res) => { setFlags(res.data); setLoadAll(false); setCategoryRegion(res.data); setRegions(res.data) })
            .catch(err => console.log("connect problem..."))
    }, [])
    // son

    // ümumi loading
    if (loadAll) {
        return (
            <LoadingOutlined
                style={{
                    fontSize: 48,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                    overflowY: "hidden"
                }}
                spin
            />
        )
    }
    // son

    // buttonun içindəki loading
    const loadMore = () => {
        setLoading(true)
        setTimeout(() => {
            setLimit(limit + 50); setLoading(false)
        }, 1500);
    }
    // son

    // sort buttonlar
    let sortAZ = () => {
        let data = [...regions]
        if (data.length > 0) {
            let result = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
            setRegions(result)
        }
    }
    let sortZA = () => {
        let data = [...regions]
        if (data.length > 0) {
            let result = data.sort((a, b) => b.name.common.localeCompare(a.name.common))
            setRegions(result)
        }
    }
    // son

    // kategoriya bölgüsü
    const selectcategoryRegion = (countt) => {
        const result = flags.filter(
            (a) => { return a.region === countt }
        )
        setRegions(result)
    }
    // son

    // enter hissəsi

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          // 👇 Get input value
          setSpinLoading(true);
          setTimeout(() => {
              const results = flags.filter((a) =>
                  a.name.common.toLowerCase().includes(searchCountry.toLowerCase())
              );
              setSpinLoading(false);
              setRegions(results);
              setSearchCountry("");
          }, 2000);
        }
      };
    //   son

    //   search hissəsi
    const searchCou = () => {
        if (searchCountry === "") {
            alert("Zəhmət Olmasa Xananı Doldurun");
            return;
        }
        setSpinLoading(true);
        setTimeout(() => {
            const results = flags.filter((a) =>
                a.name.common.toLowerCase().includes(searchCountry.toLowerCase())
            );
            setSpinLoading(false);
            setRegions(results);
            setSearchCountry("");
        }, 2000);
    };

    const serachInput = (e) => {
        setSearchCountry(e.target.value)
    }
    // son
    return (

        <div className='flags' style={theme}>
            <div className="container">
                <div className="filters-flag" >
                    { /* kategoriyalar */}
                    <button onClick={() => setRegions(flags)} style={{backgroundColor:"crimson", border:"1px solid crimson"}} >All</button>
                    {[...new Set(categoryRegion.map((item) => item.region))].map((item) => <div key={item}>
                        <button onClick={() => selectcategoryRegion(item)} >{item}</button>
                    </div>)
                    }
                </div>
                {/* search hissəsi */}
                <div className='search-country-bar'>
                    <label htmlFor="count">
                        <input onKeyDown={handleKeyDown} onChange={serachInput} value={searchCountry} placeholder="Ölkə Axtar" id='count' />
                        <button onClick={searchCou} id='btn1' disabled={searchCountry === ""} >
                            {spinLoading && <span><LoadingOutlined /></span>}
                            {!spinLoading && <span>Axtarış</span>}
                        </button>
                    </label>
                </div>
                {/* sort buttonları */}
                <div className="sortBtn">
                    <button onClick={sortAZ} >A-Z <AiOutlineArrowDown style={{ marginLeft: "5px", marginTop: "2px" }} /></button>
                    <button onClick={sortZA}>Z-A<AiOutlineArrowUp style={{ marginLeft: "5px", marginTop: "3px" }} /> </button>
                </div>

                {/* Bayraq Cardlari */}
                <div className="flags-content">
                    {loadAll === true ? (
                        <h3>Loading</h3>) : regions.length === 0 ? (<div className="tapilmadi">
                            <h3> Axtarışınıza Uyğun Ölkə Tapılmadı</h3>
                            <img src="https://cdn3.iconfinder.com/data/icons/faticons/32/globe-01-512.png" alt="" />
                        </div>
                        ) : (regions.slice(0, limit).map((item, index) => {
                            return (
                                <Link to={`/country/${item.cca3}`} key={index} >
                                    <div className='flags-card' key={index} style={theme}>
                                        <img src={item.flags.png} alt="" />
                                        <h2> Ölkə: {item.name.common}</h2>
                                        <h3> Əhali: <CountUp duration={3} end={item.population} /></h3>
                                    </div>
                                </Link>
                            )
                        })
                    )}
                </div>
                {/* Load Buttonlari */}
                <div className="loadBtn">
                    {
                        limit < regions.length &&
                        <button onClick={loadMore}>
                            {loading && <span><LoadingOutlined /></span>}
                            {!loading && <span>Load More</span>}
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Flags