using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.WebSockets;
using Seradex.Dbox.Nodes;
using Seradex.RestApi.Services;
using Seradex.RestApi.WebSockets;

namespace Seradex.RestApi.Controllers
{
    [RoutePrefix("api/WebSocket")]
    [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
    [Authorize]
    public class WebSocketController : ApiController
    {
        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetMessage()
        {
            if (HttpContext.Current.IsWebSocketRequest)
            {
                HttpContext.Current.AcceptWebSocketRequest(ProcessRequestInternal);
            }
            return new HttpResponseMessage(HttpStatusCode.SwitchingProtocols);

        }
        private async Task ProcessRequestInternal(AspNetWebSocketContext context)
        {
            Console.WriteLine("===========================>This is a consolewriteline test");
            System.Diagnostics.Debug.WriteLine("======================>this is a debugwriteline test");
            var socket = context.WebSocket;
            MqttHandler.Clients.Add(socket);

            while (true)
            {
                var buffer = new ArraySegment<byte>(new byte[1024]);

                // async wait for a change in the socket
                var result = await socket.ReceiveAsync(buffer, CancellationToken.None);
                if (socket.State == System.Net.WebSockets.WebSocketState.Open)
                {
                    // echo to all clients
                    foreach (var client in MqttHandler.Clients)
                    {
                        await client.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                }
            }
        }
    }
}