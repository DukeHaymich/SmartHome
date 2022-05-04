import { Alert } from 'react-native';
import init from '../libraries/mqtt';
import uuid from 'react-native-uuid';

init();

class MqttService {
    static instance = null;

    static getInstance() {
        if (!MqttService.instance) {
            MqttService.instance = new MqttService();
        }
        return MqttService.instance;
    }

    constructor() {
        const clientId = uuid.v4().slice(0, 23);
        this.client = new Paho.MQTT.Client(
            'io.adafruit.com',
            443,
            clientId
        );
        this.username = 'duke_and_co',
            this.password = 'aio_FBlS171kI4CuXJbYPzIX2a32wzMW'
        this.client.onMessageArrived = this.onMessageArrived;
        this.callbacks = {};
        this.onSuccessHandler = undefined;
        this.onConnectionLostHandler = undefined;
        this.isConnected = false;
    }

    connect = (onSuccessHandler, onConnectionLostHandler, username = null, password = null) => {
        this.onSuccessHandler = onSuccessHandler;
        this.onConnectionLostHandler = onConnectionLostHandler;
        this.client.onConnectionLost = () => {
            this.isConnected = false;
            onConnectionLostHandler();
        };
        this.username = username ?? this.username;
        this.password = password ?? this.password;

        // this.client.connect({
        //     timeout: 10,
        //     onSuccess: () => {
        //         this.isConnected = true;
        //         onSuccessHandler();
        //     },
        //     useSSL: true,
        //     onFailure: this.onFailure,
        //     reconnect: true,
        //     keepAliveInterval: 20,
        //     cleanSession: true,
        //     userName: this.username,
        //     password: this.password
        // });
    };

    disconnect = () => {
        if (!this.isConnected) {
            // console.info('not connected');
            return;
        }
        this.client.disconnect();
        this.isConnected = false;
    }

    onFailure = ({ errorMessage }) => {
        console.info(errorMessage);
        this.isConnected = false;
        Alert.alert(
            'Thất bại!',
            'Không thể kết nối đến server!',
            [{
                text: 'Thử lại',
                onPress: () => this.connect(this.onSuccessHandler, this.onConnectionLostHandler)
            }],
            { cancelable: false }
        );
    };

    onMessageArrived = message => {
        const { payloadString, topic } = message;
        this.callbacks[topic](payloadString);
    };

    publishMessage = (topic, message) => {
        if (!this.isConnected) {
            // console.info('not connected');
            return;
        }
        this.client.publish(topic, message);
    };

    subscribe = (topic, callback) => {
        if (!this.isConnected) {
            // console.info('not connected');
            return;
        }
        this.callbacks[topic] = callback;
        this.client.subscribe(topic);
    };

    unsubscribe = topic => {
        if (!this.isConnected) {
            // console.info('not connected');
            return;
        }
        delete this.callbacks[topic];
        this.client.unsubscribe(topic);
    };
}

export default MqttService.getInstance();