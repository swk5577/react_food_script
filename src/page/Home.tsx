import React, { useRef } from 'react';
import { useContext, useState, useEffect } from 'react';
import { Mycon } from '../MyCon';
import { log } from 'console';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

type Props = {}

function Home({ }: Props) {

    const { foodData, setpagenum, pagenum, setSearchValue, setidxdata } = useContext(Mycon)
    const [foodData_list, setfoodData_list] = useState(foodData);
    const [subOn, setsubOn] = useState(false);
    const [withs, setwiths] = useState(0);
    const [view, inView] = useInView()
    const serch = useRef<any>([]);
    const navi = useNavigate();


    const serchbut = (bln: boolean = false) => {
        if (serch.current.length) {
            if (bln) serch.current[1] = serch.current[0].value
            serch.current[0].value = ""
            setSearchValue(serch.current[1])
            setfoodData_list(foodData)
            setpagenum(1)
            lile.forEach((li) => {
                li.classList.remove('on');
            })
        }
    }
    const keyup = (e: any) => {

        if (e.keyCode == 13) {
            serchbut(true);
        }

    }






    const liserch = (item: any) => {
        console.log(item.innerText);

        serch.current[1] = item.innerText;
        serchbut();
    }

    const lile = document.querySelectorAll('.hashi >li')
    const lion = (item: any) => {
        lile.forEach((li) => {
            li.classList.remove('on');
        })
        item.classList.add('on');

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

    }, [pagenum && foodData]);
    

    useEffect(()=>{
        setwiths((document.querySelector('#root') as HTMLElement).offsetWidth);
    },[inView])

    console.log(foodData.length);
    
    return (
        <>
            <div className={`input_box subinput ${inView ? '' : 'on'}`} style={{ width: `${withs}px` }}>
                <div className='input'>
                    <input type='search' ref={(e) => { serch.current[0] = e }} placeholder={"재료로 검색"} onKeyUp={(e) => { keyup(e) }}></input> <button onClick={() => { serchbut(true); }}> <p><img src='/react_food_script/serch.png' /></p> </button>
                </div>
                <button className='top'>
                    <p onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}>△</p>
                </button>
            </div>
            <div className='header'>
                <div ref={view} className='HDtop'><p><img src='/react_food_script/ice_box.png' alt="" /></p> <h2 onClick={() => { serchbut(true) }}>오늘은 뭐해 먹지?</h2> <p onClick={() => setsubOn(true)}><img src='/react_food_script/berger.png'></img></p></div>
                <div className={`header_box ${subOn ? 'on' : ''}`}>
                    <div className={`sub_box`}>
                        <p onClick={() => setsubOn(false)}><img src='/react_food_script/close.png' /></p>
                        <Link to="/" onClick={() => { setsubOn(false) }}>추천 레시피</Link>
                        <Link to="/lover" onClick={() => { setsubOn(false) }}>좋아요한 레시피</Link>
                        {/* <Link to="/new">나의 레시피 등록하기</Link> */}
                    </div>
                </div>
                <div className={`input_box`}>
                    <div className='input'>
                        <input type='search' ref={(e) => { serch.current[0] = e }} placeholder={"재료로 검색"} onKeyUp={(e) => { keyup(e) }}></input> <button onClick={() => serchbut(true)}> <p><img src='/react_food_script/serch.png' /></p> </button>
                    </div>

                </div>
                <ul className='hashi'>
                    <li onClick={(e) => { liserch(e.currentTarget); lion(e.target) }}>상추</li>
                    <li onClick={(e) => { liserch(e.currentTarget); lion(e.target) }}>감자</li>
                    <li onClick={(e) => { liserch(e.currentTarget); lion(e.target) }}>배추</li>
                </ul>
            </div>

            <div className='contan home'>
                <ul>
                    {
                        foodData.length == 0? <p>로오오오오오오ㅗㅗ딩</p> :
                        (foodData_list == undefined) ? (<p>검색 내용이 없습니다</p>)
                            : (
                                foodData_list.map((v: any, k: number) => (
                                    <li key={k} onClick={() => {
                                        navi(`/datail/${v.idx._text}`, { state: { ...v } });
                                    }}>
                                        <figure className='food_data'>
                                            <p>
                                                <img src={v.fileImageUrl._cdata} />
                                            </p>
                                            <figcaption>
                                                <div className='title'>
                                                    {v.title._cdata}
                                                    <div>
                                                        <p><img src='/react_food_script/Thanksgiving.svg' />{Math.ceil(Math.random() * 50) + "분"} </p>
                                                        <p><img src='/react_food_script/icon_heart_.svg' />{Math.ceil(Math.random() * 100)}</p>
                                                    </div>
                                                </div>

                                                <div className='hashi'><span>#건강식</span> <span>#집밥</span> <span>#간편</span></div>
                                            </figcaption>
                                        </figure>
                                    </li>
                                ))
                            )
                    }
                    <Link to="/list" className='ice-box'>
                        <p><img src='/react_food_script/ice_box.png' alt="" /></p>
                    </Link>
                </ul>
                <button onClick={() => { setpagenum(pagenum + 1) }} className={`long_but ${(foodData == null) ? 'off' : ""}`}> more </button>
            </div>

        </>
    )
}

export default Home