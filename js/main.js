// Temporary initial values for testing purposes
var gridSize = 10;
var bombNumber = 10;

var utils = {
    // Integer random value between 0 and gridSize - 1
    'random' : function (gridSize) {
        return Math.floor((Math.random() * gridSize));
    },
    
    // Return an array of positions around the position specified
    'getProximityPositions' : function (grid, x, y) {
        var checkLeft = x > 0;
        var checkRight = x < grid.length - 1;
        var checkTop = y > 0;
        var checkBottom = y < grid[0].length - 1;
        
        var positions = [];
        var positionsIndex = 0;

        if (checkLeft) {
            
            positions[positionsIndex] = {
                'x' : x - 1,
                'y' : y
            }
            positionsIndex++;
            
            if (checkTop) {
                positions[positionsIndex] = {
                    'x' : x - 1,
                    'y' : y - 1
                }
                positionsIndex++;
            }
            if (checkBottom) {
                positions[positionsIndex] = {
                    'x' : x - 1,
                    'y' : y + 1
                }
                positionsIndex++;
            }
        }
        
        if (checkRight) {
            
            positions[positionsIndex] = {
                'x' : x + 1,
                'y' : y
            }
            positionsIndex++;
            
            if (checkTop) {
                positions[positionsIndex] = {
                    'x' : x + 1,
                    'y' : y - 1
                }
                positionsIndex++;
            }
            if (checkBottom) {
                positions[positionsIndex] = {
                    'x' : x + 1,
                    'y' : y + 1
                }
                positionsIndex++;
            }
        }
        
        if (checkTop) {
            positions[positionsIndex] = {
                'x' : x,
                'y' : y - 1
            }
            positionsIndex++;
        }
        
        if (checkBottom) {
            positions[positionsIndex] = {
                'x' : x,
                'y' : y + 1
            }
            positionsIndex++;
        }
        
        return positions;
    },
    
    // Return the number of bombs in the grid, on the positions specified
    'getBombsAround' : function (grid, proximityPositions) {
        var i;
        var bombs = 0;
        for (i = 0; i < proximityPositions.length; i++) {
            if (grid[proximityPositions[i]['x']][proximityPositions[i]['y']].bomb) {
                bombs++;
            }
        }
        return bombs;
    }
};

var coordenates = {
    //Helper function to check if coordinates are the same (i.e. have the same x,y values)
    'areEqual' : function (coord1, coord2) {
        if (coord1['x'] === coord2['x'] && coord1['y'] === coord2['y']) {
            return true;
        }
        return false;
    },
    
    //Helper function to check if position indicated by list[index] is already on the list, on another index
    'isAlreadyOnList' : function(index, list) {
        if (index === 0) {
            return false;
        }
        
        var i;
        for (i = 0; i < index; i++) {
            if (coordenates.areEqual(list[index], list[i])) {
                return true;
            }
        }
        
        return false;
    }
}

var gameLogic = {
    
    //Game grid
    'grid' : [],
    
    //Create new grid
    'initGrid' : function () {
        var i;
        for (i = 0; i < gridSize; i++) {
            gameLogic.grid[i] = [];
        }
    },
    
    // Fill proximity numbers around bombs
    'fillProximityNumbers' : function () {
        var i, j;
        for (i = 0; i < gridSize; i++) {
            for (j = 0; j < gridSize; j++) {
                gameLogic.grid[i][j]['number'] = utils.getBombsAround(gameLogic.grid, utils.getProximityPositions(gameLogic.grid, i, j));
            }
        }
    },
    
    //Init bomb locations
    //TODO Init proximity values around bombs
    'setupGrid' : function () {
        
        var bombCoords = [];
        var i, j;

        gameLogic.initGrid();
        
        for (i = 0; i < bombNumber; i++) {
            bombCoords[i] = {};
            bombCoords[i]['x'] = utils.random(gridSize);
            bombCoords[i]['y'] = utils.random(gridSize);
            
            if (i > 0) {
                while (coordenates.isAlreadyOnList(i, bombCoords)) {
                    bombCoords[i]['x'] = utils.random(gridSize);
                    bombCoords[i]['y'] = utils.random(gridSize);
                }
            }
        }
        
        for (i = 0; i < gridSize; i++) {
            for (j = 0; j < gridSize; j++) {
                gameLogic.grid[i][j] = {
                    'bomb' : false,
                    'revealed' : false,
                    'marked' : false
                }
            }
        }
        
        for (i = 0; i < bombNumber; i++) {
            gameLogic.grid[bombCoords[i]['x']][bombCoords[i]['y']].bomb = true;
        }
        
        gameLogic.fillProximityNumbers();
    },
    
    // For testing purposes, print the grid on an alert
    'prettyPrintGrid' : function() {
        var i, j;
        var text = '';
        
        for (i = 0; i < gridSize; i++) {
            for (j = 0; j < gridSize; j++) {
                if (gameLogic.grid[i][j].bomb) {
                    text += 'X ';
                } else {
                    text += gameLogic.grid[i][j].number + ' ';
                }
            }
            text += '\n';
        }
        
        alert(text);
    }
};

$(
    // Testing
    function() {
        gameLogic.setupGrid();
        gameLogic.prettyPrintGrid();
    }
);
