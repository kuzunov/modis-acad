import React, { createContext, useContext, useState } from 'react';
import logo from './logo.svg';
import Comment from './Components/Comment';
import {CommentT, Status} from './model/CommentT'
import './App.css';
import CommentList from './Components/CommentsList';
import CommentsController from './Components/CommentsController';
import Header from './Components/Header';

type CommentContextT = {
  latest:CommentT,
  setLatest:(c:CommentT) => void
}
export const CommentContext = createContext<CommentContextT>({
  latest: {} as CommentT,
  setLatest: () => {}
})


function App() {


  const [latest, setLatest] = useState<CommentT>({} as CommentT);

  return (
    <div className="App">
      {/* <CommentContext.Provider value={{slatest,setLatest}}> */}
        <Header latest = {latest}/>
        <CommentsController setLatest = {setLatest} latest={latest}/>
      {/* </CommentContext.Provider> */}
    </div>
  );
}
export default App;
