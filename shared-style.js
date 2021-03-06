import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    runInfoWrapper: {
        backgroundColor: 'rgba(255,255,255,0.75)',
        paddingVertical: 15
    },
    runInfoTitle: {
        textAlign: 'center',
        fontWeight: '700', // fontWeight should be string
        color: '#666'
    },
    runInfoValue: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '200', // fontWeight should be string
        paddingVertical: 5
    }

});