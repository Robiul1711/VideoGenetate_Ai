import { FaPlay } from 'react-icons/fa';

const VideoButton = ({ onClick }) => {
  return (

      <div className="relative inline-block">
        {/* Play Button */}
        <button onClick={onClick} className="w-[50px] h-[50px] rounded-full bg-white text-primary text-center z-10 relative flex items-center justify-center">
          <FaPlay className="text-md" />
        </button>

        {/* Waves */}
        <span className="waves wave-1 absolute right-[-50px] bottom-[-50px] bg-white/50 backdrop-blur-sm rounded-full z-0" />
        <span className="waves wave-2 absolute right-[-50px] bottom-[-50px] bg-white/30 backdrop-blur-sm rounded-full z-0" />
        <span className="waves wave-3 absolute right-[-50px] bottom-[-50px] bg-white/20 backdrop-blur-sm rounded-full z-0" />
      </div>
  
  );
};

export default VideoButton;