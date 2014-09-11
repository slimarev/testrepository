<%@ WebHandler Language="C#" Class="ProxyHandler" %>

using System.Net;
using System.Web;
using WebCommons.Handlers;
using WebCommons.Services;

public class ProxyHandler : BaseProxyHandler 
{
    protected override void AppendCustomHeaders(HttpWebRequest targetRequest, HttpContext context)
    {
        targetRequest.Headers["HTTP_X_CASINOTV_TEMPLATE_ID"] = InternalServiceFacade.TemplateId;
        targetRequest.Headers["HTTP_X_CASINOTV_SITE_ID"] = InternalServiceFacade.WebsiteId;
        targetRequest.Headers["HTTP_X_CASINOTV_CASINO_ID"] = InternalServiceFacade.CasinoId;
    }    
}