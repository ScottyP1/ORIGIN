import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-white text-3xl md:text-6xl tracking-[25px] ps-12"
    >
      ORIGIN
    </Link>
  );
};

export default Logo;
