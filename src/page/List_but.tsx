import React, { useContext, useEffect, useState } from 'react'
import { Mycon } from '../MyCon';
import { useNavigate } from 'react-router-dom';

type Props = {

}

function List_but({ }: Props) {
  const { data, setData, foodData, setpagenum, pagenum, setSearchValue, cancel, mod, setmod } = useContext(Mycon)
  const [foodData_list, setfoodData_list] = useState(foodData);
  const navi = useNavigate();
  const [firstid, setfirstid] = useState(0);



  let time: any;

  //다운 이벤트때 mod 갱신
  const clickFn = (food: string, id: number) => {
    if(mod == true){
      setmod(true)
      console.log(mod);
      
    }else{
      setmod(false)
      data.filter((item: { id: number, food: string, state: boolean }) => (item.state == true)).length ? setmod(true) : setmod(false);
    }
    
    if(!mod){
  
      time = setTimeout(() => {
        setmod(true)
        setData(
          data.map((item: { id: number, food: string, state: boolean }) => {
            if (item.id == id) {
              item.state = !item.state
              setfirstid(id)
              
            }
            return item;
          })
        );
      }, 1000)
    }else{

    }

  }


  //클릭 이벤트 변경 
  const clickChange = (id: number, food: string) => {

    clearTimeout(time)
    setTimeout(() => {
      setfirstid(0)
    }, 500);


    mod ? delon(id) : serchbut(food)
  }


  // state 조절
  const delon = (id: number) => {

    setData(
      data.map((item: { id: number, food: string, state: boolean }) => {

        if (item.id != firstid) {
          if (item.id == id) {
            item.state = !item.state;
          }
        }
        return item;
      })
    );
  }


  //검색 > 네비
  const serchbut = (value: any) => {
    clearTimeout(time)
    setSearchValue(value)
    cancel()
    setfoodData_list(foodData)
    setpagenum(1)
    navi('/')

  }


  useEffect(()=>{
    cancel()
  },[])

  return (
    <>
      <ul className='list_but'>
        {data.map((v: { id: number, food: string, state: boolean }) => (
          <li key={v.id}
            onMouseDown={() => { clickFn(v.food, v.id) }}
            onClick={() => { clickChange(v.id, v.food) }}
            className={`${new Date(v.id*10*24*60*60*1000) >= new Date() ? 'old':""} ${v.state ? 'on' : ''}`}>{v.food}</li>
        ))
        }
      </ul>
    </>
  )
}

export default List_but