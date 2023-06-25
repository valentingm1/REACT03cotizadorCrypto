import { useState } from "react";
import styled from "@emotion/styled";
import imgcripto from "./img/imgcripto.png";
import Form from "./components/Form";

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
//#1b65d4;
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
  return (
    <Contenedor>
      <Img src={imgcripto} alt="Logos de criptomonedas"/>
      <div>
        <Heading>Cotiza crypto al instante</Heading>
        <Form/>
      </div>
    </Contenedor>
  );
}

export default App;
