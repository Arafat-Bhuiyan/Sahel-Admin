import React from "react";
// import profile from "../../../src/assets/images/profile.jpg";
const Header = ({ title, subtitle }) => {
  return (
    <div className="flex items-center justify-between px-6 py-7 bg-[#FBFBFB]">
      <div>
        <h1 className="font-medium text-2xl text-black">{title}</h1>
        <p className="text-xs text-[#383838] mt-1">{subtitle}</p>
      </div>
      {/* <div className="flex items-center gap-3">
        <div>
          <button className="w-10 h-10 rounded-full overflow-hidden bg-[#F5F3F3] border border-[#093349] font-bold text-base">
            <img src={profile} alt="" />
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Header;
