using _2._0.vApi2.Models.Models;
using SWAPNIL.Areas.Admin.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace _2._0.vApi2.Models.EntryMaster
{
    public class SubscriptionEntry
    {
        public string SubscriptionEntryData(string UserId, DataTable dt)
        {
            var ds = new DataSet();
            DataAccessLayer m_DataLayer = new DataAccessLayer();
            m_DataLayer.g_dtParameter.Rows.Add("@createdby", 1);
            m_DataLayer.g_dtParameter.Rows.Add("@tvp_subscript_model", dt);
            string msg = m_DataLayer.pfn_sSelectData("usp_SubsCripModelEntryUpdt", ref ds);
            return msg;
        }
    }
}