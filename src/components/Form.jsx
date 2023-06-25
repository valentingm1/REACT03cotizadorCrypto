import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import useSelectCurrency from "../hooks/useSelectCurrency"
import { monedas } from "../data/monedas"
import Error from "./Error"

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




const Form = ({setMonedas}) => {

    const [criptos,setCripto] = useState([])

    const [moneda, SelectCurrency] = useSelectCurrency("Eligí tu moneda", monedas)

    const [criptomoneda, SelectCripto] = useSelectCurrency("Eligí tu Criptomoneda", criptos)

    const [error, setError] = useState(false)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const respuesta = await (fetch(url))
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })

            setCripto(arrayCriptos)


        }
        consultarAPI();
    }, [])
    
    const handleSubmit = e => {
        e.preventDefault()
        
        if([moneda,criptomoneda].includes("")){
            setError(true)
            return
        }
            setError(false)
        setMonedas({
            moneda,criptomoneda
        })

        
    }

  return (
    <>
    {error && <Error>Todos los campos son obligatorios</Error>}
    <form onSubmit={handleSubmit}>
        <SelectCurrency/>
        <SelectCripto/>

        <InputSubmit type="submit" value="Cotizar" />
    </form>
    </>
  )
}

export default Form