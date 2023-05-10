import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import dayjs from 'dayjs';
import { PdfReport } from '../components';

// Create styles
const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        height: 50,
        top: 0,
        left: 0,
        right: 0,
        color: 'gray',
        paddingHorizontal: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Courier',
        fontSize: 8,
    },
    section: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Courier',
        fontSize: 8,
    },
    page: {
        fontFamily: 'Times-Roman',
        fontSize: 11,
        padding: 60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
});

// Create Document Component
function GeneratedAppiontmentPdf({ date, doctor, appointments }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header} fixed>
                    <Text>Docapp</Text>
                    <Text>{dayjs().format('MMMM D, YYYY')}</Text>
                </View>
                <PdfReport.DoctorInfo doctor={doctor} />
                <View style={styles.section}>
                    <Text>Total appointments: {appointments.length}</Text>
                    <Text>{dayjs(date).format('dddd, MMMM D, YYYY')}</Text>
                </View>
                <PdfReport.AppiontmentsTable appointments={appointments} />
            </Page>
        </Document>
    );
}

export default GeneratedAppiontmentPdf;
