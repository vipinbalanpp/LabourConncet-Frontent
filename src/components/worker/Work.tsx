import image from '../../assets/plwork2.webp';

const Work = () => {
  return (
    <div className='max-w-sm max-h-[400px] border border-yellow-500 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 duration-300 mt-5 cursor-pointer'>
      <div className='relative p-2'>
        <img 
          className='w-full h-[240px] object-cover'
          src={image}
          alt='work'
        />
      </div>
      <div className='p-4'>
        <p className='text-gray-600 text-sm'>
          “Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare. Morbi vitae tristique ante”
        </p>
      </div>
    </div>
  );
}

export default Work;
