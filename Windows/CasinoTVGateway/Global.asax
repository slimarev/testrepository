<%@ Application Language="C#" %>
<%@ Import Namespace="System.ServiceModel.Activation" %>
<%@ Import Namespace="System.Web.Routing" %>
<%@ Import Namespace="Commons.Log" %>
<%@ Import Namespace="ServiceCommons.Services.Gateway" %>

<script runat="server">

    void Application_Start(object sender, EventArgs e) 
    {
        RouteTable.Routes.Add(new ServiceRoute("games", new WebServiceHostFactory(), typeof(CasinoTvGameClientService)));
    }
    
    void Application_End(object sender, EventArgs e) 
    {
    }
        
    void Application_Error(object sender, EventArgs e) 
    { 
        Logger.Log(Server.GetLastError());
    }

    void Session_Start(object sender, EventArgs e) 
    {
    }

    void Session_End(object sender, EventArgs e) 
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.

    }
       
</script>
