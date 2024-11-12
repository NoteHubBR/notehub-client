'use client';

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "@/data/hooks/useTheme";

const TsParticles = () => {

  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (): Promise<void> => { return; };

  const { isDarkMode } = useTheme();

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: `${isDarkMode ? "#171717" : "#fafafa"}`,
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 85,
            links: {
              blink: true,
              consent: true,
              opacity: 1,
            }
          },
        },
      },
      particles: {
        color: {
          value: "#7c3aed",
        },
        links: {
          color: "#7c3aed",
          distance: 85,
          enable: true,
          opacity: 1,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 300,
        },
        opacity: {
          value: 1,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 2, max: 2 },
        },
      },
      detectRetina: true,
    }), [isDarkMode]);

  if (init) {
    return (
      <Particles
        id="tsparticles"
        className="-z-10 absolute"
        particlesLoaded={particlesLoaded}
        options={options}
      ></Particles>
    );
  }

  return <></>;

};

export default TsParticles;