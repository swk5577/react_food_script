import React, { useContext, useState } from 'react'
import { Mycon } from '../MyCon'
import List_but from './List_but'

type Props = {}

function Del({ }: Props) {
  const { data, setData,cancel, del} = useContext(Mycon)



  return (
    <article>
      <h2>모두사용한 식제료가 있으신가요?</h2>
      <button onClick={cancel}>X</button>
    <List_but/>
      <button onClick={()=>del()}>확인</button>
    </article>
  )
}

export default Del