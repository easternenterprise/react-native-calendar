import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { getDayDifferenceFromCurrent } from '../../../Utils';

/***
 * Wrapper View wrap around calendar and shows date range selection options
 */

const WrapperView = ({ startDate, endDate, children, title, onClose, onSaveButton, onSelectDuration, durationSelected, disableButton, buttonTitle = 'Select', theme }) => {

    const getSelectedBackgroundColor = (current: number) => {
        return current === durationSelected ? theme.flexibleDateBackgroundColor : theme.flexibleDateNotSelectedBackgroundColor
    }
    const getSelectedTextColor = (current: number) => {
        return current === durationSelected ? theme.flexibleDateTextColor : 'black'
    }

    const dayDifference = getDayDifferenceFromCurrent(startDate);
    return (
        <View style={[styles.BSContainer, { height: '100%' }]}>
            <View style={styles.BSHeaderContainer}>
                <View style={styles.BSHeaderTitleParent}>
                    {title && <Text style={styles.BSHeaderText}>{title}</Text>}
                    <TouchableOpacity style={styles.BSHeaderCloseWrapper} onPress={onClose}>
                        <FontAwesomeIcon color={'white'} icon={faTimes} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 5, backgroundColor: theme.subHeaderBackgroundColor }}>
                    <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                        <Text style={[styles.calendarTitleText, { color: theme.subHeaderDateTextColor }]}>{'Start date'}</Text>
                        <Text style={[styles.descText, { color: theme.subHeaderDateTextColor }]}>{moment(startDate).format('DD-MM-YYYY') || 'Select Start Date'}</Text>

                    </View>
                    <View style={styles.itemSeperator} />
                    <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                        <Text style={[styles.calendarTitleText, { color: theme.subHeaderDateTextColor }]}>{'End date'}</Text>
                        <Text style={[styles.descText, { color: theme.subHeaderDateTextColor }]}>{moment(endDate).format('DD-MM-YYYY') || 'Select End Date'}</Text>

                    </View>

                </View>
            </View>
            <View style={[styles.BSCalendarWrapper]}>{children}</View>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderRadius: 10 }}>
                <View style={{
                    backgroundColor: theme.flexibleDateContainerBackgroundColor,
                    shadowOpacity: 0.23,
                    shadowRadius: 2,
                }}>
                    {dayDifference > -1 && endDate !== undefined && <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                        <Text style={styles.BSDurationHeaderText}>{'Flexible Dates'} </Text>
                        <ScrollView style={{ flexDirection: 'row' }} horizontal>
                            {dayDifference > -1 && <TouchableHighlight style={[styles.BSDateSelectionOption, { backgroundColor: getSelectedBackgroundColor(0) }]} onPress={() => onSelectDuration(0)} ><Text style={[styles.BSDurationText, { color: getSelectedTextColor(0) }]}>{'Exact dates'}</Text></TouchableHighlight>}
                            {dayDifference > 0 && <TouchableHighlight style={[styles.BSDateSelectionOption, { backgroundColor: getSelectedBackgroundColor(1) }]} onPress={() => onSelectDuration(1)} ><Text style={[styles.BSDurationText, { color: getSelectedTextColor(1) }]}>+-1</Text></TouchableHighlight>}
                            {dayDifference > 1 && <TouchableHighlight style={[styles.BSDateSelectionOption, { backgroundColor: getSelectedBackgroundColor(2) }]} onPress={() => onSelectDuration(2)} ><Text style={[styles.BSDurationText, { color: getSelectedTextColor(2) }]}>+-2</Text></TouchableHighlight>}
                            {dayDifference > 2 && <TouchableHighlight style={[styles.BSDateSelectionOption, { backgroundColor: getSelectedBackgroundColor(3) }]} onPress={() => onSelectDuration(3)} ><Text style={[styles.BSDurationText, { color: getSelectedTextColor(3) }]}>+-3</Text></TouchableHighlight>}
                            {dayDifference > 3 && <TouchableHighlight style={[styles.BSDateSelectionOption, { backgroundColor: getSelectedBackgroundColor(4) }]} onPress={() => onSelectDuration(4)} ><Text style={[styles.BSDurationText, { color: getSelectedTextColor(4) }]}>+-4</Text></TouchableHighlight>}
                        </ScrollView>
                    </View> || <></>}

                </View>
                <TouchableOpacity onPress={onSaveButton} style={[styles.buttonContainerStyle, theme.buttonStyle]}>
                    <Text style={theme.buttonTextStyle}>{buttonTitle}</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

WrapperView.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
    contentHeight: PropTypes.string,
};

const styles = StyleSheet.create({
    itemSeperator: {
        height: '100%',
        width: 1,
        backgroundColor: "grey"
    },
    BSDurationHeaderText: { fontSize: 16, marginBottom: 10 },
    buttonContainerStyle: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    BSDurationText: {
        fontSize: 14,
        color: 'green'
    },
    BSDateSelectionOption: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginHorizontal: 5,
        shadowOffset: {
            width: 0,
            height: 0.5
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.62,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5
    },
    BSCalendarWrapper: {
        flex: 1,
        // height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10
    },
    BSContainer: {
        backgroundColor: 'green',
        elevation: 7,
        borderRadius: 10
    },
    BSHeaderContainer: {
        flexDirection: 'column',
        backgroundColor: 'green',
        borderRadius: 10
    },
    BSHeaderTitleParent: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingVertical: 12,
        justifyContent: 'center',
        flexDirection: 'row',
        minHeight: 48,
    },
    BSHeaderText: {
        fontSize: 18,
        color: 'white',
    },
    BSHeaderCloseWrapper: {
        position: 'absolute',
        right: 8,
        top: 8,
        bottom: 0,
        zIndex: 999,
        padding: 8,
    },
    calendarTitleText: { fontSize: 16, color: 'green' },
    descText: { fontSize: 14, marginVertical: 5 },
});

export default WrapperView;
