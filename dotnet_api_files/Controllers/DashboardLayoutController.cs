using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Seradex.RestApi.Services;
using Seradex.Dbox.Nodes;

namespace Seradex.RestApi.Controllers
{
    /// <summary>
    /// Contains the data necessary for adding a client's dashboard layout to SQL
    ///</summary>
    public class ClientObject
    {
        /// <summary>
        /// Unique ID the client's dashboard will be stored under
        /// </summary>
        /// <remarks>
        /// Primary key in the db
        /// </remarks>
        public int ClientId { get; set; }
        /// <summary>
        /// Positioning of the dashboard's widgets
        /// </summary>
        public string Layout { get; set; }
        /// <summary>
        /// Which widgets are on the dashboard
        /// </summary>
        public string Items { get; set; }
    }

    /// <summary>
    /// Contains a client's id
    /// </summary>
    public class DbClient
    {
        /// Unique ID the client's dashboard will be stored under
        public int ClientId { get; set; }
    }
    /// <summary>
    /// Controller for accessing the DashboardLayout commands
    /// </summary>
    [RoutePrefix("api/DashboardLayout")]
    [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
    [Authorize]
    public class DashboardLayoutController : ApiController
    {
        // POST api/DashboardLayout/Save
        /// <summary>
        /// Attempts to save the given data using a DashboardLayoutNode
        /// </summary>
        /// <param name="client">ClientObject containing the data to be inserted</param>
        /// <returns>A success or failure message depending on the outcome of the SQL insertion</returns>
        [Route("Save")]
        [HttpPost]
        [ResponseType(typeof(IHttpActionResult))]
        public IHttpActionResult SaveData(ClientObject client)
        {
            try
            {
                DashboardLayoutNode node = new DashboardLayoutNode();
                string saveResult = node.SaveData(client.ClientId, client.Layout, client.Items);
                return Ok(saveResult);
            }
            catch (Exception ex)
            {
                ExceptionHandler exceptionHandler = new ExceptionHandler();
                HttpResponseMessage error = exceptionHandler.CreateBadRequestResponse(ex);
                throw new HttpResponseException(error);
            }
        }
        // POST api/DashboardLayout/Retrieve
        /// <summary>
        /// Attempts to retrieve the data for a given client using a DashboardLayoutNode
        /// </summary>
        /// <param name="client">DbClient object containing the client_id to retrieve from</param>
        /// <returns>A string with the data retrieved from sql</returns>
        [Route("Retrieve")]
        [HttpPost]
        [ResponseType(typeof(RowObject))]
        public IHttpActionResult GetData(DbClient client)
        {
            try
            {
                System.Diagnostics.Debug.WriteLine(client.ClientId);
                DashboardLayoutNode node = new DashboardLayoutNode();
                RowObject data = node.GetData(client.ClientId);
                return Ok(data);
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