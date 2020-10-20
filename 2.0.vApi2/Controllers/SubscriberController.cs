using _2._0.vApi2.Models.EntryMaster;
using _2._0.vApi2.Models.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace _2._0.vApi2.Controllers
{
    public class SubscriberController : ApiController
    {


        [HttpPost]
        [Route("api/subs/data")]
        public IHttpActionResult Getdata(List<Subscribe> subsmodel)
        {
            SubscriptionEntry se = new SubscriptionEntry();

            string UserId = "";
            string ResultMsg = "";
            DataTable dt = new DataTable();
            dt.Columns.AddRange(new DataColumn[14] {new DataColumn("ModelId",typeof(string))
                                                    ,new DataColumn("ModelName",typeof(string))
                                                    ,new DataColumn("EmployeeUser",typeof(string))
                                                    ,new DataColumn("CustomerUser",typeof(string))
                                                    ,new DataColumn("InfluencerUser",typeof(string))
                                                    ,new DataColumn("VendorUser",typeof(string))
                                                    ,new DataColumn("OtherUser",typeof(string))                                                                                                                                                                                                             
                                                    ,new DataColumn("EmpUserCost",typeof(string))
                                                    ,new DataColumn("CustUserCost",typeof(string))
                                                    ,new DataColumn("InfluencerCost",typeof(string))
                                                    ,new DataColumn("VendorUserCost",typeof(string))
                                                    ,new DataColumn("OthrUserCost",typeof(string))
                                                    ,new DataColumn("EffectiveDate",typeof(DateTime))
                                                    ,new DataColumn("Active",typeof(string))                                                        
                                                });
            foreach (var item in subsmodel)
            {
                UserId = item.UserId;
                foreach (var t in item.SubscribeDAta)
                {
                    dt.Rows.Add(t.ModelId, t.ModelName, t.EmployeeUser, t.CustomerUser, t.InfluencerUser, t.VendorUser, t.OtherUser, t.EmpUserCost, t.CustUserCost, t.InfluencerCost, t.VendorUserCost, t.OthrUserCost, t.EffectiveDate, t.Active);
                }
            }
            string userId = UserId;
            var ds = se.SubscriptionEntryData(userId, dt);
            //if (ds.ToString() == "200")
            //{
            //    ResultMsg = "Data Insert Successful";
            //}
            //else
            //{
            //    ResultMsg = "Data not Insert";
            //}
            ResultMsg = ds.ToString();
            dt.Clear();
            return Ok(ResultMsg);
        }



    }
}
