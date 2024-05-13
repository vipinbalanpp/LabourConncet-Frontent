import image from "../assets/user.png";
import service from "../assets/plumbing.jpg";

const Worker = () => {
  return (
      <div className="flex  w-[300px] h-[200px] border border-1 mt-5 shadow-md duration-300 hover:scale-105 hover:shadow-xl ">
        <img className="w-14 m-5  h-14 rounded-full" src={image} />
        <h2 className=" text-black mt-3 pt-5  font-semibold">Plumbing</h2>
        <img className="w-16 h-16 ms-12" src={service}/>
      </div>
  );
};

export default Worker;
