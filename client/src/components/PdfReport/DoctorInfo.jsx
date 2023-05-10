import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 5,
        backgroundColor: '#e4e4e4',
        padding: 10,
    },
});

function DoctorInfo({ doctor }) {
    return (
        <View style={styles.headerContainer}>
            <Text>
                {doctor?.title} {doctor?.name}
            </Text>
            <Text>{doctor?.workplace?.orgName}</Text>
            <Text>{doctor?.specialized}</Text>
            <Text>{doctor?.department?.name}</Text>
        </View>
    );
}

export default DoctorInfo;
