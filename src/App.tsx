import React,{useState} from 'react';
import './App.css';

interface Note{
  id:string;
  note: string;
}

const App : React.FC=()=>{
const [state, setstate] = useState<Note[]>([])

function addnote(){

}

  return<>
  <form onSubmit={addnote}>
  <input type="text" placeholder="Please enter note"/>
  <button type="submit" >add note</button>
 </form>
  </>
}

export default App;
