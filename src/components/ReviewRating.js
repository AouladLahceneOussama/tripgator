import React from 'react';
import { View, Text } from 'react-native';

import { colors } from '../constants/colors';

const ReviewRating = ({ rating }) => {
    const renderCircles = () => {
        const circles = [];
        for (let i = 1; i <= 5; i++) {
            circles.push(
                <View
                    key={i}
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        backgroundColor: i <= rating ? colors.primary : 'lightgray',
                        marginRight: -2,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                </View>
            );
        }
        return circles;
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderCircles()}
            <Text style={{ fontSize: 10, marginLeft: 5 }}>({rating})</Text>
        </View>
    );
};

export default ReviewRating;
