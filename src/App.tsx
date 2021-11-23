import React,{useState, useRef} from 'react';
import './App.css';


interface Note{
  id:string;
  plan: string;
  projectstate: string;
}

const App : React.FC=()=>{
  let textInputRef = useRef<HTMLInputElement>(null);
const [state, setstate] = useState<Note[]>([])
const[movingItem, setMovingItem] =useState()
const [show, setshow] = useState<Note[]>([])


function addnote(event : React.FormEvent){
  event.preventDefault();
  setstate(prevPlan => [   { id: Math.random().toString(), plan: textInputRef.current!.value , projectstate: "plan"},
    ...prevPlan
  ]);

}

function onDragStart(event:any){
  setMovingItem(event.target.id)
};


function onDragOver(event:React.FormEvent) {
  event.preventDefault();
}

function onDrop(event:any){
  const draggableElement = document!.getElementById!(movingItem!) as HTMLInputElement

  setshow(prevPlan => [   { id: draggableElement.id, plan: draggableElement.innerText , projectstate: event.target.id},
  ...prevPlan
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
 

 <div className="notesContainer">{state.map((plan,index)=> <div id={plan.id} draggable="true" onDrag={(event) =>{onDragStart(event)}} className="notes" key={index}>{plan.plan}</div>)}</div>
 </div>

 <div className="category">

 <table draggable="true" id="Plan"  onDragOver={(event) =>{onDragOver(event)}}
  onDrop={(event) =>{onDrop(event)}} >
    <th>Plan</th>
  
  {show.map((plan)=><>{plan.projectstate === "Plan"? <div className="notes">{plan.plan}</div> : "" }      </>)}
 
</table>


<table draggable="true" id="Processing"  onDragOver={(event) =>{onDragOver(event)}}
  onDrop={(event) =>{onDrop(event)}} >
    <th>Processing</th>
  
  {show.map((plan)=><>{plan.projectstate === "Processing"? <div className="notes">{plan.plan}</div> : "" }      </>)}
 
</table>

<table draggable="true" id="Finished"  onDragOver={(event) =>{onDragOver(event)}}
  onDrop={(event) =>{onDrop(event)}} >
    <th>Finished</th>
  
  {show.map((plan)=><>{plan.projectstate === "Finished"? <div className="notes">{plan.plan}</div> : "" }      </>)}
 
</table>
 </div>
 </div>
  </>
}

export default App;
