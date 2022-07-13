import React from "react";
import MainNav from "../../components/widgets/main-nav";
import "./home.css";
import MobileNav from "./mobile-nav";
import Particles from "react-tsparticles";
import particlesConfig from "../../assets/appParticlesConfig.json";
import { Link } from "react-router-dom";

export default function Home() {
  const [mobileNav, setMobileNav] = React.useState(false);
  return (
    <>
      {/* <Particles params={particlesConfig} /> */}
      {mobileNav && (
        <MobileNav mobileNav={mobileNav} setMobileNav={setMobileNav} />
      )}

      <section className="home-main" id="particles-js">
        <MainNav mobileNav={mobileNav} setMobileNav={setMobileNav} />
        <div className="main-home-content container">
          <div>
            <div>
              <h2 className="mb-3">Welcome to Purse Manager</h2>
            </div>
            <div className="mb-3">
             
            </div>
            <div>
              <Link
                className="btn btn-primary button"
                to={"/dashboard"}
                target="_blank"
              >
                Launch App{" "}
              </Link>
            </div>
          </div>
          {/* <Particles params={particlesConfig} className="App-particles__container" /> */}
          <div></div>
        </div>
      </section>
    </>
  );
}
