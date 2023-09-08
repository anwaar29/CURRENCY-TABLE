import React, { useState } from 'react';

const CoinInfo = [
  { name: 'BTC', price: 25000 },
  { name: 'DOGE', price: 0.75 },
  { name: 'Ripple', price: 1.5 },
];

function Show() {
  const [quantity, setQuantity] = useState({ BTC: 0, DOGE: 0, Ripple: 0 });
  const [tableData, setTableData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const handleAddToTable = (name) => {
    if (quantity[name] > 0) {
      const coinData = { name, quantity: quantity[name], price: CoinInfo.find((coin) => coin.name === name).price };
      setTableData([...tableData, coinData]);
      setTotalValue(totalValue + quantity[name] * coinData.price);
    }
  };

  const handleQuantityChange = (e, name) => {
    const updatedQuantity = { ...quantity };
    updatedQuantity[name] = parseInt(e.target.value, 10) || 0;
    setQuantity(updatedQuantity);
  };

  return (
    <div className="App">
      
      <div className="coin-cards">
        {CoinInfo.map((coin) => (
          <div className="coin-card" key={coin.name}>
            <h2>{coin.name}</h2>
            <p>Price: ${coin.price}</p>
            <input
              type="number"
              placeholder="Quantity"
              value={quantity[coin.name]}
              onChange={(e) => handleQuantityChange(e, coin.name)}
            />
            <button onClick={() => handleAddToTable(coin.name)}>Add to Table</button>
          </div>
        ))}
      </div>
      <h2>Transaction Table</h2>
      <table>
        <thead>
          <tr>
            <th>Coin Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((coinData, index) => (
            <tr key={index}>
              <td>{coinData.name}</td>
              <td>{coinData.quantity}</td>
              <td>${coinData.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Value: ${totalValue.toFixed(2)}</h3>
    </div>
  );
}

export default Show;
