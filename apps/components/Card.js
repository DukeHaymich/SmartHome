import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function CardContent(props) {
    return (
        <View style={styles.cardContent}>
            <MaterialIcons
                name={props.icon}
                color='#000'
                size={30}
            />
            <Text style={styles.description}>{props.description}</Text>
        </View>
    )
}

export default function Card(props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{props.title}</Text>
                {/**/}
            </View>
            <View style={styles.content}>
                <FlatList
                    data={props.content}
                    renderItem={({item}) => <CardContent {...item}/>}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '92%',
        marginTop: 15,
        backgroundColor: '#E3F0FF',
        alignSelf: 'center',
        borderRadius: 10,
    },
    header: {
        height: 42,
        backgroundColor: '#1E93FF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '500',
        marginLeft: 15,
    },
    content: {
        paddingBottom: 17,
    },
    cardContent: {
        marginTop: 17,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',

    },
    description: {
        color: '#000',
        fontSize: 20,
        marginLeft: 15
    }
});