// falls das Modul nicht gefunden wird:
// - CTRL + SHIFT + P
// - TypeScript: Restart TS server
import { CanvasSpace, Num } from "pts";

var space = new CanvasSpace("#main");
space.setup({retina: true, resize: true});
var form = space.getForm();

// space.add( () => form.point(space.pointer, 10) );
space.add( (time, ftime) => {
    let radius = Num.cycle((time % 1000) / 1000) * 20;
    form.fill("#00cc00").point(space.pointer, radius, "circle");
});

space.play().bindMouse().bindTouch();