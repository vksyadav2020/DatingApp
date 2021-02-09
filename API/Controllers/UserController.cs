using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class UserController : BaseApiController
    {
        private readonly IMapper _mapper;

        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;

        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var user = await _userRepository.GetMembersAsync();
            return Ok(user);
        }

        [HttpGet("{username}")]

        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
            
        }
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
             var username=User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
             var user=await _userRepository.GetUserByUsernameAsync(username);
             _mapper.Map(memberUpdateDto,user);
             _userRepository.Update(user);

             if(await _userRepository.SaveAllAsync()) return NoContent();
             return BadRequest("Failed to update user");
        }

        private bool ClaimType(System.Security.Claims.Claim obj)
        {
            throw new NotImplementedException();
        }
    }
}