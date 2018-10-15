import { CanvasSpace, Group, Pt } from "pts";

var space = new CanvasSpace("#main");
space.setup({resize: true});
var form = space.getForm();

class NormalDistExample1 {
    private spare: number;
    private hasSpare: boolean;

    constructor() {
        this.hasSpare = false;
    }

    NextGaussian(): number {
        if(this.hasSpare) {
            this.hasSpare = false;
            return this.spare;
        } else {
            let rand1, rand2, temp;
            do {
                rand1 = Math.random() * 2 - 1;
                rand2 = Math.random() * 2 - 1;
                temp = rand1 * rand1 + rand2 * rand2;
            } while(temp >= 1 || temp == 0);
            let factor = Math.sqrt(-2 * Math.log(temp) / temp);
            this.spare = rand2 * factor;
            this.hasSpare = true;
            return rand1 * factor;
        }
    }
}

interface ColoredDot {
    Point: Pt;
    Color: string;
}

const colors = [
    "yellow", "green", "red", "blue", "purple", "cyan"
];
const splatterSize = 4;
var paintSplatter: ColoredDot[] = [];

space.add({
    start: function() {
        const stdDeviation = 50;
        const colorDeviation = 2;
        const meanWidth = space.width / 2;
        const meanHeight = space.height / 2;

        let generator = new NormalDistExample1();
        let temp = 0;
        let x, y;
        while(paintSplatter.length < 250) {
            x = generator.NextGaussian() * stdDeviation + meanWidth;
            y = generator.NextGaussian() * stdDeviation + meanHeight;
            paintSplatter.push({
                Point: new Pt(x, y),
                Color: colors[
                    Math.floor(Math.abs(generator.NextGaussian()) * colorDeviation) % colors.length
                ]
            });
        }
    },

    animate: function(time, ftime) {
        for(let splatter of paintSplatter) {
            form.fillOnly(splatter.Color).point(splatter.Point, splatterSize, "circle");
        }
    }
})

space.play();