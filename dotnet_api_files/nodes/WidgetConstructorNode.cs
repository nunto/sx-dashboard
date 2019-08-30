using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seradex.Dbox.Nodes
{
    public class WidgetConstructorNode
    {
        static readonly string connString = @"Data Source=sxsensors;Initial Catalog=Enterprise;User ID=sqltest;Password=Testaccount123!;";
        public List<TimelineObject> GetTimeline()
        {
            string query = "SELECT Messagedate, runningstate, SensorName FROM Enterprise.dbo.vw_SensorGraph";

            SqlConnection conn = new SqlConnection(connString);
            SqlCommand cmd = new SqlCommand(query, conn);
            List<TimelineObject> result = new List<TimelineObject>();
            try
            {
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                
                while (reader.Read())
                {
                    result.Add(new TimelineObject(reader.GetDateTime(0), reader.GetInt32(1), reader.GetString(2)));
                }
                return result;

            }
            catch(Exception ex)
            {
                return new List<TimelineObject>() { new TimelineObject(new DateTime(), -1, ex.Message) };
            }
        }
    }

    public class TimelineObject
    {
        public DateTime ElementDate { get; set; }
        public int Status { get; set; }
        public string Name { get; set; }

        public TimelineObject(DateTime elementDate, int status, string name)
        {
            ElementDate = elementDate;
            Status = status;
            Name = name;
        }
    }
}
