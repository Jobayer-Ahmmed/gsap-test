import { useEffect, useRef } from "react";
import gsap from "gsap";
import hyperBim from "../../assets/video/hyperBim.mp4";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const videoRef = useRef(null);
  const cursorRef = useRef(null);  
  const cursorParentRef = useRef(null);
  useEffect(() => {
    const cursorParent = cursorParentRef.current;
    const cursor = cursorRef.current;
  
    const handleMouseMove = (e) => {
      const parent = cursorParent.getBoundingClientRect();
      const child = cursor.getBoundingClientRect().width / 2;
  
      let x = e.clientX - parent.left - child;
      let y = e.clientY - parent.top - child;
  
      // Constrain the cursor within parent boundaries
      x = Math.max(0, Math.min(x, parent.width - cursor.offsetWidth));
      y = Math.max(0, Math.min(y, parent.height - cursor.offsetHeight));
  
      gsap.to(cursor, {
        x: `${x + 20}px`,
        y: `${y + 40}px`,
        duration: 1.5,
        ease: "power3.out",
      });
    };
  
    const handleMouseLeave = () => {
      videoRef.current.pause();
      cursor.classList.add("cursorProjectsNone");
      cursor.classList.remove("cursorProjectsShow");
    };
  
    const handleMouseEnter = () => {
      videoRef.current.play();
      cursor.classList.add("cursorProjectsShow");
      cursor.classList.remove("cursorProjectsNone");
    };
  
    if (cursorParent) {
      cursorParent.addEventListener("mousemove", handleMouseMove);
      cursorParent.addEventListener("mouseleave", handleMouseLeave);
      cursorParent.addEventListener("mouseenter", handleMouseEnter);
    }
  
    return () => {
      if (cursorParent) {
        cursorParent.removeEventListener("mousemove", handleMouseMove);
        cursorParent.removeEventListener("mouseleave", handleMouseLeave);
        cursorParent.removeEventListener("mouseenter", handleMouseEnter);
      }
    };
  }, []);
  

  const handleMouseEnter = () => {
    videoRef.current.play();
    
    // Use GSAP to scale the element
    gsap.to(cursorRef.current, {
      scale: 1,
      rotate:180,
      duration: 0.3,
      opacity:1,
      ease: "power3.out",
    });
  };
  
  const handleMouseLeave = () => {
    videoRef.current.pause();
    
    // Use GSAP to scale back the element
    gsap.to(cursorRef.current, {
      scale: .1,
      rotate:180,
      duration: 0.8,
      opacity:0,
      ease: "power3.out",
    });
  };
  

  return (
    <div className="text-gray-500 text-sm  lg:px-8 px-4 mt-16">
      <div className="w-full">
        <div ref={cursorParentRef} id="cursorParentDiv" className="relative w-full">
          <div
            ref={cursorRef}
            id="cursorDiv"
            className="absolute flex items-center justify-center w-10 h-10 bg-slate-100 rounded "
          ><span className="text-2xl -mt-1">+</span>
          </div>
          <video
            ref={videoRef}
            loop
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-full rounded-md"
          >
            <source src={hyperBim} type="video/mp4" />
          </video>
        </div>
        <div className="flex justify-between mt-8">
          <div className="text-2xl">
            <p>Pebble: Apple and Tesla visionaries </p>
            <p>rethink living on the road.</p>
          </div>
          <div>
            <div className="flex gap-1">
              <button className="px-3 py-2 border-2 border-gray-500 rounded">
                EXPERIENCE
              </button>
              <button className="px-3 py-2 border-2 border-gray-500 rounded">
                CONTENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
