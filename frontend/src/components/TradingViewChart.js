import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { Box } from '@mui/material';

const TradingViewChart = () => {
  const chartContainerRef = useRef(null);
  const [candleSeries, setCandleSeries] = useState(null);
  const [candlestickData, setCandlestickData] = useState([]);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 550,
      layout: {
        background: '#1A1A1A',
        textColor: 'white',
      },
      grid: {
        vertLines: {
          color: '#424242',
          visible: true,
          style: 0,
        },
        horzLines: {
          color: '#424242',
          visible: true,
          style: 0,
        },
      },
      crosshair: {
        mode: 0,
      },
      rightPriceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
        fixLeftEdge: true,
        fixRightEdge: true,
        timeVisible: true,
        showTicks: true,
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: '#4BC2A3',
      downColor: '#E03737',
      borderDownColor: '#E03737',
      borderUpColor: '#4BC2A3',
      wickDownColor: '#E03737',
      wickUpColor: '#4BC2A3',
    });

    series.setData([
      {
        time: '2024-10-16',
        open: 26660.6,
        high: 26661.2,
        low: 26660.5,
        close: 26660.6,
      },
      {
        time: '2024-10-17',
        open: 26661.2,
        high: 26662.3,
        low: 26660.0,
        close: 26661.0,
      },
      {
        time: '2024-10-18',
        open: 26661.0,
        high: 26663.5,
        low: 26658.7,
        close: 26660.8,
      },
      {
        time: '2024-10-19',
        open: 26660.8,
        high: 26664.0,
        low: 26659.0,
        close: 26660.6,
      },
      {
        time: '2024-10-20',
        open: 26660.5,
        high: 26665.0,
        low: 26660.2,
        close: 26662.0,
      },
      {
        time: '2024-10-21',
        open: 26662.0,
        high: 26666.5,
        low: 26661.0,
        close: 26665.5,
      },
      {
        time: '2024-10-22',
        open: 26665.5,
        high: 26670.0,
        low: 26662.5,
        close: 26669.0,
      },
      {
        time: '2024-10-23',
        open: 26669.0,
        high: 26671.2,
        low: 26667.0,
        close: 26670.5,
      },
      {
        time: '2024-10-24',
        open: 26670.5,
        high: 26675.0,
        low: 26668.0,
        close: 26674.0,
      },
      {
        time: '2024-10-25',
        open: 26674.0,
        high: 26680.0,
        low: 26673.0,
        close: 26678.0,
      },
      {
        time: '2024-10-26',
        open: 26678.0,
        high: 26682.0,
        low: 26676.5,
        close: 26681.5,
      },
    ]);

    setCandleSeries(series);

    const fetchCandlestickData = async () => {
      const now = Date.now();
      const startTime = now - 30 * 60 * 1000;
      const countBack = 30;

      try {
        const response = await fetch(
          `https://serverprod.vest.exchange/v1/ohlcv/klines?symbol=ETH-PERP&interval=1m&startTime=${startTime}&endTime=${now}&countBack=${countBack}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const formattedData = data.map((item) => ({
            time: item[0],
            open: item[1],
            high: item[2],
            low: item[3],
            close: item[4],
          }));

          setCandlestickData(formattedData);
          candleSeries.setData(formattedData);
        } else {
          console.error('Expected data to be an array:', data);
        }
      } catch (error) {
        console.error('Error fetching candlestick data:', error);
      }
    };

    fetchCandlestickData();

    const ws = new WebSocket(
      'wss://wsprod.vest.exchange/ws-api?xwebsocketserver=restserver0&version=1.0'
    );

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params: ['ETH-PERP@kline_1m'],
        })
      );
    };

    ws.onmessage = (event) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const message = JSON.parse(e.target.result);
          if (message.channel === 'ETH-PERP@kline_1m') {
            const { k } = message.data;
            const newCandle = {
              time: k.t,
              open: k.o,
              high: k.h,
              low: k.l,
              close: k.c,
            };
            setCandlestickData((prev) => {
              const updatedData = [...prev, newCandle].slice(-100);
              candleSeries.setData(updatedData);
              return updatedData;
            });
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      reader.readAsText(event.data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ws.close();
      chart.remove();
    };
  }, []);

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
