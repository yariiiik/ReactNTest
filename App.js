
import { Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import Tabs from './tabs';

export default function App() {
  
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
      const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
          setKeyboardStatus(true);
      });
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
          setKeyboardStatus(false);
      }); 

      return () => {
          showSubscription.remove();
          hideSubscription.remove();
      };
  }, []);

  return (
    <Tabs keyboardStatus={keyboardStatus}/>
  );
}


