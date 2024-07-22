import { FaStar } from "react-icons/fa";
import user from "../../assets/user.png"

const Testimonial = () => {
  return (
    <div className="w-[450px] md:w-[400px] rounded-3xl h-[250px] bg-white hover:scale-105 duration-300 hover:shadow-xl mt-10  cursor-pointer hover:rounded-md  shadow-md ">
      <div className="flex gap-4 pt-4 ps-8">
        <FaStar className="text-yellow-500 text-2xl"/>
        <FaStar className="text-yellow-500 text-2xl"/>
        <FaStar className="text-yellow-500 text-2xl"/>
        <FaStar className="text-yellow-500 text-2xl"/>
        <FaStar className="text-yellow-500 text-2xl"/>
      </div>
      <h1 className="text-black text-sm pt-4 ps-8">“Finding reliable workers for my home projects was always a hassle until I discovered this app. Now, I can easily browse profiles, read reviews, and book skilled professionals with confidence. Highly recommended!.”</h1>
     <div className="flex mt-10 ms-10">
     <img className="w-12 h-12 rounded-full border border-yellow-200" src={user}/>
     <p className="text-black pt-2 ps-4 font-semibold">Vipin Balan</p>
     </div>
    </div>
  );
};

export default Testimonial;
