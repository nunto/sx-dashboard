using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Sockets;

namespace Seradex.Dbox.Nodes
{
    public class MqttNode
    {
        public async Task MqttSetupAsync()
        {
            var factory = new MqttFactory();
            var client = factory.CreateMqttClient();

            var opts = new MqttClientOptionsBuilder()
            .WithClientId("cs-mqtt-client")
            .WithTcpServer("172.18.18.121", 1883)
            .Build();

            // Websocket test
            TcpListener server = new TcpListener(System.Net.IPAddress.Parse("ws://localhost"), 8080);
            server.Start();
            TcpClient wsclient = server.AcceptTcpClient();

            await client.ConnectAsync(opts);

            client.UseConnectedHandler(async e =>
            {
                await client.SubscribeAsync(new TopicFilterBuilder().WithTopic("#").Build());
            });

            client.UseApplicationMessageReceivedHandler(e =>
            {
                string topic = e.ApplicationMessage.Topic;
            });
        }
    }
}