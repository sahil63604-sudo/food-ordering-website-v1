import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-7xl font-bold text-red-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;