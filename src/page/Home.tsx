import React, { useRef } from 'react';
import { useContext, useState, useEffect } from 'react';
import { Mycon } from '../MyCon';
import { log } from 'console';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

type Props = {}

function Home({ }: Props) {

    const { foodData, setpagenum, pagenum, setSearchValue, setidxdata } = useContext(Mycon)
    const [foodData_list, setfoodData_list] = useState(foodData);
    const [subOn, setsubOn] = useState(false);
    const serch = useRef<any>([]);
    const navi = useNavigate();


    const serchbut = (bln: boolean = false) => {
        if (serch.current.length) {
            if (bln) serch.current[1] = serch.current[0].value
            serch.current[0].value = ""
            setSearchValue(serch.current[1])
            setfoodData_list(foodData)
            setpagenum(1)
        }
    }
    const keyup = (e: any) => {

        if (e.keyCode == 13) {
            serchbut(true);
        }

    }

    useEffect(() => {
        if (pagenum == 1) {
            setfoodData_list(foodData);
        } else {
            if (foodData != null) {
                setfoodData_list([...foodData_list, ...foodData]);
                console.log('foodset');
                
            }
        }
    }, [pagenum&&foodData]);


    const liserch = (item: any) => {
        console.log(item.innerText);

        serch.current[1] = item.innerText;
        console.log(serch)
        serchbut();
    }


    return (
        <>
            <div className='header'>
                <div className='HDtop'><p><img src="./ice_box.png" alt="" /></p> <h2>오늘은 뭐해 먹지?</h2> <p onClick={() => setsubOn(true)}><img src='./berger.png'></img></p></div>
                <div className={`sub_box ${subOn ? 'on' : ''}`}>
                    <p onClick={() => setsubOn(false)}><img src='./close.png'/></p>
                    <Link to="/" onClick={()=>{setsubOn(false)}}>추천 레시피</Link>
                    <Link to="/lover" onClick={()=>{setsubOn(false)}}>좋아요한 레시피</Link>
                    {/* <Link to="/new">나의 레시피 등록하기</Link> */}
                </div>
                <div className='input'>
                    <input type='text' ref={(e) => { serch.current[0] = e }} placeholder={"재료로 검색"} onKeyUp={(e) => { keyup(e) }}></input> <button onClick={() => serchbut(true)}> <p><img src='./serch.png' /></p> </button>
                </div>
                <ul className='hashi'>
                    <li onClick={(e) => liserch(e.currentTarget)}>상추</li>
                    <li onClick={(e) => liserch(e.currentTarget)}>감자</li>
                    <li onClick={(e) => liserch(e.currentTarget)}>배추</li>
                </ul>
            </div>

            <div className='contan home'>
                <ul>
                    {
                        (foodData_list == undefined) ? (<p>검색 내용이 없습니다</p>)
                            : (
                                foodData_list.map((v: any, k: number) => (
                                    <li key={k} onClick={() => {
                                        navi(`/datail/${v.idx._text}`);
                                    }}>
                                        <figure className='food_data'>
                                            <p>
                                                <img src={v.fileImageUrl._cdata} />
                                            </p>
                                            <figcaption>
                                                <div className='title'>
                                                    {v.title._cdata}
                                                    <div>
                                                        <p><img src='./Thanksgiving.png' />{Math.ceil(Math.random() * 50) + "분"} </p>
                                                        <p><img src='./icon_heart_.png' />{Math.ceil(Math.random() * 100)}</p>
                                                    </div>
                                                </div>

                                                <div className='hashi'><span>#건강식</span> <span>#집밥</span> <span>#간편</span></div>
                                            </figcaption>
                                        </figure>
                                    </li>
                                ))
                            )
                    }
                    <Link to="/list">
                    <button className='ice-box'> <p><img src="./ice_box.png" alt="" /></p></button>
                    </Link>
                </ul>
                <button onClick={() => { setpagenum(pagenum + 1) }} className={`long_but ${(foodData == null) ? 'off' : ""}`}> more </button>
            </div>

        </>
    )
}

export default Home