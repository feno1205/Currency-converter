import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const[exchangeRate,setExchangeRate] = useState({})
  const [amount,setAmount] = useState(1)
  const [fromCurrency,setFromCurrency] = useState('USD')
  const [toCurrency,setToCurrency] = useState('INR')
  const [convertedAmount,setConvertedAmount] =useState(null)

  useEffect(()=>{

    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    axios.get(apiUrl)
    .then(response=>{
      setExchangeRate(response.data.rates);
    }) 
    .catch(error=>{
      console.error('Error fetching exchange rates:',error);
    });
  },[fromCurrency])

  useEffect(()=>{
    const conversionRates = exchangeRate[toCurrency]
    if(conversionRates){
      const converted = amount * conversionRates
      setConvertedAmount(converted.toFixed(2))
    }
  },[amount,fromCurrency,toCurrency,exchangeRate])

  const handleChange =(e)=>{

    const{name,value} = e.target

    switch(name) {
      case 'amount':
        setAmount(value)
        break

        case 'fromCurrency':
          setFromCurrency(value)
          break

          case 'toCurrency':
            setToCurrency(value)
            break
    }
  }

  return (
    <div className="App">
      <img src="https://i.postimg.cc/SRJQ1bJS/63478-converter-exchange-symbol-foreign-currency-rate-market.png" alt="img" />
      <h1 className='text-icon'>Currency Converter</h1>
      <div className="currency-exchange">
        <div className="input-container">
          <label className='input-label'>Amount</label>
          <input type="number" name='amount' value={amount} className='input-field' onChange={(e)=>handleChange(e)}/>
        </div>
        <div className="input-container">
          <label className='input-label'>From Currency</label>
          <select name="fromCurrency" value={fromCurrency} onChange={handleChange} className='input-field'>
            {
              Object.keys(exchangeRate).map(currency =>(
                <option keys={currency} value={currency}>
                  {currency}
                </option>
              ))
            }
          </select>
        </div>
        <div className="input-container">
          <label className='input-label'>To Currency</label>
          <select name="toCurrency" value={toCurrency} onChange={handleChange} className='input-field'>
          {
              Object.keys(exchangeRate).map(currency =>(
                <option keys={currency} value={currency}>
                  {currency}
                </option>
              ))
            }
          </select>
        </div>
      </div>
      <div className="output">
        <h2>Converted Amount <b>{convertedAmount}</b></h2>

      </div>
    </div>
  );
}

export default App;
