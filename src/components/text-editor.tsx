import './text-editor.css';
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const MDEditorRef = useRef<HTMLDivElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editorValue, setEditorValue] = useState<string>('**Hello world!!!**');

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
          value={editorValue}
          onChange={(value) => setEditorValue(value || '')}
        />
      </div>
    );

  return (
    <div className="text-editor card" onClick={() => setIsEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={editorValue} />
      </div>
    </div>
  );
};

export default TextEditor;
