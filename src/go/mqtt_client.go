package main

import (
	"log"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

func mqttSubscribe(client MQTT.Client, message MQTT.Message) {
	log.Printf("%s\n", message.Topic())
	log.Printf("%s\n", message.Payload())
}
