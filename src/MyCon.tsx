import axios from 'axios';
import { promises } from 'dns';
import { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import convert from 'xml-js';

export const Mycon = createContext<any>(null);


type Props = {
  children: React.ReactNode
}







const MyCon = ({ children }: Props) => {

  const [data, setData] = useState<any>([]);
  const [idxdata, setidxdata] = useState(0);
  const [datailData, setdatailData] = useState();
  const [foodData, setfoodData] = useState([]);
  const [pagenum, setpagenum] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [lover, setlover] = useState([]);
  const [mod, setmod] = useState(false);


  const key = '?serviceKey=xBEICBrNP80hSWFRTlYIa8RIgTZQBuFgyMr3iyCelmwoIPnrkfqTo0lJpjt6vII2mqwxn%2F6L5M30RNmxVOaO%2Fw%3D%3D&numOfRows=15';
  const page = `&pageNo=${pagenum}`;
  const search = searchValue == "" ? "" : `&searchType=2&searchWord=${searchValue}`
  const idx = `&idx=${idxdata}`
  const instans = axios.create({
    baseURL: 'https://apis.data.go.kr/1390804/NihhsRdaLifeInfo',
  })

  const food_type = ['/selectLifeList', '/selectLifeView']


  useEffect(() => {

    instans.get(food_type[0] + key + page + search)
      .then(res => {
        const xml = res.data;
        const result = convert.xml2json(xml, { compact: true, spaces: 4 });
        const json = JSON.parse(result);

        setfoodData(json.document.root.result);

        if(foodData === undefined){
          setTimeout(() => {setfoodData(json.document.root.result)}, 1000)
          console.log('작동1111111111');

        } 
      });
      
  }, [page, searchValue]);


  useEffect(() => {
    try{
      console.log('============a==============aaaa=================');
      
      if(idxdata){
        instans.get(food_type[1] + key + idx)

        .then(res => {
          const xml = res.data;
          const result = convert.xml2json(xml, { compact: true, spaces: 4 });
          const json = JSON.parse(result);

          setdatailData(json.document.root.result);

          if(datailData === undefined){
            setTimeout(() => {setdatailData(json.document.root.result)}, 1000)
            console.log('작동2222222222');
            
          }
        })
      }
    }catch{}
  }, [idxdata])


useEffect(()=>{

},[])







  //삭제
  const del = () => {
    setData(
      data.filter((item: { id: number, food: string, state: boolean }) => (item.state != true))
    )
    setmod(false)
  }

  //취소
  const cancel = () => {
    setData(
      data.map((v: { id: number, food: string, state: boolean }) => ({ ...v, state: false }))
    )
  }



  return (
    <Mycon.Provider value={{ data, setData, foodData, pagenum, setpagenum, setSearchValue, lover, setlover, setidxdata, datailData, cancel, del, mod, setmod }}>
      {children}
    </Mycon.Provider>
  )
}




export default MyCon



