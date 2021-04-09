import React from 'react';
import { EditorComponent, Remirror, ThemeProvider, useRemirror } from '@remirror/react';
import { YjsExtension } from '@remirror/extension-yjs';
import '@remirror/styles/all.css';
import { WebrtcProvider } from 'y-webrtc';
import { Doc } from 'yjs';

import './App.css';
import { Awareness } from 'y-protocols/awareness';

const ydoc = new Doc();
const webrtcProvider = (roomName: string, ydoc: Doc) => new WebrtcProvider(roomName, ydoc);
const ROOM_NAME = 'cra-remirror-yjs-room';

const yjsExtension = new YjsExtension({
  getProvider: () => {
    const webrtc = webrtcProvider(ROOM_NAME, ydoc);
    const awareness = webrtc.awareness;
    awareness.on('change', () => {
      console.log(Array.from(awareness.getStates().values()))
    });
    awareness.setLocalStateField('user', {
      name: `user-${Math.round(10000 * Math.random())}`,
      objectId: Math.round(10000 * Math.random()),
    });

    return {
      awareness: webrtc.awareness,
      destroy: () => {
        webrtc.destroy();
      },
      disconnect: () => {
        webrtc.disconnect();
      },
      doc: ydoc,
    };
  },
});

function App() {
  const { manager } = useRemirror({
    extensions: () => [yjsExtension],
  });

  return (
    <div className="App">
      <ThemeProvider>
        <Remirror manager={manager}>
          <EditorComponent />
        </Remirror>
      </ThemeProvider>
    </div>
  );
}

export default App;
