import { CanvasSpace, Pt, Num, Const, Geom } from "pts";

var space = new CanvasSpace("#main");
space.setup({retina: true, resize: true});
var form = space.getForm();

const sizeTime = 4000;
const rotateTime = 2700;
const size = 30;

space.add( (time, ftime) => {
    let rotateFactor = (time % rotateTime) / rotateTime;
    let sizeFactor = Num.cycle((time % sizeTime) / sizeTime);
    let currentSize = size * sizeFactor;
    
    let pointer = space.pointer;
    let top = new Pt(pointer.x, 0);
    let left = new Pt(0, pointer.y);

    let circle = pointer.$add(size * 1.9, 0);
    circle.rotate2D(Const.two_pi * rotateFactor, pointer);
    
    // Winkel zwischen Mittelpunkt & Mauscursor bestimmen
    // und Kreis um den Mauscursor danach ausrichten
    // let angle = pointer.$subtract(space.center).angle();
    // circle.rotate2D(Geom.boundRadian(angle), pointer);

    form.strokeOnly("white").line([pointer, left, top]);
    form.fillOnly("black").point(pointer, currentSize);
    form.strokeOnly("white").line([top, circle]);
    form.fill("red").stroke("white", 2).point(circle, size / 2, "circle");
    form.fillOnly("black").point(top, currentSize);
    form.fillOnly("black").point(left, currentSize);
});

space.bindMouse();
space.play();