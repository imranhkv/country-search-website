import React from 'react'
import { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { useParams, Link  } from 'react-router-dom'
import axios from 'axios';
import { useContext } from "react";
import { ThemeContext } from "../../App";
import { Button, Modal,Collapse  } from 'antd';
import "./Country.css"

function Country() {
    const theme = useContext(ThemeContext);
    const [flags, setFlag] = useState([])
    const [loadAll, setLoadAll] = useState(true)
    const { cca3 } = useParams()
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [regions, setRegions] = useState([])

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/alpha/${cca3}`)
            .then((res) => { setFlag(res.data); setLoadAll(false); setRegions(res.data) })
            .catch(err => console.log("connect problem"))
    }, [cca3])

    //ümumi loading
    if (loadAll) {
        return (
            <LoadingOutlined
                style={{
                    fontSize: 48,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                }}
                spin
            />
        )
    }
    // son

    // modal
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 500);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    // son

    // accordion
    const { Panel } = Collapse;
    // son
    
    return (
        <div>
            {
                flags.map(item => {
                    return (
                        <div style={theme} className='all-count-flags'>
                            <div className="container">
                                <div className="title-content">
                                    <div className="title-content-name">
                                        <h2>{item.name.official}</h2>
                                    </div>
                                    {/* Modal */}
                                    <div className="content-title-modal">
                                        <Button type="primary" onClick={showModal}>
                                            Vacib Qeyd
                                        </Button>
                                        <Modal
                                            title={
                                                item.borders !== undefined ? <h2>Sərhəd Ölkələrin Sayı: {item.borders.length} </h2>
                                                    : <h2>Sərhəd Ölkələrin Sayı: 0 </h2>
                                            }
                                            open={open}
                                            onOk={handleOk}
                                            confirmLoading={confirmLoading}
                                            onCancel={handleCancel}
                                        >
                                            <div className="links">
                                                <h2>Əgər sərhəd ölkələrin sayı 0-dırsa, deməli ölkənin sərhəd dövləti yoxdur</h2>
                                                <a href={item.maps.googleMaps} target='_blank' rel="noreferrer">Google Maps: Xəritədə Baxın</a>
                                                <a href={item.maps.openStreetMaps} target='_blank' rel="noreferrer">Open Street Maps: Xəritədə Baxın</a>
                                            </div>
                                        </Modal>
                                    </div>
                                    {/* Modal Son */}
                                </div>
                                {/* Accordion */}
                                <div className="main-content-flags">
                                    <div className="return-link">
                                        <Link to="/" >Return Home</Link>
                                    </div>
                                    <div className="accordion">
                                        <Collapse accordion className='colaps'>
                                            <Panel header="Bayraq" key="1">
                                                <img src={item.flags.png} alt="" />
                                            </Panel>
                                        </Collapse>
                                        <Collapse className='colaps'>
                                            <Panel header="Gerb" key="2">
                                                <img src={item.coatOfArms.png} alt="" />
                                            </Panel>
                                        </Collapse>
                                        <Collapse className='colaps'>
                                            <Panel header="Paytaxt" key="3">
                                                <p>{item.capital}</p>
                                            </Panel>
                                        </Collapse>
                                        <Collapse className='colaps'>
                                            <Panel header="Qitə" key="4">
                                                <p>{item.continents}</p>
                                            </Panel>
                                        </Collapse>
                                        <Collapse className='colaps'>
                                            <Panel header="Əhali" key="5">
                                                <p>{item.population}</p>
                                            </Panel>
                                        </Collapse>
                                        <Collapse className='colaps'>
                                            <Panel header="Ərazi" key="6">
                                                <p>{item.area}</p>
                                            </Panel>
                                        </Collapse>
                                        <Collapse className='colaps'>
                                            <Panel header="Müstəqillik" key="7">
                                                {
                                                    item.intependent = true ? <p>Müstəqildir</p> : <p>Müstəqil deyil</p>
                                                }
                                            </Panel>
                                        </Collapse>
                                        <Collapse className='colaps'>
                                            <Panel header="Sərhəd Ölkələr" key="8">
                                                {flags.map(item => (
                                                    item.borders !== undefined ? (
                                                        item.borders.map(border => (
                                                            <div key={border} className='borders-items'>
                                                                <Link to={`/country/${border}`}>{border}</Link>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>Sərhəd dövləti yoxdur</p>
                                                    )
                                                ))}
                                            </Panel>
                                        </Collapse>
                                    </div>
                                    {/* Accordion Son */}
                                </div>
                            </div>
                        </div>
                    ) })}
                    </div>
    )
}

export default Country