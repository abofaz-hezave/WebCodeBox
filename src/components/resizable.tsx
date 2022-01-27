import './resizable.css';
import { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import Preview from './preview';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  // const [input, setInput] = useState('');
  // const [code, setCode] = useState('');

  return (
    <ResizableBox
      minConstraints={[Infinity, window.innerHeight * 0.1]}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      height={300}
      width={Infinity}
      resizeHandles={['s']}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
