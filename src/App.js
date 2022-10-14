import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import {v4 as uuidv4} from "uuid";

function App() {

  const [mainStore,setMainStore] = useState([{
                                    id:"01",
                                    first_name : "Wajahat",
                                    last_name : "Ali",
                                    date_of_birth : "1995-12-13",
                                    contact : "923133438881"
                                  }]);
  const [firstName,setFirstName] = useState();
  const [lastName,setLastName] = useState();
  const [dob,setDOB] = useState();
  const [contact,setContact] = useState();
  const [edit,setEdit] = useState(-1);

  useEffect(()=>{
    console.log("rendering")
  },[mainStore]);


  const handleSubmit = (e) =>{
      e.preventDefault();
      let people = mainStore;
      if(edit === -1 ){
          let id = uuidv4();
          people.push({
            id:id,
            first_name : firstName,
            last_name : lastName,
            date_of_birth : dob,
            contact : contact
          });    
        setMainStore(people);
      }else{
        people[edit] = {
          id:people[edit].id,
          first_name : firstName,
          last_name : lastName,
          date_of_birth : dob,
          contact : contact
        }
        setMainStore(people);
      }
      refersh();
  }

  const refersh = ()=>{
    setFirstName("");
    setLastName("");
    setContact("");
    setDOB("");
  }

  const handleEdit = (key)=>{
      setFirstName(mainStore[key].first_name);
      setLastName(mainStore[key].last_name);
      setContact(mainStore[key].contact);
      setDOB(mainStore[key].date_of_birth);
  }

  const handlleDelete = (key)=>{
    console.log("Delete");
    let people = mainStore;
    people.splice(key,1);
    setMainStore(people);
    refersh();
  }

  return (
    <div className="App">
      <header className="App-header">
          Address Book
      </header>
      <div className='container d-flex justify-content-center w-100'>
        <div>
          <form onSubmit={(e)=>{!edit ? handleSubmit(e) : handleSubmit(e,edit)}} className="form border border-5 rounded p-5 m-5 justify-content-center">
              <input type="text" value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="First Name" className='form-control d-block m-3' name="first_name" required/>
              <input type="text" value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Last Name" className='form-control d-block m-3' name="last_name" required/>
              <input type="date" value={dob} onChange={e=>setDOB(e.target.value)} placeholder='Enter Date of Birth' className='form-control d-block m-3' name="dob" required/>
              <input type="text" maxLength={13} onInput={(e)=>{e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');}} pattern="[0-9]+" value={contact} onChange={e=>setContact(e.target.value)} placeholder="Contact Number"  className='form-control d-block m-3' name="phone" required/>
              <input type="submit" className='btn btn-block btn-outline-primary rounded-pill' name="submit" value={!edit ? "Add to Address Book" : "Update to Address Book"}/>    
          </form>
        </div>
        {mainStore &&   
              <div>
              <ul className="list-group m-5 p-3">
                 {mainStore.map((value,key)=>{
                     return (
                         <li key={key} onDoubleClick={()=>{ handlleDelete(key);}} onClick={()=>{setEdit(key);  handleEdit(key);}} className="list-group-item">{value.first_name + " -> " + value.last_name  + " -> " + value.date_of_birth  + " -> " + value.contact}</li>
                     )
                 })
                 }
             </ul>
     
         </div>
        } 
      </div>

    </div>

  );
}

export default App;
