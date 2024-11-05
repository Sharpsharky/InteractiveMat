import chalk from 'chalk';

class MatSimulator{
    constructor(columns = 14, rows = 28){
        this.mat = Array(rows).fill().map(() => Array(columns).fill(0));
        this.interval = null;
    }
    
    turnOnTile(x, y){
        this.setActiveTile(x, y, 1);
    }

    turnOffTile(x, y){
        this.setActiveTile(x, y, 0);
    }

    start(refreshInterval = 500){
        this.interval = setInterval(() => this.displayMat(), refreshInterval);
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

//testing

let refreshInterval = 500;

const simulator = new MatSimulator();
simulator.start(refreshInterval);

let timeCount = refreshInterval;


for(let i = 0; i < simulator.mat[0].length; i++){
    for(let j = 0; j < simulator.mat.length; j++){
        timeCount += refreshInterval;

        setTimeout(() => simulator.turnOnTile(i, j), timeCount);
        setTimeout(() => simulator.turnOffTile(i, j), timeCount + refreshInterval);
    }
}

setTimeout(() => simulator.stop(), refreshInterval * simulator.mat.length * simulator.mat[0].length + refreshInterval * 4);