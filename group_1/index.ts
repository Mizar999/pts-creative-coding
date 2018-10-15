import { CanvasSpace, Group, Pt, Const, Geom, Num } from "pts";

function GetPoint(x: number): Pt {
    // return new Pt(x, Math.pow(x, 2) * 0.008);
    // return new Pt(x, 0.0001 * Math.pow(x, 3) + 0.0003 * Math.pow(x, 2) - .2 * x - 1);
    return new Pt(x, Math.cos(x) * 108 + 400);
}

var space = new CanvasSpace("#main");
space.setup({retina: true, resize: true});
var form = space.getForm();

const angleFactor = 0.001;
const copyCounter = 18;
const initDiffAngle = 0.004;

var lineGroups: Group[] = [new Group()];

space.add( {
    start: function() {
        // Group ist ein Array, dass nur aus Pt-Elementen besteht
        // lineGroup = new Group( new Pt(), new Pt(100, 200), space.center);
        for(let i = 30; i < space.width; i += 25)
            lineGroups[0].push(GetPoint(i));

        for(let i = 0; i < copyCounter; ++i) {
            lineGroups.push(lineGroups[0].clone());
            lineGroups[lineGroups.length - 1].rotate2D(Const.two_pi * Math.random(), space.center);
        }
    },
    
    animate: function(time, ftime) {
        let diffAngle = initDiffAngle;
        form.strokeOnly("black", 3);

        for(let gr of lineGroups) {
            gr.rotate2D(Const.one_degree * angleFactor + diffAngle, space.center);
            form.line(gr);

            diffAngle *= 1.2;
        }

        let yPos = 20;
        form.fillOnly("darkblue").font(12, "bold");
        for(let p of lineGroups[0]) {
            // form.text(new Pt(10, (yPos += 15)), p.toString());
        }
    }
});

space.bindMouse();
space.play();