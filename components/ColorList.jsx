import {View, ScrollView, StyleSheet, Text} from 'react-native'
import React from 'react'


const ColorList = ({color}) => {
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={[styles.color, {backgroundColor: color}]}>
                <Text style={styles.title}>Mis tarjetas:</Text> 
                <Text style={styles.info}>Tarjeta de crédito</Text>  
            </View>

            <View style={[styles.color, {backgroundColor: color}]}>
                <Text style={styles.info}>Tarjeta de débito</Text>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    color: {
        width: '100%',
        height: 350,
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    title: {
        flex: 1,
        alignSelf: 'flex-start',
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 10, // Adjust the margin top value to reduce the space
        marginLeft: 20, // Add a margin left value to align the text properly
    },

    info: {
        flex: 1,
        alignSelf: 'flex-start',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
    },
})

export default ColorList
