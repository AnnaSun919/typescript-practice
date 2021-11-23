import React,{useState, useRef} from 'react';
import './App.css';

type drag = {
  onDrag: (event: React.FormEvent, index:string) => void;
};

//status of the notes
enum planStatus {
  Plan,
  Processing,
  Finished
  
}

interface Note{
  id:string;
  plan: string;
}

const App : React.FC=()=>{
  let textInputRef = useRef<HTMLInputElement>(null);
const [state, setstate] = useState<Note[]>([])

function addnote(event : React.FormEvent){
  event.preventDefault();
  setstate(prevPlan => [   { id: Math.random().toString(), plan: textInputRef.current!.value },
    ...prevPlan
  ]);

}

function ondragstart(event:any){

  event
  .dataTransfer
  .setData('text/plain', event.target.id);

  event
  .currentTarget
  .style
  .backgroundColor = 'yellow';
 
 
 


};

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
 

 <div className="notesContainer">{state.map((plan,index)=> <div id={plan.id} draggable="true" onDrag={(event) =>{ondragstart(event)}} className="notes" key={index}>{plan.plan}</div>)}</div>
 </div>

 <div className="category">
 <table >
  <tr >
    <th >Plan</th>
  </tr>
  <tr>
  <th draggable="true" className="Plan" 
  ></th>
  </tr>
</table>

<table >
  <tr >
    <th>Processing</th>
  </tr>
  <tr>
  <th draggable="true" className="Processing"></th>
  </tr>
</table>

<table >
  <tr >
    <th>Finished</th>
  </tr>
  <tr>
  <th draggable="true" className="Finished"></th>
  </tr>
</table>
 </div>
 </div>
  </>
}

export default App;
