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

const reset = (event: React.FormEvent) =>{
  event.preventDefault()
  textInputRef.current!.value =""
}

  return<>
  <div className="page">
    <div className="addNotesContainer">
  <form onSubmit={addnote}>
  <label htmlFor="comment">Note</label>
          <input ref={textInputRef}/>
          <button>add note</button>
          <button onClick={reset} type="button">reset</button>
 </form>
 

 <div className="notesContainer">{state.map((note,index)=> <div className="notes" key={index}>{note.note}</div>)}</div>
 </div>

 <div className="category">
 <table >
  <tr >
    <th>Plan</th>
  </tr>
  <tr>
  <th className="Plan"></th>
  </tr>
</table>

<table >
  <tr >
    <th>Processing</th>
  </tr>
  <tr>
  <th className="Plan"></th>
  </tr>
</table>

<table >
  <tr >
    <th>Finished</th>
  </tr>
  <tr>
  <th className="Plan"></th>
  </tr>
</table>
 </div>
 </div>
  </>
}

export default App;
