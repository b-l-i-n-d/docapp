import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#e4e4e4',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    no: {
        width: '5%',
        borderRightWidth: 1,
    },
    name: {
        width: '40%',
        borderRightWidth: 1,
    },
    phone: {
        width: '30%',
        borderRightWidth: 1,
    },
    age: {
        width: '10%',
        borderRightWidth: 1,
    },
    type: {
        width: '15%',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    no_row: {
        width: '5%',
        borderRightWidth: 1,
        textAlign: 'center',
    },
    name_row: {
        width: '40%',
        borderRightWidth: 1,
        textAlign: 'left',
        paddingLeft: 5,
    },
    phone_row: {
        width: '30%',
        borderRightWidth: 1,
        textAlign: 'left',
        paddingLeft: 5,
    },
    age_row: {
        width: '10%',
        borderRightWidth: 1,
        textAlign: 'center',
    },
    type_row: {
        width: '15%',
        textAlign: 'left',
        paddingLeft: 5,
    },
});

function AppiontmentsTable({ appointments }) {
    const tableHeader = (
        <View style={styles.container}>
            <Text style={styles.no}>No.</Text>
            <Text style={styles.name}>Patient name</Text>
            <Text style={styles.phone}>Phone</Text>
            <Text style={styles.age}>Age</Text>
            <Text style={styles.type}>Type</Text>
        </View>
    );

    const tableRows = appointments?.map((appointment, index) => (
        <View style={styles.row} key={appointment._id}>
            <Text style={styles.no_row}>{index + 1}</Text>
            <Text style={styles.name_row}>{appointment.name}</Text>
            <Text style={styles.phone_row}>{appointment.phone}</Text>
            <Text style={styles.age_row}>{appointment.age}</Text>
            <Text style={styles.type_row}>{appointment.type}</Text>
        </View>
    ));

    return (
        <View style={styles.tableContainer}>
            {tableHeader}
            {tableRows}
        </View>
    );
}

export default AppiontmentsTable;
