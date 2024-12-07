using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using tapinto.Server.DataTransferObjects;

namespace tapinto.Server.Helpers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<ActivityDto, Activity>();
        }
    }
}