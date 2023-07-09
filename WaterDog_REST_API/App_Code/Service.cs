using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

public class Service : IService
{
	public double PiValue()
    {
        return (System.Math.PI);
    }

    public int addition(int x, int y)
    {
        return (x + y);
    }
	
}
