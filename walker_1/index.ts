import { CanvasSpace, Group, Pt } from "pts";

var space = new CanvasSpace("#main");
space.setup({retina: true, resize: true});
var form = space.getForm();

const pointSize = 8;
const distance = pointSize * 2;
const positionCurrent = new Pt(5, 30);
const positionMaximum = new Pt(5, 50);

var walker = new Group();
var directions: Pt[] = [
    new Pt(distance, 0),
    new Pt(-distance, 0),
    new Pt(0, distance),
    new Pt(0, -distance),
];
var maximum: number = 0;
var timer: number = 0;
var foundAWay: boolean = false;

function shuffleArray(array : any[]) {
    for(let index = array.length - 1; index > 0; --index) {
        const temp = Math.floor(Math.random() * (index + 1));
        [array[index], array[temp]] = [array[temp], array[index]];
    }
}

function isPointValid(newPoint: Pt, walker: Group): boolean {
    if(newPoint.x < 0 || newPoint.x > space.width)
        return false;
    if(newPoint.y < 0 || newPoint.y > space.height)
        return false;
    return !walker.some(el => el.x === newPoint.x && el.y === newPoint.y)
}

space.add( {
    start: function() {

    },

    animate: function(time, ftime) {
        if(walker.length === 0) {
            walker.push(space.center);
            foundAWay = true;
        } else if(foundAWay) {
            let lastPoint = walker[walker.length - 1];
            let newPoint: Pt;
            shuffleArray(directions);
            foundAWay = false;
            for(let dir of directions) {
                newPoint = lastPoint.$add(dir);
                if(isPointValid(newPoint, walker)) {
                    walker.push(newPoint);
                    foundAWay = true;
                    break;
                }
            }
        } else {
            timer += ftime;
            if(timer > 1000) {
                if(walker.length > maximum) {
                    maximum = walker.length;
                }
                walker = new Group();
                timer = 0;
            }
        }

        form.fillOnly("black").points(walker, pointSize, "circle");
        if(!foundAWay) {
            form.fill("red").point(walker[walker.length - 1], pointSize, "circle");
        }

        form.fillOnly("black").font(12).text(positionCurrent, `Current: ${walker.length.toString()}`);
        form.fillOnly("black").font(12).text(positionMaximum, `Maximum: ${maximum}`);
    }
});

space.bindMouse();
space.play();