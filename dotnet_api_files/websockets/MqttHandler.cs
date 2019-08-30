using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using System.Web.WebSockets;
using System.Net.WebSockets;
using System.Threading;

namespace Seradex.RestApi.WebSockets
{
    /// <summary>
    /// Handles the retrieval and sending of mqtt data
    /// </summary>
    public class MqttHandler
    {
        public static readonly IList<WebSocket> Clients = new List<WebSocket>();
        /// <summary>
        /// Handle sincoming MQTT data
        /// </summary>
        /// <returns></returns>
        public async Task MqttClient()
        {
            var factory = new MqttFactory();
            var client = factory.CreateMqttClient();

            var opts = new MqttClientOptionsBuilder()
            .WithClientId("cs-mqtt-client")
            .WithTcpServer("localhost", 1883)
            .Build();
            //.WithTcpServer("172.18.18.121", 1883)

            await client.ConnectAsync(opts);

            client.UseConnectedHandler(async e =>
            {
                await client.SubscribeAsync(new TopicFilterBuilder().WithTopic("#").Build());
            });

            client.UseApplicationMessageReceivedHandler(async e =>
            {
                System.Diagnostics.Debug.WriteLine("MQTT Msg Received: " + e.ApplicationMessage.Payload);
                var buffer = new ArraySegment<byte>(e.ApplicationMessage.Payload);

                string topic = e.ApplicationMessage.Topic;
                foreach (var wsClient in Clients)
                {
                    if (wsClient.State == System.Net.WebSockets.WebSocketState.Open)
                    {
                        await wsClient.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                    else
                    {
                        Clients.Remove(wsClient);
                        break;
                    }
                }
            });
        }
    }
}