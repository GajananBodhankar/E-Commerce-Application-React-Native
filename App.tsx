import React from 'react';
import {Provider} from 'react-redux';
import NavG from './RN_training/Assignment/navigation';
import RedStore from './RN_training/Assignment/Redux/Store';

const App = () => {
  return (
    <Provider store={RedStore}>
      <NavG />
    </Provider>
  );
};
export default App;
