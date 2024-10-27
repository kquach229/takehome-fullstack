import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { Box, Button } from '@mui/material';
import useWebSocket from 'react-use-websocket';

const TradingViewChart = () => {
  const REST_URL = 'https://serverprod.vest.exchange/v1/ohlcv/klines';
  const WS_URL =
    'wss://wsprod.vest.exchange/ws-api?xwebsocketserver=restserver0&version=1.0';

  const chartContainerRef = useRef(null);
  const [candleSeries, setCandleSeries] = useState(null);
  const [candlestickData, setCandlestickData] = useState([]);
  const [emojiPositions, setEmojiPositions] = useState([]);

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

  useEffect(() => {
    const fetchCandlestickData = async () => {
      const now = Date.now();
      const endTime = Math.floor(now * 1e6);
      const startTime = Math.floor((now - 30 * 60 * 1000) * 1e6);

      try {
        const response = await fetch(
          `${REST_URL}?symbol=ETH-PERP&interval=1m&startTime=${startTime}&endTime=${endTime}&countBack=100`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const formattedData = data.map((item) => ({
          time: Math.floor(item[0] / 1000),
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
        }));

        setCandlestickData(formattedData);
        if (candleSeries) {
          candleSeries.setData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching candlestick data:', error);
      }
    };

    fetchCandlestickData();
  }, [candleSeries]);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 600,
      layout: { background: { color: '#1A1A1A' }, textColor: 'white' },
      grid: {
        vertLines: { color: '#424242' },
        horzLines: { color: '#424242' },
      },
      crosshair: { mode: 0 },
      rightPriceScale: { borderColor: '#485c7b' },
      timeScale: {
        borderColor: '#485c7b',
        timeVisible: true,
        tickMarkFormatter: (time) => {
          const date = new Date(time * 1000);
          return date.toLocaleTimeString();
        },
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

    setCandleSeries(series);

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

    const messageText = lastMessage.data.text();

    messageText.then((text) => {
      try {
        const message = JSON.parse(text);

        if (message.method === 'SUBSCRIBE' && message.result) {
          console.log('Successfully subscribed to ETH-PERP@kline_1m');
        }

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

  const handleDrop = (e) => {
    e.preventDefault();
    const emoji = e.dataTransfer.getData('text/plain');
    const rect = chartContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setEmojiPositions((prev) => [...prev, { x, y, emoji }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const emojiList = ['🚀', '😍', '😡', '😭', '😱', '👎'];

  return (
    <Box onDrop={handleDrop} onDragOver={handleDragOver} position='relative'>
      <Box ref={chartContainerRef} />
      <Box
        position='absolute'
        display={'flex'}
        flexDirection='row'
        left={0}
        top={0}
        zIndex={25}>
        {emojiPositions.map((pos, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              fontSize: '24px',
              pointerEvents: 'none',
            }}>
            {pos.emoji}
          </div>
        ))}
      </Box>
      <Box
        display='flex'
        flexDirection='row'
        sx={{
          backgroundColor: '#252525',
          borderRadius: '24px',
          padding: '8px 16px 8px 16px',
          left: '0',
        }}
        bgcolor='rgba(0, 0, 0, 0.5)'
        position='absolute'
        top='650px'
        height='41px'
        width='260px'
        justifyContent='space-evenly'
        gap={2}
        zIndex={2}>
        {emojiList.map((emoji) => (
          <span
            style={{ cursor: 'pointer' }}
            key={emoji}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', emoji);
            }}>
            {emoji}
          </span>
        ))}
      </Box>
    </Box>
  );
};

export default TradingViewChart;
