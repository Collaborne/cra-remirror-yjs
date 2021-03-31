import React from 'react';
import { EditorComponent, Remirror, ThemeProvider, useRemirror } from '@remirror/react';
import '@remirror/styles/all.css';
import './App.css';

function App() {
  const { manager, onChange, state } = useRemirror({
    extensions: () => [],
    content: {"type":"doc","content":[{"type":"paragraph"}]},
  });

  return (
    <div className="App">
      <ThemeProvider>
        <Remirror manager={manager} onChange={onChange} state={state}>
          <EditorComponent />
        </Remirror>
      </ThemeProvider>
    </div>
  );
}

export default App;
