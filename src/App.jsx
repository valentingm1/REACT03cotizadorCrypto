import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import imgcripto from "./img/imgcripto.png";
import Form from "./components/Form";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: "";
    width: 70%;
    height: 6px;
    background-color:  #76b8fa;
    margin: 10px auto 0 auto;
    display: block;
  }
`;
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`;

const Img = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

function App() {


  const [monedas,setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() =>{
    if(Object.keys(monedas).length > 0) {

      const cotizar = async() =>{
        setCargando(true)
        setResultado({})

        const {moneda, criptomoneda} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda])
        
        setCargando(false)
      } 
      cotizar()
    }
  },[monedas])

  return (
    <Contenedor>
      <Img src={imgcripto} alt="Logos de criptomonedas"/>
      <div>
        <Heading>Cotiza crypto al instante</Heading>
        <Form setMonedas={setMonedas}/> 
        {cargando && <Spinner/>}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
     
    </Contenedor>
  );
}

export default App;
