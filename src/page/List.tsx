import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Mycon } from '../MyCon'
import Del from './Del';
import List_but from './List_but';
import { useNavigate } from 'react-router-dom';

type Props = {}

function List({ }: Props) {
  const { data, setData, del, cancel, mod } = useContext(Mycon);
  const [infood, setInfood] = useState('');
  const navi = useNavigate();

  const add = () => {
    if (infood.trim() != '') {

      let id = Date.now();
      setInfood('');


      setData([...data, { id, food: infood, state: false }])
    }
  }

  const keyup = (e: any) => {

    if (e.keyCode == 13) {
      if (infood.trim() != '') {
        console.log(infood,'++++++++');
        
        let id = Date.now();
        setInfood('');


        setData([...data, { id, food: infood, state: false }])
      }
    }

  }



  useEffect(() => {

  }, [])

  return (
    <article className='list'>
      <h2>우리집 냉장고에는....<p onClick={() => { cancel(); navi("/") }}> <img src='/react_food_script/close.png' /> </p></h2>

      <div className='contan'>
        <div className='input'>
          <input type="text" onChange={(e: React.BaseSyntheticEvent) => { setInfood(e.target.value) }} onKeyUp={(e) => { keyup(e) }} value={infood} placeholder={"냉장고 밥좀 줘볼까~"} />
          <button onClick={add}>등록</button>
        </div>
        <p>
          {!data.length ? "냉장고에 뭐가 들어있나요?" : ""}
        </p>
        <List_but />
        <button onClick={del} className={`long_but ${mod ? 'on' : ''}`}> 정리하기</button>
      </div>

    </article>
  )
}

export default List