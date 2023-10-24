import React, { useContext, useState } from 'react'
import { Mycon } from '../MyCon'
import { Link, useNavigate, } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

type Props = {}

const Lover = (props: Props) => {
  const { lover } = useContext(Mycon)
  const navi = useNavigate();
  const [subOn, setsubOn] = useState(false);
  const [view, inView] = useInView()



  return (
    <>
      <div ref={view} className='header'>
        <div className='HDtop'><p><img src='/react_food_script/ice_box.png' alt="" /></p> <h2 onClick={() => window.scrollTo(0, 0)}>맛있었던 레시피!</h2> <p onClick={() => setsubOn(true)}><img src='/react_food_script/berger.png'></img></p></div>
        <div className={`header_box ${subOn ? 'on' : ''}`}>
          <div className={`sub_box`}>
            <p onClick={() => setsubOn(false)}><img src='/react_food_script/close.png' /></p>
            <Link to="/" onClick={() => { setsubOn(false) }}>추천 레시피</Link>
            <Link to="/lover" onClick={() => { setsubOn(false) }}>좋아요한 레시피</Link>
            {/* <Link to="/new">나의 레시피 등록하기</Link> */}
          </div>
        </div>

      </div>
      <div className='contan home'>
        <ul >{
          (lover.length == 0) ? (<p>맘에드는 요리가 아직 없나요?</p>)
            : (
              lover.map((v: any, k: number) => (
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
        </ul>
      <div className={`top ${inView? "":"on"}`}>
        <p onClick={()=>{window.scrollTo({top:0, behavior: 'smooth'})}}>Top</p>
      </div>
      </div>
    </>
  )
}

export default Lover