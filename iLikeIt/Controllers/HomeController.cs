using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iLikeIt.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult RegisterVote(string votedImage, string rating)
        {
            /* Simulates some kind of computation */
            for (var i = 0; i < 100000000; i++)
            {
                var temp = 125677 * i;
            }   
                         
            Random random = new Random();
            return Json(random.Next(1, 5).ToString());            
        }   
    }
}
