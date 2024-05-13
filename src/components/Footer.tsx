import image from "../assets/Screenshot__161_-removebg-preview.png";

const Footer = () => {
  return (
    <div className="h-[400px] bg-black mt-10">
      <div className="flex gap-4 justify-between">
        <div className="flex pt-10 ps-14">
          <img className="h-[50px]" src={image} alt="LabourConnect" />
          <h1 className="py-5 text-xl">
            <span className="font-bold text-white">Labour</span>
            <span className="font-bold text-yellow-500">Connect</span>
          </h1>
        </div>
        <div>
          <ul >
            <li>Companies</li>
            <li>Prizing</li>
            <li>Terms</li>
            <li>Advice</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Help Docs</li>
            <li>Guide</li>
            <li>Updates</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div></div>
      </div>
      <div className="w-[350px]  ms-14">
        <h1 className="text-lg ">
          Great platform for the job seeker that passionate about startups. Find
          your dream job easier.
        </h1>
      </div>
      <hr className="mt-24 mx-16" />
    </div>
  );
};

export default Footer;
