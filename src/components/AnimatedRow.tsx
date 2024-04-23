import { ReactNode, useEffect, useState } from "react";

interface AnimatedRowProps<T> {

  elements: T[];
  animationDirection?: "left" | "right";
  renderElement: (element: T) => ReactNode;
}
function AnimatedRow<T>({ elements, animationDirection = "right", renderElement }: AnimatedRowProps<T>) {
  const [items, setItems] = useState(elements)
  const direction = animationDirection === "right" ? "animate-slide-right" : "animate-slide-left"
  return (<>
    <div className="relative flex no-warp overflow-hidden gap-x-4">
      <div className={`flex flex-row gap-4 relative ${direction}`}>{items.map((item, index) => <div key={index}>{renderElement(item)}</div>)}</div>
      <div className={`flex flex-row gap-4 relative ${direction}`}>{items.map((item, index) => <div key={index}>{renderElement(item)}</div>)}</div>
      <div className={`flex flex-row gap-4 relative ${direction}`}>{items.map((item, index) => <div key={index}>{renderElement(item)}</div>)}</div>
    </div>
  </>);
}

export default AnimatedRow;
