import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:9000");

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setData((data) => [...data, parsedData]);
    };

    eventSource.onerror = () => {
      console.log("Server closed connection !");
      eventSource.close();
    };
  }, []);

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h1>Stock prices of aTech and bTech (USD)</h1>
      <LineChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[20, 26]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="aTechStockPrice" stroke="#8884d8" />
        <Line type="monotone" dataKey="bTechStockPrice" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default App;
