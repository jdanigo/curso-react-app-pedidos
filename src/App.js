import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  //Javascript como lo conocemos
   
  //Mi primer hook
  const [dataForm, setDataForm] = React.useState({}); 
  const [contador, setContador] = React.useState(0); 
  const [nombre, setNombre] = React.useState(null); 
  const [apellido, setApellido] = React.useState(null); 
  const [edad, setEdad] = React.useState(null); 
 

  React.useEffect(()=>{
    //Todo lo que este aqui adentro, se va a ejecutar 1 sola vez cuando se renderiza
    // Puedo invocar funciones, variables o llamdas a apis externas
    
  },[]);

  React.useEffect(()=>{
    //Todo lo que este aqui adentro, se va a ejecutar 1 vez al montaje y otra vez por cada cambio que encuentre
    // en las dependencias
    // if(edad){
      
    // }
    saludar();

    return () => {
      // Fase de desmontaje.
      alert("hola")
    }
    
  },[edad]);

  React.useEffect(()=>{
    // Al no tener dependencias, se va a ejecutar cada que tengo un cambio de estado
    
  });
  

  const saludar = () => {
    console.log("saludando");
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDataForm({...dataForm, [name]:value})    
  }

  const handleClick = (tipo) => {
    if(tipo == "incrementar"){
      setContador((prevData)=> prevData + 1);
    }
    if(tipo == "decrementar")
    {
      setContador((prevData)=> prevData - 1);
    }
    
  }

  const submit = () => {
    console.log("mostrando datos del formulario", dataForm);
  }

  
 
  // codigo JSX , mismo html, pero con algunas variaciones
  return (
    <>
    <div className="">
      Mostrando el valor de contador : {contador}

    </div>
    <div className="formulario">
      <label htmlFor="">Nombres</label>
      <input type="text" name="nombre" onBlur={(e)=>setNombre(e.target.value)} />
    </div>

    <div className="formulario">
      <label htmlFor="">Apellidos</label>
      <input type="text" name="apellido" onBlur={(e)=>handleChange(e)} />
    </div>

    <div className="formulario">
      <label htmlFor="">Edad</label>
      <input type="text" name="edad" onBlur={(e)=>setEdad(e.target.value)} />
    </div>

    <button type="button" onClick={()=>handleClick("incrementar")} >Incrementar Contador</button>
    <button type="button" onClick={()=>handleClick("decrementar")} >Decrementar Contador</button>
    <button type="button" onClick={()=>submit()} >Enviar</button>
    como estas <br/>
    que tal te va <br/>
    
    </>
  );
}

export default App;
