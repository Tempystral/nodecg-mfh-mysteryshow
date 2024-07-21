import _ from 'lodash';
import { ref, unref } from 'vue';

export type Point = {
  x: number;
  y: number;
};

export type Line = {
  s: Point;
  e: Point;
  c: string;
  t: number;
};

/**
 * Returns a set of functions and objects to describe a mouse onscreen.
 * @param options An optional set of callbacks to perform for each mouse event.
 * @param options.onMouseDown Callback for onMouseDown event. 
 * @param options.onMouseUp Callback for onMouseUp event.
 * @param options.onMouseMove Callback for onMouseMove event.
 * @param options.adjustPos If specified, this callback adjusts the detected mouse position. Useful for working with a canvas.
 * @returns Event handlers for mouseMove, mouseDown, and mouseUp events. Also returns refs for whether the mouse is clicked and the mouse's current position.
 */
export function useMousePosition(options?: {
  onMouseDown?: (last: Point, curr: Point) => void;
  onMouseUp?: (last: Point, curr: Point) => void;
  onMouseMove?: (last: Point, curr: Point) => void;
  adjustPos?: (pos: Point) => Point;
}) {
  const isMouseDown = ref(false);
  const mousePos = ref<Point>({
    x: 0,
    y: 0,
  });

  function getPos(e: MouseEvent) {
    let pos = {
      x: e.pageX,
      y: e.pageY,
    };
    if (options?.adjustPos) {
      pos = options.adjustPos(pos);
    }
    return pos;
  }

  function setMousePos(e: MouseEvent) {
    mousePos.value = getPos(e);
    console.log(unref({...mousePos.value}))
  }

  function mouseDown(e: MouseEvent) {
    isMouseDown.value = true;
    const pos = getPos(e);
    if (options?.onMouseDown) {
      options.onMouseDown(mousePos.value, pos);
    }
    setMousePos(e);
  }

  function mouseUp(e: MouseEvent) {
    isMouseDown.value = false;
    const pos = getPos(e);
    if (options?.onMouseUp) {
      options.onMouseUp(mousePos.value, pos);
    }
  }

  const mouseMove = _.throttle((e: MouseEvent) => {
    const pos = getPos(e);
    
    if (isMouseDown.value) {
      if (options?.onMouseMove) {
        options.onMouseMove(mousePos.value, pos);
      }

      setMousePos(e);
    }
  }, 20);

  return { mouseDown, mouseUp, mouseMove, mousePos, isMouseDown };
}
