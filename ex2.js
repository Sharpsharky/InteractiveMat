import chalk from 'chalk';

class MatSimulator{
    constructor(columns = 14, rows = 28){
        this.mat = Array(rows).fill().map(() => Array(columns).fill(0));
        this.interval = null;
        this.refreshInterval = 500;

    }
    
    turnOnTile(x, y){
        this.setActiveTile(x, y, 1);
    }

    turnOffTile(x, y){
        this.setActiveTile(x, y, 0);
    }

    start(interval = 500){
        this.refreshInterval = interval;
        this.interval = setInterval(() => this.displayMat(), this.refreshInterval);
    }

    stop(){
        if(this.interval){
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    setActiveTile(x, y, state){
        if(this.verifyCoordinates(x,y)){
            this.setCoordinate(x, y, state);
        }else{
            console.log(`Wrong coordinates (${x}, ${y}).`);
        }
    }
    
    verifyCoordinates(x, y){
        return x >= 0 && x < this.mat[0].length && y >= 0 && y < this.mat.length;
    }

    getCoordinate(x, y){
        return this.mat[y][x];
    }

    setCoordinate(x, y, val){
        this.mat[y][x] = val;
    }

    displayMat(){
        console.clear();
        this.mat.forEach(row => {
            const colorRow = row.map(tile =>
                tile === 1 ? chalk.green('1') : '0'
                ).join(' ');
            console.log(colorRow);    
        });
    }
}

class Orbiter{
    constructor(matSimulator, x, y, radius){
        this.matSimulator = matSimulator;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.direction = 1;
        this.animInterval = null;
        this.angle = 0;
        this.prevX = 0;
        this.prevY = 0;

        this.orbitAround(x, y, radius);
    }
    
    orbitAround(x, y, radius){

        do{
        this.angle = Math.random() * (2 * Math.PI);
        this.prevX = x + Math.round(radius * Math.sin(this.angle));
        this.prevY = y + Math.round(radius * Math.cos(this.angle));
        }
        while(!this.matSimulator.verifyCoordinates(this.prevX, this.prevY))

        this.animInterval = setInterval(() => {
            
            this.orbitStep(x, y, radius);

        }, this.matSimulator.refreshInterval);
    }

    orbitStep(x, y, radius){
        this.matSimulator.turnOffTile(this.prevX, this.prevY);

        this.angle += this.direction * Math.PI / 180;
            
        let newX = x + Math.round(radius * Math.sin(this.angle));
        let newY = y + Math.round(radius * Math.cos(this.angle));

        if(newX === this.prevX && newY === this.prevY){
            this.orbitStep(x, y, radius);
            return;
        }

        if(!this.matSimulator.verifyCoordinates(newX,newY)){
            this.angle -= this.direction * Math.PI / (Math.round(2 * Math.PI * radius));

            this.direction *= -1;
            newX = this.prevX;
            newY = this.prevY;

            this.orbitStep(x, y, radius);
            return;
        }

        this.matSimulator.turnOnTile(newX, newY);

        this.prevX = newX;
        this.prevY = newY;
    }
}

//testing

const simulator = new MatSimulator();
simulator.start(300);

new Orbiter(simulator, 12, 20, 3);
new Orbiter(simulator, 5, 10, 3);
new Orbiter(simulator, 12, 0, 2);
new Orbiter(simulator, 5, 10, 1);
new Orbiter(simulator, 0, 0, 4);
new Orbiter(simulator, 0, 27, 3);
new Orbiter(simulator, 13, 27, 1);