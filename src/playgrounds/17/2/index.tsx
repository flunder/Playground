import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";

import { FullScreen } from "@app/components";
import { Switch } from "@app/components/Switch";
import { Terminal, TerminalLine } from "./Terminal";
import { Stars } from "./Stars";

import info from "./info.md";
import "./styles.css";

/*
  [x] Code a switch
  [x] Rewrite in a more "React" way
  [x] Handle text and children (1 level)
  [x] Colour support
  [x] Props for pre/post-delay and typeSpeed
  [x] Possibility to show instantly
  [x] Show and hide prompt Icon
  [x] Overflow handing and scroll to bottom
  [x] ▋▋▋▋▋▋▋ 44% Loading Component
  [x] DarkMode and light mode using the switch
  [ ] ability to copy all text + icon to copy
  [ ] toast confirmation message
*/

const Playground = () => {
  const [mode, setMode] = useState<"dark" | "bright">("dark");
  const switchChange = (val: number) => setMode(val === 0 ? "dark" : "bright");

  return (
    <FullScreen centerContent info={info} stretch>
      <Switch options={["Dark", "Bright"]} onChange={switchChange} />

      <div className="canvasWrap">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars />
        </Canvas>
      </div>

      <div className="contentWrap">
        <Terminal mode={mode}>
          <TerminalLine>
            <span className="red">npm </span>
            <span>install </span>
            <span>react 🥺</span>
          </TerminalLine>
          <TerminalLine typeDelay={0} postDelay={100} noPrompt>
            <span className="white">yarn add v1.22.19</span>
          </TerminalLine>
          <TerminalLine type="progress" noPrompt></TerminalLine>
          <TerminalLine typeDelay={0} postDelay={100} noPrompt>
            <span className="yellow">warning</span>
            <span>
              {" "}
              package.json: "test" is also the name of a node core module
            </span>
          </TerminalLine>
          <TerminalLine typeDelay={0} postDelay={1200} noPrompt>
            <span className="red">error</span>
            <span> Missing list of packages to add to your project.</span>
          </TerminalLine>
          <TerminalLine>yarn add npm</TerminalLine>
          <TerminalLine typeDelay={0} postDelay={100} noPrompt>
            yyyyyy1234
          </TerminalLine>
          <TerminalLine typeDelay={0} postDelay={100} noPrompt>
            oh yes it's typing 🌴🌴🚤🐑
          </TerminalLine>
          <TerminalLine typeDelay={0} postDelay={100} noPrompt>
            ok let's see if this thing can
          </TerminalLine>
          <TerminalLine typeDelay={0} postDelay={100} noPrompt>
            scroll as well?
          </TerminalLine>
          <TerminalLine typeDelay={0} postDelay={100} noPrompt>
            Duuuuuude
          </TerminalLine>
          <TerminalLine typeDelay={0} postDelay={100} noPrompt>
            it scrolls!
          </TerminalLine>
          <TerminalLine>
            <span className="red">Ou</span>
            <span className="yellow">hh</span>
            <span className="white">yeah!</span>
          </TerminalLine>
        </Terminal>
      </div>
    </FullScreen>
  );
};

export default Playground;
