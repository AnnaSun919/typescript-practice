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
  const plan = textInputRef.current!.value
  setstate(prevPlan => [   { id: Math.random().toString(), plan: plan , projectstate: "plan"},
    ...prevPlan
  ]);

  textInputRef.current!.value =""

}



function onDragStart(event:any){ 
  setMovingItem(event.target.id )
};


function onDragOver(event:React.FormEvent) {
  event.preventDefault();
}


function onDrop(_event:any, status: string){
  let draggableElement = document!.getElementById!(movingItem!) as HTMLInputElement
console.log(draggableElement.id)
  
 

  let filtered = state.filter((plan) => {
    return plan.id !== draggableElement.id;
  });

setstate(filtered)

setshow(prevPlan => [   { id:draggableElement.id, plan:draggableElement.innerText, projectstate:status},
...prevPlan.filter((plan)=>{return draggableElement.id !== plan.id })
]);


}







  return<>
  <div className="page">
    <div className="addNotesContainer">
  <form onSubmit={addnote}>
  <label htmlFor="comment">Note</label>
          <input ref={textInputRef}/>
          <button>add note</button>
        
 </form>
 

 <div className="notesContainer">{state.map((plan,index)=> <div id={plan.id} draggable="true" onDrag={(event) =>{onDragStart(event)}} className="notes" key={index}>{plan.plan}</div>)}</div>
 </div>

 <div className="category">

 <table id="Plan"  onDragOver={(event) =>{onDragOver(event)}}
  onDrop={(event) =>{onDrop(event,"Plan")}} >
    <th>Plan</th>
  
  {show.map((plan)=><>{plan.projectstate === "Plan"? <div  draggable="true" id={plan.id} onDrag={(event) =>{onDragStart(event)}}className="notes">{plan.plan}</div> : "" }      </>)}
 
</table>


<table  id="Processing"   onDragOver={(event) =>{onDragOver(event)}}
  onDrop={(event) =>{onDrop(event, "Processing")}}  >
    <th>Processing</th>
  
  {show.map((plan)=><>{plan.projectstate === "Processing"? <div draggable="true" id={plan.id} onDrag={(event) =>{onDragStart(event)}} className="notes">{plan.plan}</div> : "" }      </>)}
 
</table>

<table id="Finished"   onDragOver={(event) =>{onDragOver(event)}}
  onDrop={(event) =>{onDrop(event,"Finished")}} >
    <th>Finished</th>
  
  {show.map((plan)=><>{plan.projectstate === "Finished"? <div draggable="true"  id={plan.id} onDrag={(event) =>{onDragStart(event)}}  className="notes">{plan.plan}</div> : "" }      </>)}
 
</table>
 </div>
 </div>
  </>
}

export default App;
