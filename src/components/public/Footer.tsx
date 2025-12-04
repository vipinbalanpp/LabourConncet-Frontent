import { FaFacebook, FaInstagram } from "react-icons/fa";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { ImLinkedin } from "react-icons/im";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="bg-black text-gray-300">
      <div className="flex flex-col md:flex-row justify-between gap-8 p-6 md:p-10 lg:p-14">
        {/* Logo + Description */}
        <div className="flex flex-col md:w-1/2">
          <div className="flex justify-center md:justify-start">
            <Logo color="gray" />
          </div>

          <p className="mt-4 text-center md:text-left text-sm leading-relaxed">
            Find reliable blue-collar workers for all your home projects with
            ease, whether you need a plumber, electrician, carpenter, painter,
            or general handyman. Our platform lets you conveniently browse
            detailed profiles of skilled and verified professionals with
            transparent pricing, customer reviews, and seamless booking. Whether
            it’s a quick fix or a major project, you can trust our experts to
            deliver quality work efficiently.
          </p>
        </div>

        {/* About Section */}
        <div>
          <p className="font-semibold cursor-default text-center md:text-left">
            About
          </p>
          <ul className="mt-4 text-center md:text-left">
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

        {/* Resources Section */}
        <div>
          <p className="font-semibold cursor-default text-center md:text-left">
            Resources
          </p>
          <ul className="mt-4 text-center md:text-left">
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

      <hr className="mx-6 md:mx-16 border-gray-700" />

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row justify-between items-center mx-6 md:mx-16 py-5">
        <p className="text-sm">2024 © LabourConnect. All rights reserved.</p>

        <div className="flex gap-5 mt-4 md:mt-0">
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
