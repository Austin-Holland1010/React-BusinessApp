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
	[WebGet(UriTemplate = "getCustomers", ResponseFormat = WebMessageFormat.Json)]
	string getCustomers();

	[OperationContract]
	[WebGet(UriTemplate = "getSpecificCustomer?firstname={firstName}&lastname={lastName}", ResponseFormat = WebMessageFormat.Json)]
	string getSpecificCustomer(string firstName, string lastName);

	[OperationContract]
	[WebGet(UriTemplate = "addCustomer?firstname={firstName}&lastname={lastName}&phone={phone}&address={address}&email={email}", ResponseFormat = WebMessageFormat.Json)]
	bool addCustomer(string firstName, string lastName, string phone, string address, string email);

	[OperationContract]
	[WebGet(UriTemplate = "deleteCustomer?firstname={firstName}&lastname={lastName}", ResponseFormat = WebMessageFormat.Json)]
	bool deleteCustomer(string firstName, string lastName);

	[OperationContract]
	[WebGet(UriTemplate = "updateCustomer?currentFirstName={currentFirstName}&currentLastName={currentLastName}&firstname={firstName}&lastname={lastName}&phone={phone}&address={address}&email={email}", ResponseFormat = WebMessageFormat.Json)]
	bool updateCustomer(string currentFirstName, string currentLastName, string firstName, string lastName, string phone, string address, string email);
}