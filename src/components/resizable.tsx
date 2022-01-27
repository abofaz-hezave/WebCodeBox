import './resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableBoxProp: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableBoxProp = {
      className: 'resize-horizontal',
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ['e'],
    };
  } else {
    resizableBoxProp = {
      minConstraints: [Infinity, window.innerHeight * 0.1],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      height: window.innerHeight * 0.6,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return <ResizableBox {...resizableBoxProp}>{children}</ResizableBox>;
};

export default Resizable;
