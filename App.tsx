import React, { useRef, useState } from 'react';
import { View, PanResponder, Dimensions } from 'react-native';
import { VictoryScatter, VictoryChart, VictoryTheme } from 'victory-native';

const xData = [0, 1, 2, 3, 4];
const yData = [2, 1, 2, 3, 4];

const Graph = () => {
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const graphRef = useRef<any>(null);

  const handlePanResponderMove = (_: any, gestureState: { dx: any; dy: any; }) => {
    const { dx, dy } = gestureState;
    const { width, height } = Dimensions.get('window');
    const newX = offsetX - dx / scale;
    const newY = offsetY + dy / scale;

    if (newX >= 0 && newX <= width && newY >= 0 && newY <= height) {
      setOffsetX(newX);
      setOffsetY(newY);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
  });

  const handleZoom = (_: any, gestureState: { pinch: any; scale: any; }) => {
    const { pinch, scale } = gestureState;

    if (pinch && pinch !== 0) {
      setScale(scale);
    }
  };

  const zoomResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

  });

  const data = xData.map((x, index) => ({ x, y: yData[index] }));

  return (
    <View {...panResponder.panHandlers} {...zoomResponder.panHandlers}>
      <VictoryChart
        theme={VictoryTheme.material}
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height}
        domain={{ x: [0, 4], y: [0, 4] }}
        style={{ parent: { overflow: 'visible' } }}
        containerComponent={<View ref={graphRef} />}
        
     
      >
        <VictoryScatter data={data} style={{ data: { fill: 'red' } }} />
      </VictoryChart>
    </View>
  );
};

export default Graph;

