'use strict';

import React from 'react-native';
const {
    Component,
    StyleSheet,
    TouchableOpacity,
    Text
} = React;

export default class Day extends Component {
    render() {
        let {date, status, disabled, onDayPress} = this.props;
        let statusStyle, onPress, textColor;
    
        if (disabled) {
            textColor = 'gray';
            onPress = null;
        } else {
            if (status === 'selected') {
                textColor = 'white'
            }
            statusStyle = styles[status];
            onPress = () => {
                onDayPress(date);
            }
        }
        return (
            <TouchableOpacity
                activeOpacity={disabled ? 1 : 0.5}
                style={[styles.common, statusStyle]}
                onPress={onPress}>
                <Text style={{color: textColor}}>{date.getDate()}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    common: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    selected: {
        backgroundColor: '#4169e1'
    },
    inRange: {
        backgroundColor: '#87cefa'
    }
});