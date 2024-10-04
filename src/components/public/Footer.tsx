import { FaFacebook, FaInstagram } from "react-icons/fa";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { ImLinkedin } from "react-icons/im";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="bg-black text-gray-300">
      <div className="flex flex-col md:flex-row gap-4 justify-between p-6 md:p-10 lg:p-14">
        <div className="flex flex-col md:gap-4">
          <div className="flex justify-center md:justify-start">
            <Logo color="gray" />
          </div>
          <div className="mt-4 md:mt-0 md:ms-4 text-center md:text-left">
            <h1 className="text-lg cursor-default">
              Find reliable blue-collar workers for your home projects. Browse
              profiles and book skilled professionals hassle-free.
            </h1>
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <p className="font-semibold cursor-default text-center md:text-left">About</p>
          <ul className="mt-5 text-center md:text-left">
            <li className="pt-2 cursor-pointer hover:text-yellow-100">
              Services
            </li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">
              Workers
            </li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Terms</li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className="mt-6 md:mt-0">
          <p className="font-semibold cursor-default text-center md:text-left">Resources</p>
          <ul className="mt-5 text-center md:text-left">
            <li className="pt-2 cursor-pointer hover:text-yellow-100">
              Help Docs
            </li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Guide</li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">
              Updates
            </li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">
              Contact Us
            </li>
          </ul>
        </div>
      </div>
      <hr className="mt-6 mx-6 md:mt-10 md:mx-16" />
      <div className="flex flex-col md:pb-5 md:flex-row mt-5 md:mt-5 mx-6 md:mx-16 justify-between text-center md:text-left">
        <p>2024 @ LabourConnect. All rights reserved.</p>
        <div className="flex gap-5 justify-center md:justify-start mt-4 md:mt-0">
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
