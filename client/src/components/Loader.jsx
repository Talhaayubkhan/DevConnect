// components/Loader.jsx
const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-base-100">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loader;
