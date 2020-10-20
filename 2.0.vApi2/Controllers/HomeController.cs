using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace _2._0.vApi2.Controllers
{
    public class HomeController : ApiController
    {

        [HttpGet]
        [Route("api/home/getdata")]
        public IHttpActionResult Getdata()
        {
            string name = "debajit";
            return Ok(name);
        }

    }
}
