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
        public void Vote(string votedImages)
        {
            var images = new List<string>();
            string[] split = votedImages.Split(',');
            foreach (var src in split)
            {
                images.Add(src);
            }
        }   
    }
}
