<script setup lang="ts">
import _ from 'lodash';
import { onMounted, ref, watch } from 'vue';
import { useMousePosition, type Line, type Point } from '../composables/pen';

const colors = [
  '#ffff00',
  '#ff0000',
  '#0000ff',
  '#00ff00',
  '#00ffff',
  '#ff00ff',
  '#ffffff',
  '#000000',
  '#ffa500',
  '#800080',
  '#ffc0cb',
  '#a52a2a',
  '#808080',
];
const lines = ref([]);
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const color = ref('#ffff00');
const thickness = ref(5);

const { mouseDown, mouseUp, mouseMove } = useMousePosition({
  onMouseUp: sendLine,
  onMouseMove: sendLine,
});

function loadDefaultCanvasSettings(ctx: CanvasRenderingContext2D | null) {
  if (ctx) {
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }
  return ctx;
}

function sendLine(start: Point, end: Point) {
  nodecg.sendMessage('addTelestratorLine', {
    s: start,
    e: end,
    c: color.value,
    t: thickness.value,
  });
}

function drawLine(line: Line) {
  if (ctx.value) {
    ctx.value.beginPath();
    ctx.value.strokeStyle = line.c;
    ctx.value.lineWidth = line.t;
    ctx.value.moveTo(line.s.x, line.s.y);
    ctx.value.lineTo(line.e.x, line.e.y);
    ctx.value.stroke();
  }
}

onMounted(() => {
  // initialize canvas
  if (canvas.value) {
    canvas.value.width = 1920;
    canvas.value.height = 1080;
    ctx.value = canvas.value.getContext('2d');
    loadDefaultCanvasSettings(ctx.value);
  }

  nodecg.listenFor('addTelestratorLine', drawLine);
  nodecg.listenFor('clearTelestrator', clear);
});

function clearBtn() {
  nodecg.sendMessage('clearTelestrator');
}

function clear() {
  ctx.value?.clearRect(0, 0, canvas.value?.width ?? 1920, canvas.value?.height ?? 1080);
}

/* export default {
  name: 'Telestrator',
  mounted() {
    // initialize canvas
    canvas = document.getElementById('telestrator');
    canvas.width = 1920;
    canvas.height = 1080;
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    nodecg.listenFor('addTelestratorLine', telestratorLineAdded);
    nodecg.listenFor('clearTelestrator', clear);
  },
  methods: {
    mouseDown(e) {
      isMouseDown = true;
      lastPos = {
        x: e.pageX,
        y: e.pageY,
      };
    },

    mouseUp(e) {
      isMouseDown = false;

      const pos = {
        x: e.pageX,
        y: e.pageY,
      };

      if (lastPos.x != pos.x || lastPos.y != pos.y) {
        makeLine(lastPos, pos);
      }
    },

    mouseMove: _.throttle(function (e) {
      const pos = {
        x: e.pageX,
        y: e.pageY,
      };

      if (isMouseDown) {
        makeLine(lastPos, pos);
      }

      lastPos = pos;
    }, 20),

    makeLine(start, end) {
      nodecg.sendMessage('addTelestratorLine', {
        s: start,
        e: end,
        c: color,
        t: thickness,
      });
    },

    clearBtn() {
      nodecg.sendMessage('clearTelestrator');
    },

    clear() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },

    telestratorLineAdded(line) {
      ctx.beginPath();
      ctx.strokeStyle = line.c;
      ctx.lineWidth = line.t;
      ctx.moveTo(line.s.x, line.s.y);
      ctx.lineTo(line.e.x, line.e.y);
      ctx.stroke();
    },
  },
}; */
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <div class="telestrator-container">
          <canvas
            ref="canvas"
            id="telestrator"
            @mousedown="mouseDown"
            @mouseup="mouseUp"
            @mousemove="mouseMove"></canvas>

          <div class="telestrator-controls" @click.stop>
            <v-btn v-for="c in colors" :key="c" :color="c" @click="color = c" >
              <v-icon v-if="color == c">mdi-check</v-icon>
            </v-btn>
            <div style="width: 100px">
              <v-slider
                v-model="thickness"
                min="1"
                max="50"
                step="1"
                thumb-label
                :thumb-size="thickness"></v-slider>
            </div>
            <v-btn style="margin-left: 2em" @click="clearBtn">Clear</v-btn>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
canvas {
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
}

.telestrator-controls {
  &:not(:hover) {
    opacity: 0;
  }

  position: absolute;
  top: 0;
  left: 0;
  z-index: 1001;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;

  button i {
    text-shadow: 0 0 3px black;
  }
}
</style>
