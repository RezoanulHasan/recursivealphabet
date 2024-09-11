import { motion, useScroll } from "framer-motion";
import "./scroll.css";

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className=" progress-bar   "
      />
    </div>
  );
};

export default Navbar;
