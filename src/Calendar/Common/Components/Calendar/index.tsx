import WrapperView from '../WrapperView';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import { styles } from './index.styles';


const defaultTheme = {selectedDateTextColor: 'white',
  selectedDateBackgroundColor: 'red',
  subHeaderBackgroundColor: 'lightgreen',
  subHeaderDateTextColor: 'black',
  flexibleDateBackgroundColor: 'green',
  flexibleDateNotSelectedBackgroundColor: 'lightgrey',
  flexibleDateTextColor: 'white',
  selectedDateMarkColor: '#ededed',
  selectedMarkTextColor: '#000',
  flexibleDateContainerBackgroundColor: 'white',
  buttonBackgroundColor: 'green',
  buttonStyle: {
    backgroundColor: 'green',
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 14
  },
  title: 'Calendar'
}

const CalendarPicker = ({
  calendarStartDate, calendarEndDate, modalCalendarShown, onClose, onDateChange, theme = defaultTheme
}) => {

  const [newStartDate, setNewStartDate] = useState(calendarStartDate)
  const [newEndDate, setNewEndDate] = useState(calendarEndDate)
  const [diff, setDiff] = useState(0)

  useEffect(() => {
    setNewStartDate(calendarStartDate)
    setNewEndDate(calendarEndDate)
  }, [calendarStartDate])

  const resetDiff = () => {
    setDiff(0)
  }


  return (
    <Modal
      transparent={true}
      visible={modalCalendarShown}
      onRequestClose={() => {
      }}
    ><View style={styles.centeredView}>
        <View style={[styles.modalView, { width: '90%', height: '90%', borderRadius: 10 }]}>


          <WrapperView theme={theme} title={theme.title}
            onClose={() => onClose()}
            onSaveButton={() => {
              onDateChange({ startDate: newStartDate, endDate: newEndDate })
              onClose()
            }}
            onSelectDuration={(duration) => {
              const diffFromPrevious = diff - duration;
              setNewStartDate(moment(newStartDate).add(diffFromPrevious, 'd').format('YYYY-MM-DD'));
              setNewEndDate(moment(newEndDate).subtract(diffFromPrevious, 'd').format('YYYY-MM-DD'));
              setDiff(duration)
              // setSelectedDuration(duration)
            }}
            durationSelected={diff}
            startDate={newStartDate}
            endDate={newEndDate}
            disableButton={!(newStartDate !== undefined && newEndDate !== undefined)}
          >
            <DateRangePicker
              isFromFilter={false}
              navigation={''}
              language={'en'}
              startDate={newStartDate}
              initialRange={[newStartDate, newEndDate]}
              endDate={newEndDate}
              onResetRange={() => {
                resetDiff()
                setDiff(0)
              }}
              onSuccess={(s, e) => {
                setNewStartDate(s)
                setNewEndDate(e)
              }}
              theme={{ markColor: theme.selectedDateMarkColor, markTextColor: theme.selectedMarkTextColor, ...theme }}
            />
          </WrapperView>

        </View>
      </View>

    </Modal>

  )
}

export default CalendarPicker;