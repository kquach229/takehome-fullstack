import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { Box } from '@mui/material';
import useWebSocket from 'react-use-websocket';

const TradingViewChart = () => {
  const REST_URL = 'https://serverprod.vest.exchange/v1/ohlcv/klines';
  const WS_URL =
    'wss://wsprod.vest.exchange/ws-api?xwebsocketserver=restserver0&version=1.0';

  const chartContainerRef = useRef(null);
  const [candleSeries, setCandleSeries] = useState(null);
  const [candlestickData, setCandlestickData] = useState([]);

  const { sendMessage, lastMessage } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection opened');
      sendMessage(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params: ['ETH-PERP@kline_1m'],
          id: 1,
        })
      );
    },
    shouldReconnect: () => true,
  });

  // Fetch initial candlestick data
  useEffect(() => {
    const fetchCandlestickData = async () => {
      const now = Date.now();
      const endTime = Math.floor(now * 1e6);
      const startTime = Math.floor((now - 30 * 60 * 1000) * 1e6); // Last 30 minutes

      try {
        const response = await fetch(
          `${REST_URL}?symbol=ETH-PERP&interval=1m&startTime=${startTime}&endTime=${endTime}&countBack=100`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const formattedData = data.map((item) => ({
          time: Math.floor(item[0] / 1000), // Convert from milliseconds to seconds
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
        }));

        setCandlestickData(formattedData);

        // Update the chart with fetched data
        if (candleSeries) {
          candleSeries.setData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching candlestick data:', error);
      }
    };

    fetchCandlestickData();
  }, [candleSeries]); // Only runs when candleSeries is set

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 600,
      layout: { background: { color: '#1A1A1A' }, textColor: 'white' },
      grid: {
        vertLines: { color: '#424242' }, // Vertical gridline color
        horzLines: { color: '#424242' }, // Horizontal gridline color
      },
      crosshair: { mode: 0 },
      rightPriceScale: { borderColor: '#485c7b' },
      timeScale: {
        borderColor: '#485c7b',
        timeVisible: true,
        tickMarkFormatter: (time) => {
          const date = new Date(time * 1000); // Convert seconds to milliseconds
          return date.toLocaleTimeString(); // e.g., "10/25/2024 10:00 AM"
        },
        // Adjust this option for better vertical line spacing
        fixLeftEdge: true,
        fixRightEdge: true,
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: '#4BC2A3',
      downColor: '#E03737',
      borderUpColor: '#4BC2A3',
      borderDownColor: '#E03737',
      wickUpColor: '#4BC2A3',
      wickDownColor: '#E03737',
    });

    setCandleSeries(series); // Save series for future use

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!lastMessage || !candleSeries) return;

    const messageText = lastMessage.data.text(); // Convert Blob to text

    messageText.then((text) => {
      try {
        const message = JSON.parse(text);

        if (message.method === 'SUBSCRIBE' && message.result) {
          console.log('Successfully subscribed to ETH-PERP@kline_1m');
        }

        // Check for incoming candlestick data
        if (message.channel === 'ETH-PERP@kline_1m' && message.data) {
          const newCandleData = message.data;
          const newCandle = {
            time: Math.floor(newCandleData[0] / 1000),
            open: parseFloat(newCandleData[1]),
            high: parseFloat(newCandleData[2]),
            low: parseFloat(newCandleData[3]),
            close: parseFloat(newCandleData[4]),
          };

          setCandlestickData((prev) => {
            const updatedData = [...prev, newCandle];

            const uniqueSortedData = Array.from(
              new Map(updatedData.map((item) => [item.time, item])).values()
            ).sort((a, b) => a.time - b.time);

            const finalData = uniqueSortedData.slice(-100);

            candleSeries.setData(finalData);

            return finalData;
          });
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });
  }, [lastMessage, candleSeries]);

  return (
    <Box
      ref={chartContainerRef}
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    />
  );
};

export default TradingViewChart;
