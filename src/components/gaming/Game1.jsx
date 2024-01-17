import React, { useEffect, useRef } from "react";
import { Engine, Render, Bodies, World } from "matter-js";

const Game1 = () => {
  const scene = useRef();
  const isPressed = useRef(false);
  const engine = useRef(Engine.create());

  useEffect(() => {
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
      },
    });

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw*0.67, ch / 2, 600, 60, {
        isStatic: true,
        angle: -Math.PI / 3,
      }),
      Bodies.rectangle(cw *0.43, ch / 2, 600, 60, {
        isStatic: true,
        angle: Math.PI / 3,
      }),
      
    ]);

    Engine.run(engine.current);
    Render.run(render);

    return () => {
      Render.stop(render);
      World.clear(engine.current.world);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  const handleDown = () => {
    isPressed.current = true;
  };

  const handleUp = () => {
    isPressed.current = false;
  };

  const handleAddCircle = (e) => {
    if (isPressed.current) {
      const ball = Bodies.circle(e.clientX, e.clientY, Math.random() * 30, {
        mass: 10,
        restitution: 0.9,
        friction: 0.005,
        render: {
          fillStyle: Math.random()*"#ffffff",
        },
      });
      World.add(engine.current.world, [ball]);
    }
  };

  return (
    <div
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseMove={handleAddCircle}
      className="w-screen h-screen"
    >
      <div ref={scene} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};
export default Game1;
