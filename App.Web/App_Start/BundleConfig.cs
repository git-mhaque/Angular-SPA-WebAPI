using System.Web;
using System.Web.Optimization;

namespace App.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/public/libs/jquery/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/public/libs/modernizr/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/public/libs/bootstrap/js/bootstrap.js",
                      "~/public/libs/respond/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/public/libs/bootstrap/styles/bootstrap.css",
                      "~/public/styles/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/public/libs/angular/angular.js",
                        "~/public/libs/angular/angular-route.js",
                        "~/public/libs/angular/angular-resource.js"
                        ));



            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;
        }
    }
}
