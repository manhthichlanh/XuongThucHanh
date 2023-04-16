import React, { useState, useEffect } from 'react';
import WheelComponent from 'react-wheel-of-prizes';

const spinner = () => {

  const [segments, setSegments] = useState( [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ]);

  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ]
  const onFinished = (winner) => {
    handleResult(winner)

  }
  const handleResult=(winner)=>{


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
   
   
                                    `
                                    +
                                    +32   2.
                                    ..3                                                                                                                       ` const newSegments = segments.filter(item => item !== winner);
    setSegments([...newSegments]);
    console.log(`New Segments: ${segments}`);
  }


  return (
    <>
       <WheelComponent
      segments={segments}
      segColors={segColors}
      onFinished={onFinished}
      primaryColor='black'
      contrastColor='white'
      buttonText='Spin'
      isOnlyOnce={false}
      size={290}
      upDuration={100}
      downDuration={1000}
      fontFamily='Arial'
    />
    </>
 
  );
}

export default spinner;