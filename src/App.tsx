import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import  MyCon  from './MyCon';
import Home from './page/Home';
import List from './page/List';
import Datail from './page/Datail';
import Del from './page/Del';
import Lover from './page/Lover';
import List_but from './page/List_but';
import New from './page/New';

function App() {
  return (
    <BrowserRouter>


      <main>
        <MyCon>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/list"element={<List/>}></Route>
            <Route path ="/lover" element={<Lover/>}></Route>
            <Route path="/datail/:idx" element={<Datail/>}></Route>
            <Route path="del" element={<Del/>}></Route>
            <Route path="list_but" element={<List_but/>}></Route>
            {/* <Route path="/new" element={<New />}></Route> */}
          </Routes>
        </MyCon>
      </main>
    </BrowserRouter>
  );
}

export default App;
