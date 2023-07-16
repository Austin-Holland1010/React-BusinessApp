using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Data;
using Npgsql;
using Newtonsoft.Json;
using System.Text.Json;
using System.Text.Json.Serialization;

//The Service class contains all the backend inplementations for the services
// used by the Water Dog Pool Care React App
public class Service : IService
{
    //This service returns a string containing an array of JSON objects.
    // These objects contain all the fields 
    public string getCustomers()
    {
        try
        {
            NpgsqlConnection conn = new NpgsqlConnection("Server=localhost;Port=5432;Database=waterdogpool;User Id=postgres;Password=admin;");
            conn.Open();
            NpgsqlCommand command = new NpgsqlCommand();
            command.Connection = conn;
            command.CommandType = CommandType.Text;
            command.CommandText = "SELECT * FROM customers ORDER BY customers.lastname ASC";
            NpgsqlDataAdapter nda = new NpgsqlDataAdapter(command);
            DataTable dt = new DataTable();
            nda.Fill(dt);
            conn.Dispose();
            conn.Close();
            foreach (DataRow dataRow in dt.Rows)
            {
                foreach (var item in dataRow.ItemArray)
                {
                    //System.Diagnostics.Debug.WriteLine(item);
                    Console.WriteLine(item);
                }
            }

            return JsonConvert.SerializeObject(dt);
        }
        catch
        {
            return "something broke";
        }
    }

    public string getSpecificCustomer(string firstName, string lastName)
    {
        try 
        { 
            NpgsqlConnection conn = new NpgsqlConnection("Server=localhost;Port=5432;Database=waterdogpool;User Id=postgres;Password=admin;");
            conn.Open();
            NpgsqlCommand command = new NpgsqlCommand();
            command.Connection = conn;
            command.CommandType = CommandType.Text;
            command.CommandText = "SELECT * FROM customers WHERE firstname='" + firstName + "' AND lastname='" + lastName + "';";
            //System.Diagnostics.Debug.WriteLine(command.CommandText);
            NpgsqlDataAdapter nda = new NpgsqlDataAdapter(command);
            DataTable dt = new DataTable();
            nda.Fill(dt);
            conn.Dispose();
            conn.Close();
            foreach (DataRow dataRow in dt.Rows)
                {
                    foreach (var item in dataRow.ItemArray)
                    {
                        //System.Diagnostics.Debug.WriteLine(item);
                        Console.WriteLine(item);
                    }
                }
            return JsonConvert.SerializeObject(dt);
        }
        catch
        {
            return "something broke";
        }
    }


    //This service allows takes the customer info as input and inserts the data into 
    // a SQL database.
    public bool addCustomer(string firstName, string lastName, string phone, string address, string email, string route)
    {
        NpgsqlConnection conn = new NpgsqlConnection("Server=localhost;Port=5432;Database=waterdogpool;User Id=postgres;Password=admin;");
        NpgsqlCommand cmd = null;
     
        try
        {
            conn.Open();
            string sql = "INSERT INTO customers (firstname, lastname, phone, email, address, route)" +
                         "VALUES (:FirstName, :LastName, :Phone, :Email, :Address, :Route)";
            cmd = new NpgsqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("FirstName", firstName);
            cmd.Parameters.AddWithValue("LastName", lastName);
            cmd.Parameters.AddWithValue("Phone", phone);
            cmd.Parameters.AddWithValue("Email", address);
            cmd.Parameters.AddWithValue("Address", email);
            cmd.Parameters.AddWithValue("Route", route);
            cmd.Prepare();
            cmd.CommandType = CommandType.Text;
            cmd.ExecuteNonQuery();

            return true;
        }
        catch
        {
            return false;
        }
        finally
        {
            if (cmd != null) cmd.Dispose();
            if (conn != null) conn.Close();
        }
    }

    //This service allows you to delete customers from the database as long as you know the 
    // first and last name of the customer.
    public bool deleteCustomer(string firstName, string lastName)
    {
        NpgsqlConnection conn = new NpgsqlConnection("Server=localhost;Port=5432;Database=waterdogpool;User Id=postgres;Password=admin;"); ;
        NpgsqlCommand cmd = null;

        try
        {
            conn.Open();
            string sql = "DELETE FROM customers " +
                         "WHERE firstname = '" + firstName + "' AND lastname = '" + lastName + "';";
            cmd = new NpgsqlCommand(sql, conn);
            System.Diagnostics.Debug.WriteLine(cmd.CommandText);

            cmd.Prepare();
            cmd.CommandType = CommandType.Text;
            cmd.ExecuteNonQuery();

            return true;
        }
        catch
        {
            return false;
        }
        finally
        {
            if (cmd != null) cmd.Dispose();
            if (conn != null) conn.Close();
        }
    }

    //This service allows you to update existing records of customers as long as you know 
    // the customers first and last name.
    public bool updateCustomer(string currentFirstName, string currentLastName, string firstName, string lastName, string phone, string address, string email, string route)
    {
        NpgsqlConnection conn = new NpgsqlConnection("Server=localhost;Port=5432;Database=waterdogpool;User Id=postgres;Password=admin;"); ;
        NpgsqlCommand cmd = null;

        try
        {
            conn.Open();
            string sql = "UPDATE customers " +
                         "SET firstname = '" + firstName + "', lastname = '" + lastName + "', phone = '"+ phone + "', email = '"+ email + "', address = '" + address + "', route = '" + route +  "' " +
                         "WHERE firstname = '" + currentFirstName + "' AND lastname = '" + currentLastName + "';";
            System.Diagnostics.Debug.WriteLine(sql);
            cmd = new NpgsqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("FirstName", firstName);
            cmd.Parameters.AddWithValue("LastName", lastName);
            cmd.Parameters.AddWithValue("Phone", phone);
            cmd.Parameters.AddWithValue("Email", address);
            cmd.Parameters.AddWithValue("Address", email);
            cmd.Prepare();
            cmd.CommandType = CommandType.Text;
            cmd.ExecuteNonQuery();

            return true;
        }
        catch
        {
            return false;
        }
        finally
        {
            if (cmd != null) cmd.Dispose();
            if (conn != null) conn.Close();
        }
    }

}
