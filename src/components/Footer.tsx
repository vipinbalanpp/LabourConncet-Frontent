import { FaFacebook, FaInstagram } from "react-icons/fa";
import image from "../assets/Screenshot__161_-removebg-preview.png";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { ImLinkedin } from "react-icons/im";

const Footer = () => {
  return (
    <div className="h-[400px] bg-black mt-10">
      <div className="flex gap-4 justify-between">
        <div>
        <div className="flex pt-10 ps-14">
          <img className="h-[50px]" src={image} alt="LabourConnect" />
          <h1 className="py-5 text-xl">
            <span className="font-bold text-[rgb(31,55,74)] cursor-pointer">Labour</span>
            <span className="font-bold text-yellow-500 cursor-pointer">Connect</span>
          </h1>
        </div>
        <div className="w-[350px]  ms-14">
        <h1 className="text-lg cursor-default">
        Find reliable blue-collar workers for your home projects. Browse
                profiles and book skilled professionals hassle-free.
        </h1>
      </div>
        </div>
       
        <div className="pt-16">
          <p className="font-semibold cursor-default">About</p>
          <ul className="mt-5">
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Services</li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Workers</li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Terms</li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Privacy Policy</li>
          </ul>
        </div>
        <div className="pt-16">
          <p className="font-semibold cursor-default">Resources</p>
          <ul className="mt-5">
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Help Docs</li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Guide</li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Updates</li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Contact Us</li>
          </ul>
        </div>
        <div></div>
      </div>
      <hr className="mt-24 mx-16" />
      <div className="flex mt-5 mx-16 justify-between">
        <p>2024 @ LabourConnect. All rights reserved.</p>
        <div className="flex gap-5">
          <FaFacebook className="cursor-pointer hover:text-yellow-100" />
          <TiSocialTwitterCircular className="cursor-pointer hover:text-yellow-100" />
          <ImLinkedin className="cursor-pointer hover:text-yellow-100" />
          <FaInstagram className="cursor-pointer hover:text-yellow-100" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
