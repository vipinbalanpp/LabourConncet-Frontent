

const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <span className="loading absolute top-1/2 right-1/2  text-yellow-500 loading-spinner loading-lg"></span>
        </div>
    )
}

export default Loading
