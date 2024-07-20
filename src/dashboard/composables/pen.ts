import _ from 'lodash';
import { ref } from 'vue';

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
 * @param options An optional object with callbacks for actions to perform upon mouseUp, mouseDown, and mouseMove events.
 * @returns Event handlers for mouseMove, mouseDown, and mouseUp events. Also returns refs for whether the mouse is clicked and the mouse's current position.
 */
export function useMousePosition(options?: {
  onMouseDown?: (last: Point, curr: Point) => void;
  onMouseUp?: (last: Point, curr: Point) => void;
  onMouseMove?: (last: Point, curr: Point) => void;
}) {
  const isMouseDown = ref(false);
  const mousePos = ref<Point>({
    x: 0,
    y: 0,
  });

  function setMousePos(e: MouseEvent) {
    mousePos.value = {
      x: e.pageX,
      y: e.pageY,
    };
  }

  function mouseDown(e: MouseEvent) {
    isMouseDown.value = true;
    const pos = {
      x: e.pageX,
      y: e.pageY,
    };
    if (options?.onMouseDown) {
      options.onMouseDown(mousePos.value, pos);
    }
    setMousePos(e);
  }

  function mouseUp(e: MouseEvent) {
    isMouseDown.value = false;
    const pos = {
      x: e.pageX,
      y: e.pageY,
    };
    if (options?.onMouseUp) {
      options.onMouseUp(mousePos.value, pos);
    }
  }

  const mouseMove = _.throttle((e: MouseEvent) => {
    const pos = {
      x: e.pageX,
      y: e.pageY,
    };
    

    if (isMouseDown.value) {
      if (options?.onMouseMove) {
        options.onMouseMove(mousePos.value, pos);
      }

      setMousePos(e);
    }
  }, 20);

  return { mouseDown, mouseUp, mouseMove, mousePos, isMouseDown };
}
