import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Mycon } from '../MyCon'
import Del from './Del';
import List_but from './List_but';
import { useNavigate } from 'react-router-dom';

type Props = {}

function List({ }: Props) {
  const { data, setData, del, cancel } = useContext(Mycon);
  const [infood, setInfood] = useState('');
  const navi = useNavigate();

  const add = () => {
    if(infood.trim != null){

      let id = Date.now();
      setInfood('');
  
  
      setData([...data, { id, food: infood, state: false }])
    }
  }

  const keyup = (e: any) => {

    if (e.keyCode == 13) {
      if(infood.trim != null){

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
      <h2>우리집 냉장고에는....</h2>
      <p onClick={() => { cancel(); navi('/') }}> <img src='./close.png' /> </p>
      <div>
        <div className='input'>
          <input type="text" onChange={(e: React.BaseSyntheticEvent) => { setInfood(e.target.value) }} onKeyUp={(e) => { keyup(e) }} value={infood} placeholder={"재료 이름을 적어주세요"} />
          <button onClick={add}>등록</button>
        </div>

        <List_but />
      <button onClick={del} className={`long_but ${(data.filter((obj: { id: number, food: string, state: boolean }) => (obj.state == true)).length >= 1) ? 'on' : ''}`}> 정리하기</button>
      </div>

    </article>
  )
}

export default List