import { CanvasSpace, Util, Rectangle, Pt } from "pts";

var space = new CanvasSpace("#main");
space.setup({resize: true});
var form = space.getForm();

const length = 20;
var counts: number[] = [];

space.add({
    start: function() {
        for(let index = 0; index < length; ++index) {
            counts.push(0);
        }
    },

    animate: function(time, ftime) {
        ++counts[Util.randomInt(length)];
        let width = space.width / length;
        form.strokeOnly("black");
        
        for(let index = 0; index < length; ++index) {
            let point = new Pt(index * width, space.height - counts[index])
            form.rect(Rectangle.fromTopLeft(point, width, counts[index]));
        }
    }
});

space.play();