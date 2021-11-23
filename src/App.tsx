import { stat } from 'fs';
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



function onDragStart(event:any, plan:any){

  setMovingItem(event.target.id)
  console.log(plan)
};


function onDragOver(event:React.FormEvent) {
  event.preventDefault();
}

function onDrop(event:any, status: string){
  let draggableElement = document!.getElementById!(movingItem!) as HTMLInputElement

  
 

  let filtered = state.filter((plan) => {
    return plan.id !== draggableElement.id;
  });

setstate(filtered)



  setshow( [{ id: draggableElement.id, plan: draggableElement.innerText , projectstate: status}]);

}

console.log(show)

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
 

 <div className="notesContainer">{state.map((plan,index)=> <div id={plan.id} draggable="true" onDrag={(event) =>{onDragStart(event,plan.id)}} className="notes" key={index}>{plan.plan}</div>)}</div>
 </div>

 <div className="category">

 <table draggable="true" id="Plan"  onDragOver={(event) =>{onDragOver(event)}}
  onDrop={(event) =>{onDrop(event,"Plan")}} >
    <th>Plan</th>
  
  {show.map((plan)=><>{plan.projectstate === "Plan"? <div id={plan.id} onDrag={(event) =>{onDragStart(event,plan.id)}}className="notes">{plan.plan}</div> : "" }      </>)}
 
</table>


<table draggable="true" id="Processing"   onDragOver={(event) =>{onDragOver(event)}}
  onDrop={(event) =>{onDrop(event, "Processing")}}  >
    <th>Processing</th>
  
  {show.map((plan)=><>{plan.projectstate === "Processing"? <div id={plan.id} onDrag={(event) =>{onDragStart(event,plan.id)}} className="notes">{plan.plan}</div> : "" }      </>)}
 
</table>

<table draggable="true" id="Finished"   onDragOver={(event) =>{onDragOver(event)}}
  onDrop={(event) =>{onDrop(event,"Finished")}} >
    <th>Finished</th>
  
  {show.map((plan)=><>{plan.projectstate === "Finished"? <div id={plan.id} onDrag={(event) =>{onDragStart(event,plan.id)}}  className="notes">{plan.plan}</div> : "" }      </>)}
 
</table>
 </div>
 </div>
  </>
}

export default App;
