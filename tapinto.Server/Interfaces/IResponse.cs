using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tapinto.Server.Interfaces
{
    public interface IResponse<T>
    {
        string Message { get; set; }
        bool Success { get; set; }
        T Data { get; set; }
    }
}