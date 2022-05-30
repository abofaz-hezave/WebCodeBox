import './text-editor.css';
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const MDEditorRef = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const outSideClick = (event: MouseEvent) => {
      if (!MDEditorRef?.current) return;
      if (!event?.target) return;
      if (MDEditorRef?.current?.contains(event?.target as Node)) return;
      setIsEditing(false);
    };
    document.addEventListener('click', outSideClick, { capture: true });

    return () => {
      document.removeEventListener('click', outSideClick, { capture: true });
    };
  }, []);

  if (isEditing)
    return (
      <div className="text-editor" ref={MDEditorRef}>
        <MDEditor
          value={cell.content}
          onChange={(value) => updateCell(cell.id, value || '')}
        />
      </div>
    );

  return (
    <div className="text-editor card" onClick={() => setIsEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content} />
      </div>
    </div>
  );
};

export default TextEditor;
