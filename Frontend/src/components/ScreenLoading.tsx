import { Spinner } from 'flowbite-react'; // or your spinner

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 transition-opacity duration-500">
      <div className="text-center text-white space-y-4">
        <Spinner size="xl" color="info" />
        <p className="text-lg animate-pulse">Loading application...</p>
      </div>
    </div>
  );
};

export default FullScreenLoader;
