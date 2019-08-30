using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seradex.Dbox.Nodes
{
    /// <summary>
    /// Handles the logic behind a DashboardLayout request
    /// </summary>
    public class DashboardLayoutNode
    {
        /// Hard coded connection string for testing => need to change this later
        static readonly string connString = @"Data Source=172.18.19.57\SQL17;Initial Catalog=ReactDB;User ID=ReactClient;Password=ReactPass1!;";
        /// <summary>
        /// Saves the given dashboard layout to SQL
        /// </summary>
        /// <param name="clientId">Unique ID used to identify the client's data</param>
        /// <param name="layout">Positioning of the dashboard's widgets</param>
        /// <param name="items">Which widgets are on the dashboard</param>
        /// <returns>A string with the message 'success' or 'fail'</returns>
        public string SaveData(int clientId, string layout, string items)
        {
            string query = $"INSERT into ReactDB.dbo.Layouts (client_id, layout, items) VALUES ({clientId}, '{layout}', '{items}')";
            string result = "Fail";

            SqlConnection conn = new SqlConnection(connString);
            SqlCommand cmd = new SqlCommand(query, conn);
            try
            {
                conn.Open(); 
                cmd.ExecuteNonQuery();
                conn.Close();
                result = "Success";
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Violation of PRIMARY KEY constraint"))
                {
                    query = $"UPDATE ReactDB.dbo.Layouts SET layout = '{layout}', items = '{items}' WHERE client_id = {clientId}";
                    cmd = new SqlCommand(query, conn);
                    try
                    {
                        if (conn != null && conn.State == System.Data.ConnectionState.Closed)
                        {
                            conn.Open();
                        }                        
                        cmd.ExecuteNonQuery();
                        conn.Close();
                        result = "Success";
                    }
                    catch (Exception e)
                    {
                        result = e.Message;
                    }
                }
                else
                {
                    result = ex.Message;
                }
            }
            return result;
        }

        /// <summary>
        /// Retrieves the layout and items of a given user's dashboard
        /// </summary>
        /// <param name="clientId">Unique ID used to identify which row to retrieve</param>
        /// <returns>An object containing the layout and items retrieved</returns>
        public RowObject GetData(int clientId)
        {
            string query = $"SELECT layout, items FROM ReactDB.dbo.Layouts WHERE client_id = {clientId}";
            string layout = "";
            string items = "";

            SqlConnection conn = new SqlConnection(connString);
            SqlCommand cmd = new SqlCommand(query, conn);
            try
            {
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    layout = reader.GetString(0);
                    items = reader.GetString(1);
                }

                RowObject row = new RowObject(layout, items);
                //string result = "Layout: " + row.Layout + "\nItems: " + row.Items;
                //return result;
                return row;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return null;
            }
        }
    }

    /// <summary>
    /// Holds the returned data from a Layouts SQL query
    /// </summary>
    public class RowObject
    {
        /// The layout string returned from SQL
        public string Layout { get; set; }
        /// The items string returned from SQL
        public string Items { get; set; }
        /// <summary>
        /// Constructor for RowObject
        /// </summary>
        /// <param name="layout">The layout string returned from SQL</param>
        /// <param name="items">The items string returned from SQL</param>
        public RowObject(string layout, string items)
        {
            Layout = layout;
            Items = items;
        }
    }
}
