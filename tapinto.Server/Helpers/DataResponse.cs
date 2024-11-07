using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tapinto.Server.Interfaces;

namespace tapinto.Server.Helpers
{
    public class DataResponse<T>
    {
        public T Data { get; set; }
        public string Message { get; set; }
        public bool RequestSuccessful { get; set; }
        public DataResponse(string message = "", bool requestSuccessful = false, T data = default)
        {
            Data = data;
            Message = message;
            RequestSuccessful = requestSuccessful;
        }
        public void ResponseSuccessWithMessage(string message = "Request Success", T data = default)
        {
            RequestSuccessful = true;
            Message = message;
            Data = data;
        }
        public void ResponseFailedWithMessage(string message = "Request Failed")
        {
            RequestSuccessful = false;
            Message = message;
        }
    }
}