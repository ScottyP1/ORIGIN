import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-white text-3xl md:text-6xl 2xl:text-7xl tracking-[25px] md:-ml-12 2xl:-ml-42"
    >
      ORIGIN
    </Link>
  );
};

export default Logo;
