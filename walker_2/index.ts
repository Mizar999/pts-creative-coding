import { CanvasSpace, CanvasForm, Util, Group, Pt } from "pts";

class Walker2Example {
    private points: Group;

    constructor(start?: Pt) {
        this.points = new Group();
        if(start)
            this.points.push(start.clone());
    }

    step() {
        if(this.points.length === 0) {
            this.points.push(new Pt());
        // } else if(length < 1300) {
        } else {
            if(Math.random() < 0.5)
                this.moveToRandomDirection();
            else
                this.moveToMouse();
                
            // this.moveToDirectionProbability();
        }
    }

    display(form: CanvasForm) {
        form.strokeOnly("black", 1).points(this.points, 1, "square");
    }

    private moveToRandomDirection() {
        let newPoint = this.points[this.points.length - 1].clone();
        newPoint.x += Util.randomInt(3) - 1;
        newPoint.y += Util.randomInt(3) - 1;
        this.points.push(newPoint);
    }

    private moveToDirectionProbability() {
        // Nature of Code - Exercise I.1
        let newPoint = this.points[this.points.length - 1].clone();
        if(Math.random() < 0.5) {
            newPoint.x++;
        } else {
            newPoint.x += Util.randomInt(2) - 1;
        }
        
        if(Math.random() < 0.5) {
            newPoint.y++;
        } else {
            newPoint.y += Util.randomInt(2) - 1;
        }
        this.points.push(newPoint);
    }
    
    private moveToMouse() {
        // Nature of Code - Exercise I.3
        let newPoint = this.points[this.points.length - 1].clone();
        if(space.pointer.x > newPoint.x) {
            newPoint.x++;
        } else {
            newPoint.x--;
        }
        
        if(space.pointer.y > newPoint.y) {
            newPoint.y++;
        } else {
            newPoint.y--;
        }
        this.points.push(newPoint);
    }
}

var space = new CanvasSpace("#main");
space.setup({});
var form = space.getForm();

var walk: Walker2Example;

space.add({
    start: function() {
        walk = new Walker2Example(space.center);
    },

    animate: function(time, ftime) {
        walk.step();
        walk.display(form);
    }
});

space.bindMouse();
space.play();