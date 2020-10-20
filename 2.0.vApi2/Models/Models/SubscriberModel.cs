using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _2._0.vApi2.Models.Models
{

    public class Subscribe
    {
        public string UserId { get; set; }
        public List<SubscriberModel> SubscribeDAta { get; set; }
    }

public class SubscriberModel
    {
        public string ModelId { get; set; }
        public string ModelName { get; set; }

        public string EmployeeUser { get; set; }
        public string CustomerUser { get; set; }
        public string InfluencerUser { get; set; }
        public string VendorUser { get; set; }
        public string OtherUser { get; set; }

        public string EmpUserCost { get; set; }
        public string CustUserCost { get; set; }
        public string InfluencerCost { get; set; }
        public string VendorUserCost { get; set; }
        public string OthrUserCost { get; set; }

        public DateTime EffectiveDate { get; set; }                             
        public string Active { get; set; }
       
    }
}