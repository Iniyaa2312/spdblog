
import React, { useState } from "react";
import { BsMedium } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../../../utils/Modal";
import UserModal from './UserModal'
import { Blog } from "../../../Context/Context";
import Search from './Search'
const HomeHeader = () => {
  const [modal,setModal]=useState(false);
  const { pathname } = useLocation();
  const { allUsers, userLoading, currentUser, setPublish, title, description } =Blog();
  const [searchModal, setSearchModal] = useState(false);
  const getUserData = allUsers?.find((user) => user.id === currentUser?.uid);
  return (
    <header className="border-b border-gray-200">
      
    <div className="size h-[60px] flex items-center justify-between">
      {/*left side*/}
      <div className="flex items-center gap-3">
      <Link to={"/"}>
          <img
            className="h-[2.5rem]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCMrcYYoN8CFI6SHo-sdwas3lfqTCVCZNwpw&s"
            alt="logo"
          />
        </Link>
       <Search modal={searchModal} setModal={setSearchModal}></Search>
       
       </div>
       {/*right side */}

       <div className="flex items-center gap-3 sm:gap-7">
       <span
            onClick={() => setSearchModal(true)}
            
            className="flex sm:hidden text-3xl text-gray-300 cursor-pointer">
            <CiSearch />
          </span>
          
          {pathname === "/write" ? (
            <button
              onClick={() => setPublish(true)}
              className="btn !bg-green-700 !py-1 !text-white !rounded-full">
              Publish
            </button>
          )  : (
            <Link
              to="/write"
              className="hidden md:flex items-center gap-1 text-gray-500">
              <span className="text-3xl">
                <LiaEditSolid />
              </span>
              <span className="text-sm mt-2">Write</span>
            </Link>
          )}
          
          <div className="flex items-center relative">
            <img
             onClick={() => setModal(true)}
              className="w-[3 rem] h-[2.3rem] object-cover rounded-full cursor-pointer"
              src={getUserData?.userImg || "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"}
              alt="profile-img"
            />
            <span className="text-gray-500 cursor-pointer">
              <MdKeyboardArrowDown />
            </span>
            <Modal modal={modal} setModal={setModal}>
              <div
                className={`${
                  modal ? "visible opacity-100%" : "invisible opacity-0"
                } transition-all duration-100`}>
                <UserModal setModal={setModal} />
              </div>
            </Modal>
         
       </div>
       
      </div>
      </div>
      </header>
  );


};

export default HomeHeader;