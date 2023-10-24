import React, { useContext, useEffect, useState, } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Mycon } from '../MyCon';
import List_but from './List_but';
import { log } from 'console';

type Props = {

}

function Datail({ }: Props) {
  const pram = useParams();
  const location = useLocation();
  const [loverClass, setloverClass] = useState(false);


  const { data, datailData, del, setidxdata, setmod, lover, setlover, mod } = useContext(Mycon);
  const navi = useNavigate();
  const [clear, setClear] = useState(false);


  const clearbut = () => {
    if (data.length !== 0) {
      setmod(true)
      console.log('datail', mod)
      setClear(true)
    } else {
      setClear(false)
      navi('/')
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    setidxdata(pram.idx);
  },[]);

  useEffect(() => {
    let loverClass = lover.filter((obj: any) => obj.idx._text == pram.idx);
    if (loverClass.length) setloverClass(true);
    window.scrollTo(0, 0)
  }, [datailData])


  const loverFn = () => {


    if (loverClass) {
      setlover(lover.filter((v: any) => (v.idx._text != pram.idx)))

    } else {
      setlover([...lover, location.state])
    }

    setloverClass(!loverClass)
  }


  useEffect(() => {
    //console.log('datail', mod)

  }, [mod])

  
  


  if (datailData === undefined) {return (<p>"로오오ㅗ딩"</p>) } 
  

    return (
      <div className='datail_back'>
        <p>
          <img src={datailData.fileImageUrl?._cdata} />
          <p className='close' onClick={() => { navi("/") }}> <img src='/react_food_script/close.png' /> </p>
        </p>
        <article className='contan datail'>
          <h2><p><img src='/react_food_script/Rectangle_19.png' /></p>빠뿅님의 {datailData.title?._cdata}</h2>
          <div>
            <button className={`lover ${loverClass ? 'on' : ''} `} onClick={() => { loverFn() }}></button>

            <div className='hashi'><span>#건강식</span> <span>#집밥</span> <span>#간편</span></div>
            {
              datailData.content._cdata.split('\n').map((line: string, index: number) => (
                (line.trim() != '') ? <p key={index}>{line}</p> : <hr key={index}/>
              ))
            }
            <button className='long_but' onClick={() => { clearbut() }}>조리 완료!</button>
            {
              (clear) ? (
                <>
                  <div className='list_butFup'>

                    <h2>재료정리 도와드릴까요?<p onClick={() => { navi('/') }}><img src='/react_food_script/close.png' /></p></h2>
                    <div>
                      <List_but />
                    </div>
                    <button className='long_but' onClick={() => { del(); navi('/'); setmod(false) }}> 정리하기 </button>
                  </div>
                </>
              ) : ''
            }
          </div>
        </article>
      </div >
    )
}

export default Datail