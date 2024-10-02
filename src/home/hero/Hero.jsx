import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import "./hero.css";
import hill1 from "../../assets/hill1.jpg";
import hill2 from "../../assets/hill2.jpg";

const Hero = () => {
  const heroRef = useRef(null);
  const hill1Ref = useRef(null);
  const hill2Ref = useRef(null);
  const [textSize, setTextSize] = useState(5);

  useEffect(() => {
 
    gsap.fromTo(
      heroRef.current,
      { scale: 0.01,
        rotate: 20,
        borderRadius:500
       },  
      { scale: 1,
        rotate:0, 
        borderRadius:0,
        duration: 2,
         ease: "power2.out" } 
    );

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const hero = heroRef.current.getBoundingClientRect();
      const x = clientX - hero.left; 
      const y = clientY - hero.top; 

  
      const moveX1 = (x - hero.width / 2) * 0.05;
      const moveY1 = (y - hero.height / 2) * 0.05;

      const moveX2 = (x - hero.width / 2) * 0.02;
      const moveY2 = (y - hero.height / 2) * 0.02;


      const skewX = (x / hero.width - 0.5) * 10; 
      const skewY = (y / hero.height - 0.5) * 10; 

  
      gsap.to(hill1Ref.current, {
        x: moveX1,
        y: moveY1,
        skewX: skewX,   
        skewY: skewY,
        ease: "power2.out",
      });

      gsap.to(hill2Ref.current, {
        x: moveX2,
        y: moveY2,
        skewX: skewX * 0.5, 
        skewY: skewY * 0.5,
        ease: "power2.out",
      });
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newSize = Math.max(2, 5 - Math.abs(scrollY / 100)); 
      setTextSize(newSize);
    };

    const heroElement = heroRef.current;
    heroElement.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      heroElement.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="heroDiv"
      ref={heroRef}
      className="relative bg-slate-600 pt-60 h-[100vh] text-center text-gray-400"
    >
      <div
        className="text-div relative z-[100] transition-all duration-300"
        style={{ fontSize: `${textSize}rem` }}
      >
        <h1>Tapping into your</h1>
        <h1>brand's unrealized potential</h1>
      </div>
      <img
        ref={hill1Ref}
        className="absolute bottom-36 right-56 h-[60vh] hue-rotate-90 rotate-[90deg] "
        src={hill1}
        alt="hill1"
      />
      <img
        ref={hill2Ref}
        className="absolute bottom-10 left-32 h-[80vh] rotate-180"
        src={hill2}
        alt="hill2"
      />
    </div>
  );
};

export default Hero;
