import image from '../assets/file (1).png';

const Banner = () => {
    return (
        <div className='flex w-full py-10  md:pt-28 bg-slate-100 '>
            <div className='md:w-1/2 w-full md:py-44 ps-10 md:ps-20'>
                <h1>
                <span className='md:text-3xl text-lg font-semibold text-yellow-600'><span className='text-black'>Connecting You to Skilled Hands:</span> Find the Right</span>
                </h1>
                <h1 className='md:mt-5'>
                <span className='md:ps-36 md:text-3xl font-semibold text-lg ps-24 text-yellow-600'>Worker for Every Job</span>
                </h1>
                <div className='flex  w-full mt-10'>
                    <input className='md:h-[50px] md:w-[500px] w-[250px]  bg-white outline  pl-4 outline-yellow-400 focus:rounded-3xl duration-300 rounded-xl text-black' placeholder='Search by the job... ' />
                    <button className='h-[50px] bg-yellow-500 w-32 rounded-xl border  ms-2  text-white hover:rounded-3xl duration-300'>Search</button>
                </div>
                </div>
                <div className='hidden md:block  md:w-1/2'>
                    <img src={image} alt="" />
                </div>
        </div>
    )
}

export default Banner
