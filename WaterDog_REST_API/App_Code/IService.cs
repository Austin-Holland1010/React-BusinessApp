using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using Npgsql;


[ServiceContract]
public interface IService
{

	[OperationContract]
	[WebGet (UriTemplate = "PI", ResponseFormat = WebMessageFormat.Json)]
	double PiValue();

	[OperationContract]
	[WebGet(UriTemplate = "add2?x={x}&y={y}", ResponseFormat = WebMessageFormat.Json)]
	int addition(int x, int y);
	//http://localhost:55250/Service.svc/add2?x=4&y=7

	[OperationContract]
	[WebGet(UriTemplate = "getCustomer?name={name}", ResponseFormat = WebMessageFormat.Json)]
	string getCustomer(string name);
}