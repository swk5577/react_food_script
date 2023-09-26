import React, { useContext, useEffect, useState, } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Mycon } from '../MyCon';
import List_but from './List_but';

type Props = {

}

function Datail({ }: Props) {
  const pram = useParams();

  const { data, datailData, del,setidxdata, setmod, lover,setlover } = useContext(Mycon);
  const navi = useNavigate();
  const [clear,setClear] = useState(false);


  const clearbut = () => {
    if(data.length != 0){
      setmod(true)
      setClear(true)
    }else{
      setClear(false)
      navi('/')
    }
  
  }

  useEffect(() => {
    setidxdata(pram.idx);
    
  }, [pram])
  
  console.log(lover);

  const loverFn = ()=>{
    if(lover.includes(pram.idx)){

      setlover(lover.filter((v:string)=>(v != pram.idx)))
    }else{

      setlover([...lover, pram.idx])
    }
  }

  
  if (datailData === undefined) { return (<p>"로오오ㅗ딩"</p>) }
  

  return (

    <div className=''>
      <p>
        <img src={datailData.fileImageUrl?._cdata} />
      </p>
      <article className='contan datail'>
        <div>
          <button className={`lover ${lover.includes(pram.idx)? 'on':"" } `}  onClick={loverFn}></button>
          <h2>{datailData.title?._cdata}</h2>
          {
            datailData.content._cdata.split('\n').map((line: string, index: number) => (
              (line.trim() != '') ? <p key={index}>{line}</p> : <p className='lin'></p>
            ))
          }
          <button className='long_but' onClick={()=>{clearbut()}}>조리 완료!</button>
          {
              (clear) ? (
                <>
                  <div className='list_butFup'>
                    <div>
                      <p onClick={()=>{navi('/')}}><img src='./close.png'/></p>
                      <h2>재료정리 도와드릴까요?</h2>
                      <List_but />
                    </div>
                  <button className='long_but' onClick={()=>{del(); navi('/'); setmod(false)}}> 정리하기 </button>
                  </div>
                </> 
              ):''
          }
        </div>
      </article>
    </div >

  )
}

export default Datail