import React from 'react';
import MainApp from './components/main'
import { store } from './components/redux/store'
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;