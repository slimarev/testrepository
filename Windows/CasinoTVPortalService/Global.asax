<%@ Application Language="C#" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.ServiceModel" %>
<%@ Import Namespace="System.ServiceModel.Activation" %>
<%@ Import Namespace="System.Web.Configuration" %>
<%@ Import Namespace="System.Web.Routing" %>
<%@ Import Namespace="Commons.Helpers" %>
<%@ Import Namespace="Commons.Log" %>
<%@ Import Namespace="ServiceCommons.Helpers" %>
<%@ Import Namespace="ServiceCommons.Services" %>
<%@ Import Namespace="WebCommons.Services" %>

<script runat="server">

    void Application_Start(object sender, EventArgs e) 
    {
        Logger.InitLogger();
        WebFileHelper.Initialize(Path.GetTempPath().CombinePath("\\CasinoTV"), Server.MapPath("~\\Uploads"), WebConfigurationManager.AppSettings["fileServiceBaseUrl"] + "Uploads/");
        WebFileHelper.CleanupTempFolder();
        RouteTable.Routes.Add(new ServiceRoute("internal", new WebServiceHostFactory(), typeof(InternalService)));
        RouteTable.Routes.Add(new ServiceRoute("mva", new WebServiceHostFactory(), typeof(GamerMVA)));
        RouteTable.Routes.Add(new ServiceRoute("mva_customer", new WebServiceHostFactory(), typeof(CustomerMVA)));
        RouteTable.Routes.Add(new ServiceRoute("mva_admin", new WebServiceHostFactory(), typeof(AdminMVA)));        
        RouteTable.Routes.Add(new ServiceRoute("files_customer", new WebServiceHostFactory(), typeof(CustomerFileService)));
        RouteTable.Routes.Add(new ServiceRoute("files_admin", new WebServiceHostFactory(), typeof(AdminFileService)));
    }
    
    void Application_End(object sender, EventArgs e) 
    {
        WebFileHelper.Terminate();
    }
        
    void Application_Error(object sender, EventArgs e) 
    { 
        Logger.Log(Server.GetLastError());
    }

    void Session_Start(object sender, EventArgs e) 
    {
        WebFileHelper.RegisterSession();
    }

    void Session_End(object sender, EventArgs e) 
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.

    }
       
</script>
