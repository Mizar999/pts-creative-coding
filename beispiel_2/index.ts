import {CanvasSpace, Rectangle, Num, Triangle} from "pts";

var space = new CanvasSpace("#main");
space.setup({retina: true, resize: true})
var form = space.getForm();

space.add( (time, ftime) => {
    // Rectangles
    var rect = Rectangle.fromCenter(space.center, space.size.$divide(2));
    var poly = Rectangle.corners(rect); // Gibt Gruppe mit 4 Punkten zurück
    poly.shear2D(Num.cycle(time % 5000 / 5000) - 0.5, space.center);

    // Triangles
    // Gruppe wird in Untergruppen mit je 2 Punkten zerteilt
    var tris = poly.segments(2, 1, true);
    tris.map( (t) => t.push(space.pointer)); // Jeder Untergruppe 1 Punkt hinzufügen

    // Circles
    // Für alle Dreiecke wird ein Kreis erzeugt
    var circles = tris.map( (t) => Triangle.incircle(t) );

    // Draw
    form.fillOnly("#123").polygon(poly);
    form.fill("#f00").circles(circles)
    form.strokeOnly("#fff", 2).polygons(tris);
    form.fill("#f00").point(space.pointer, 5, "circle")
});

space.play().bindMouse().bindTouch();