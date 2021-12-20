/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import moment from 'moment';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Calendar from '../../Calendar';


const App = () => {

  const [shown, setShown] = React.useState(false)

  return (
    <SafeAreaView>
      {shown && <Calendar calendarStartDate={'12/12/2021'} calendarEndDate={'12/14/2021'} modalCalendarShown={shown} onClose={() => { setShown(false) }} onDateChange={(s, e) => {
        console.log(s, e);
      }} />}
      <Button title={'click me'} onPress={() => { setShown(true) }} />

    </SafeAreaView>
  );
};


export default App;
