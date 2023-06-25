import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import useSelectCurrency from "../hooks/useSelectCurrency"
import {monedas} from "../data/monedas"

const InputSubmit = styled.input`
background-color: #1b962e;
border: none;
width: 100%;
padding: 10px;
color: #fff;
font-weight: 700;
text-transform: uppercase;
font-size: 20px;
border-radius: 10px;
cursor: pointer;
transition: background-color .3s ease;
margin-top: 30px;

&:hover{
    background-color: #165711;
}
`




const Form = () => {

    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const respuesta = await (fetch(url))
            const resultado = await respuesta.json()

            const arrayCryptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })


        }
        consultarAPI();
    }, [])
    

    const [moneda, SelectCurrency] = useSelectCurrency("Elige tu moneda", monedas)


  return (
    <form action="">
        <SelectCurrency/>
        {moneda}
        <InputSubmit type="submit" value="Cotizar" />
    </form>
  )
}

export default Form