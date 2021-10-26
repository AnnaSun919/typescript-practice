import React,{useState, useRef} from 'react';
import './App.css';

interface Note{
  id:string;
  note: string;
}

const App : React.FC=()=>{
  let textInputRef = useRef<HTMLInputElement>(null);
const [state, setstate] = useState<Note[]>([])

function addnote(event : React.FormEvent){
  event.preventDefault();
  setstate(prevNote => [   { id: Math.random().toString(), note: textInputRef.current!.value },
    ...prevNote
  ]);

}

function reset(event : React.FormEvent){
  event.preventDefault();
  textInputRef.current!.value =""

}




  return<>
  <form onSubmit={addnote}>
  <label htmlFor="comment">Comment</label>
          <input ref={textInputRef}/>
      
          <button>add note</button>
          <button onClick={reset} type="button">reset</button>
 </form>

 <div className="notes">{state.map((note,index)=> <div key={index}>{note.note}</div>)}</div>
  </>
}

export default App;
