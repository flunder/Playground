import React, { useEffect, useRef, useState } from "react";
import { FullScreen } from "@app/components";
import { animated, useSpring, useSpringRef } from "@react-spring/web";

import "./styles.css";
import info from "./info.md";
import classNames from "classNames";

const Locations = [
  {
    name: "node--one",
    location: { x: 200, y: 450 }
  },
  {
    name: "node--two",
    location: { x: 400, y: 250 }
  },
  {
    name: "node--three",
    location: { x: 50, y: 50 }
  }
];

const center = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

const Playground = () => {
  const areaRef = useRef<HTMLDivElement>(null);
  const areaSpringRef = useSpringRef();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const delta = useRef({ x: 0, y: 0 });

  const areaStart = useRef([0, 0]);
  const areaCurrent = useRef([0, 0]);
  const areaLast = useRef([0, 0]);

  const style = useSpring({
    translateX: 0,
    translateY: 0,
    ref: areaSpringRef
  });

  const panTo = (e, index) => {
    const startValues = {
      x: style.translateX,
      y: style.translateX
    };

    setSelectedIndex(index);
    const current = e.target.getBoundingClientRect();

    const d = {
      x: window.innerWidth / 2 - current.x + delta.current.x,
      y: window.innerHeight / 2 - current.y + delta.current.y
    };

    areaSpringRef.start({
      translateX: d.x,
      translateY: d.y
    });

    delta.current = { x: d.x, y: d.y };
    areaLast.current = [d.x, d.y]; // Draggable
  };

  const onPointerDown = (event: any) => {
    if (event.target.className.indexOf("node") > -1) return;
    document.addEventListener("pointermove", OnPointerMove);
    document.addEventListener("pointerup", OnPointerUp);

    areaStart.current = [event.clientX, event.clientY];
  };

  const OnPointerMove = (event: any) => {
    const areaDelta = [
      areaStart.current[0] - event.clientX,
      areaStart.current[1] - event.clientY
    ];

    areaCurrent.current = [
      areaLast.current[0] + areaDelta[0],
      areaLast.current[1] + areaDelta[1]
    ];

    if (areaRef.current) {
      areaRef.current.style.cssText = `
        transform: translate(
          ${areaCurrent.current[0]}px,
          ${areaCurrent.current[1]}px
        )
      `;
    }
  };

  const OnPointerUp = (event: any) => {
    areaLast.current = areaCurrent.current;
    console.log(areaLast.current);
    document.removeEventListener("pointermove", OnPointerMove);
    document.removeEventListener("pointerup", OnPointerUp);
  };

  return (
    <FullScreen centerContent info={info}>
      <div className="center" style={{ left: center.x, top: center.y }} />

      <animated.div
        ref={areaRef}
        className="area"
        style={style}
        onPointerDown={onPointerDown}
      >
        {Locations.map(({ name, location: { x, y } }, i) => (
          <div
            key={name}
            style={{ top: x, left: y }}
            onClick={(e) => panTo(e, i)}
            className={classNames(`node ${name}`, {
              "node--selected": i === selectedIndex
            })}
          />
        ))}
      </animated.div>
    </FullScreen>
  );
};

export default Playground;
