# React-native Date Range Picker

This component can be integrated in all react native projects by simply installing it and integrate it as defined in example. You can configure all colors and text as well.

The package is both Android and iOS compatible

<div align="center">
  <img width="436" heigth="398" src="https://check-ankit.s3.us-east-2.amazonaws.com/Screenshot+2021-12-14+at+8.56.14+AM.png">
</div>

Ultimate calendar for your React native app.

1. Can select dates in range between weeks, months and years
2. Supports theme chagnes for colors.
3. Date range is flexible from 1 to 4

## Prerequisites 
1. Node v12 and above. 
2. NPM 6.* and above.
3. React-Native 0.63 and above.


## Installation
1. Install by executing `npm install ee-react-native-calendar` or `yarn add ee-react-native-calendar`.
2. Import by adding `import Calendar from 'ee-react-native-calendar'`.
3. Use by adding `<Calendar />`. Use `onDateChange` prop for getting new values.

## Demo

A minimal demo page can be found in `Sample/DateRangePicker` directory.

<!-- [Online demo](https://snack.expo.dev/@ankitpat/react-native-date-range-picker) is also available! -->

## Example usage 

```sh
import Calendar from './src';


const App = () => {

  const [shown, setShown] = React.useState(false)

  return (
    <SafeAreaView>
      {shown && <Calendar calendarStartDate={'12/12/2021'} calendarEndDate={'12/14/2021'} modalCalendarShown={shown} setModalCalendarShown={setShown} onClose={() => { setShown(false) }} onDateChange={(s, e) => {
        console.log(s, e);
      }} />}
      <Button title={'click me'} onPress={() => { setShown(true) }} />

    </SafeAreaView>
  );
};
```

## User guide

### Calendar

Displays a complete calendar with date range picking options

#### Props

|Prop name|Description|Default value|Required|
|----|----|----|----|
|calendarStartDate|Show pass a date to initial calendar modal, if pass empty nothing happens|Empty|false|
|calendarEndDate|Show pass a date to initial calendar modal, if pass empty nothing happens|Empty|false|
|setModalCalendarShown|Need to pass method, that will be called for handling show/hide of modal.|() => {}|true|
|modalCalendarShown|Boolean value to define, when to show modal|false|true|
|onClose|Method to be called on close of modal|() => {}|true|
|onDateChange|Method to be called on submit click after date selection.|(start,end) => {}|true|
|theme|To configure UI and colors of calendar modal| ```{selectedDateTextColor: 'white',selectedDateBackgroundColor: 'red',subHeaderBackgroundColor: 'lightgreen',subHeaderDateTextColor: 'black',flexibleDateBackgroundColor: 'green',flexibleDateNotSelectedBackgroundColor: 'lightgrey',flexibleDateTextColor: 'white',selectedDateMarkColor: '#ededed',selectedMarkTextColor: '#000',flexibleDateContainerBackgroundColor: 'white',buttonBackgroundColor: 'green',buttonStyle: {backgroundColor: 'green',},buttonTextStyle: {color: 'white',fontSize: 14, title: 'Calendar'}}```|
