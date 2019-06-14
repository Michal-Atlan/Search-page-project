using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Project.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult SearchPage() {
            return View();
        }
        //Action that add the item that bookmarked to session, the key is item id.
        public ActionResult AddRepToSession(string idRep,string RepositorynName, string ownerAvatar)
        {
            RepItem repItem = new RepItem() { idRep = idRep, RepositorynName = RepositorynName, ownerAvatar = ownerAvatar };
            Session[idRep] = repItem;
            return Content("success");
        }
        public ActionResult BookMarkedRepositories()
        {
            return View();
        }
        //Action that runs on keys session, and returns list that contains the items. 
        public ActionResult GetRepsFromSession()
        {
            List<RepItem> repItems = new List<RepItem>();
            for (int i = 0; i < Session.Keys.Count; i++)
            {
                var item = (RepItem)Session[Session.Keys[i].ToString()];
                repItems.Add(item);
            }
            return Json(new { repItems = repItems }, JsonRequestBehavior.AllowGet) ;
        }
        public class RepItem {
            public string idRep { get; set; }
            public string RepositorynName { get; set; }
            public string ownerAvatar { get; set; }
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}