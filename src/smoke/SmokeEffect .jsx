
import smoke from "../assets/smoke.png"
import "./smokeEffect.css"

const SmokeEffect  = () => {
  return (
    <div className="cup-wrap">
    <div className="smoke-wrap">
      <img className="smoke" src={smoke} alt="smoke"/>
    </div>
    <div className="smoke-wrap">
      <img className="smoke2" src={smoke} alt="smoke"/>
    </div>
    <div className="smoke-wrap">
      <img className="smoke3" src={smoke} alt="smoke"/>
    </div>
  </div>
  )
}

export default SmokeEffect 

