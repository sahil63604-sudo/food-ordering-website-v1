import logo from "../src/assets/logo.png";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFF8DD]">

      {/* Logo */}
      <img
        src={logo}
        alt="logo"
        className="h-44 animate-pulse"
      />

      <h1 className="mt-4 text-4xl font-extrabold text-gray-800 tracking-wider">
        HUNGER TOWN
      </h1>

      <p className="mt-3 text-orange-500 font-semibold text-lg">
        Preparing your meal...
      </p>

      {/* Bouncing Dots */}
      <div className="flex gap-2 mt-5">
        <span className="w-3 h-3 rounded-full bg-orange-500 animate-bounce"></span>
        <span
          className="w-3 h-3 rounded-full bg-orange-500 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>
        <span
          className="w-3 h-3 rounded-full bg-orange-500 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 w-72 h-2 bg-orange-200 rounded-full overflow-hidden">

        <div
          className="h-full bg-gradient-to-r from-orange-500 to-amber-500 animate-[loading_2s_linear_infinite]"
        ></div>

      </div>
    </div>
  );
};

export default Loader;