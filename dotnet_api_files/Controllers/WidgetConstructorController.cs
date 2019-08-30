using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
    /// <summary>
    /// Controller for widget construction
    /// </summary>
    [RoutePrefix("api/WidgetConstructor")]
    [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
    [Authorize]
    public class WidgetConstructorController : ApiController
    {
        /// <summary>
        /// Calls a node to get data required to make a Timeline widget
        /// </summary>
        /// <returns>string: ya</returns>
        [Route("Timeline")]
        [HttpGet]
        [ResponseType(typeof(IHttpActionResult))]
        public IHttpActionResult Timeline()
        {
            try
            {
                WidgetConstructorNode node = new WidgetConstructorNode();
                List<TimelineObject> timelineData = node.GetTimeline();
                return Ok(timelineData);
            }
            catch (Exception ex)
            {
                ExceptionHandler exceptionHandler = new ExceptionHandler();
                HttpResponseMessage error = exceptionHandler.CreateBadRequestResponse(ex);
                throw new HttpResponseException(error);
            }
        }
    }
}
