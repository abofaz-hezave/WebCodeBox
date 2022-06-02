import './resizable.scss';
import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableBoxProp: ResizableBoxProps;
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [boxWidth, setBoxWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let resizeTimer: any;
    const resizeListener = () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      setTimeout(() => {
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
      }, 100);
      if (window.innerWidth * 0.75 < boxWidth) {
        setBoxWidth(window.innerWidth * 0.75);
      }
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  if (direction === 'horizontal') {
    resizableBoxProp = {
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      width: boxWidth,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setBoxWidth(data?.size?.width);
      },
    };
  } else {
    resizableBoxProp = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return <ResizableBox {...resizableBoxProp}>{children}</ResizableBox>;
};

export default Resizable;
