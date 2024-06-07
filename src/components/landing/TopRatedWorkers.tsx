import Worker from "../public/Worker"


const TopRatedWorkers = () => {
    return (
        <div className="">
            <h1 className="p-5 text-black font-semibold  text-3xl ps-24">Top Rated Workers</h1>
      <div className="flex flex-wrap justify-between px-20">
        <Worker/>
        <Worker/>
        <Worker />
        <Worker/>
        <Worker/>
        <Worker/>
        <Worker/>
        <Worker/>
      </div>
      <div className="flex justify-end mt-2">
      <button className="flex pt-5 text-sm  text-yellow-500  bg-white  h-10 pe-14">
          View All
        </button>
      </div>
    </div>
    )
}
export default TopRatedWorkers