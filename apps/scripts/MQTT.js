import init from 'react_native_mqtt';
import { AsyncStorage } from '@react-native-community/async-storage';
 
init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 30 * 3600 * 24,
    enableCache: true,
    reconnect: true,
    sync : {
    }
});
 
function onConnect() {
    console.log("onConnect");
    client.subscribe("#");
}
 
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}
 
function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
}
 
const client = new Paho.MQTT.Client('test.mosquitto.org', 1883, 'wildcard');
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({ onSuccess:onConnect, useSSL: true });
