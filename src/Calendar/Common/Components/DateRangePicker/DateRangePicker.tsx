
import moment from 'moment';
import React from "react";
import { View } from "react-native";
import { Calendar, CalendarList } from "react-native-calendars";

/***
 * Actual calendar methods and all manipulations code for changing date and its ranges
 */
interface Props {
  navigation: any;
  language: string;
  onRequest: Function;
  searchStream: string;
  startDate: string;
  initialRange: string;
  onSuccess: (fromDate, toDate) => void;
  onResetRange: () => void;
  theme: any;
  isFromFilter: boolean;
}
let range: number;
let pastRange: number;
range = 0;
pastRange = 0;

const DateRangePicker = (props: Props) => {

  const [state, setState] = React.useState({
    isFromDatePicked: false,
    isToDatePicked: false,
    markedDates: {},
    sdate: "",
    edate: "",
    fromDate: "",

  })

  // To Call initial range on mount and change on start date as well
  React.useEffect(() => {
    setupInitialRange()

  }, [])

  React.useEffect(() => {
    setupInitialRange()
  }, [props.startDate])


  // Method actually creating initial marking range based on start and end date passed
  const setupInitialRange = () => {
    if (!props.initialRange) return;
    let [fromDate, toDate] = props.initialRange;
    setState({
      ...state,
      sdate: fromDate,
      edate: toDate,
    });
    let markedDates = {
      [fromDate]: {
        startingDay: true,
        color: props.theme.selectedDateBackgroundColor,
        textColor: props.theme.selectedDateTextColor,
      },
    };
    let [mMarkedDates, range] = setupMarkedDates(
      fromDate,
      toDate,
      markedDates,
    );
    setState({ ...state, markedDates: mMarkedDates, fromDate: fromDate });
  };

  // Method to setup start date marker
  const setupStartMarker = day => {
    setState({ ...state, edate: 'Search dates', sdate: day.dateString });
    let markedDates = {
      [day.dateString]: {
        startingDay: true,
        color: props.theme.selectedDateBackgroundColor,
        textColor: props.theme.selectedDateTextColor,
      },
    };
    setState({
      ...state,
      isFromDatePicked: true,
      isToDatePicked: false,
      fromDate: day.dateString,
      markedDates: markedDates,
    });
    props.onResetRange()
  };

  // Method ot setup all mark dates
  const setupMarkedDates = (fromDate, toDate, markedDates) => {

    let mFromDate = moment(fromDate);
    let mToDate = moment(toDate);
    range = mToDate.diff(mFromDate, 'days');
    if (range >= 0) {
      if (range == 0) {
        markedDates = {
          [toDate]: {
            color: props.theme.markColor,
            textColor: props.theme.markTextColor,
          },
        };
      } else {
        setState({ ...state, edate: toDate });
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.add(1, 'days').format("yyyy-MM-DD");
          if (i < range) {
            markedDates[tempDate] = {
              color: props.theme.markColor,
              textColor: props.theme.markTextColor,
            };
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: props.theme.selectedDateBackgroundColor,
              textColor: props.theme.selectedDateTextColor,
            };
          }
        }
      }
      props.onSuccess(fromDate, toDate)
    }
    return [markedDates, range];
  };

  //Method to be called on day press
  const onDayPress = day => {
    range = 0;
    if (
      !state.isFromDatePicked ||
      (state.isFromDatePicked && state.isToDatePicked)
    ) {
      setupStartMarker(day);
    } else if (!state.isToDatePicked) {
      let markedDates = { ...state.markedDates };
      let [mMarkedDates, range] = setupMarkedDates(
        state.fromDate,
        day.dateString,
        markedDates,
      );
      if (range >= 0) {
        setState({
          ...state,
          isFromDatePicked: true,
          isToDatePicked: true,
          markedDates: mMarkedDates,
        });
      } else {
        setupStartMarker(day);
      }
    }
  };


  return (

    <View>
      {props.isFromFilter ? <Calendar
        theme={{
          todayTextColor: '#065984',
        }}

        minDate={new Date()}
        enableSwipeMonths
        maxDate={new Date(
          new Date(new Date().setDate(30)).setMonth(11),
        ).setFullYear(new Date().getFullYear() + 1)}

        current={
          props.startDate === ''
            ? moment().format('yyyy-MM-DD')
            : props.startDate
        }
        markingType={"period"}
        markedDates={state.markedDates}
        onDayPress={day => {
          onDayPress(day);
        }}
      /> : <CalendarList
        theme={{
          todayTextColor: '#065984',
        }}

        minDate={new Date()}
        enableSwipeMonths
        maxDate={new Date(
          new Date(new Date().setDate(30)).setMonth(11),
        ).setFullYear(new Date().getFullYear() + 1)}

        current={
          props.startDate === ''
            ? moment().format('yyyy-MM-DD')
            : props.startDate
        }
        markingType={"period"}
        markedDates={state.markedDates}
        onDayPress={day => {
          onDayPress(day);
        }}
      />}
    </View>

  )
}


export default DateRangePicker