import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import avatar from "../data/avatar.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Cart from "./Cart";
import Chat from "./Chat";
import Notification from "./Notification";
import UserProfile from "./UserProfile";

const NavButton = ({ title, cutsomFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      onClick={cutsomFunc}
      style={{ color }}
    >
      <span
        className=" absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        style={{ backgroundColor: dotColor }}
      >
        {icon}
      </span>
    </button>
  </TooltipComponent>
);

function Navbar() {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleCilck,
    screenSize,
    setScreenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  return (
    <div className="flex justify-between md:mx-6 p-2 relative">
      <NavButton
        title="Menu"
        cutsomFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color="blue"
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <NavButton
          title="Cart"
          cutsomFunc={() => handleCilck("cart")}
          color="blue"
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Chat"
          dotColor="#03c907"
          cutsomFunc={() => handleCilck("chat")}
          color="blue"
          icon={<BsChatLeft />}
        />
        <NavButton
          title="Notification"
          dotColor="#03c907"
          cutsomFunc={() => handleCilck("notification")}
          color="blue"
          icon={<RiNotification3Line />}
        />
        <TooltipComponent content="profile" position="BottomCenter">
          <div
            className="flex gap-2 cursor-pointer items-center p-1 hover:bg-light-gray rounded-lg "
            onClick={() => handleCilck("userprofile")}
          >
            <img src={avatar} className="rounded-full w-8 h-8" alt="" />
            <p>
              <span className="text-gray-400 text-14">Hi, </span>{" "}
              <span className="text-gray-500 font-bold ml-1 text-14">
                Abdullah
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>
        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userprofile && <UserProfile />}
      </div>
    </div>
  );
}

export default Navbar;
