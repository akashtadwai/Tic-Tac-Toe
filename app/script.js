/*Minimax-Algorithm */

var board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];
$(function () {
    $('.content').hide();
});

var AI = +1;
var human = -1;

function clicked(help) {
    $('.game').hide();
    $('#how').hide();
    $('.content').fadeIn(1000);

}
$('.close').click(function () {
    $('.content').hide();
    $('.game').show();
    $('#how').show();
});

"use strict"

/* This function tests if a specific player wins */
function gameOver(state, player) {
    var win_state = [
        [state[0][0], state[0][1], state[0][2]],
        [state[1][0], state[1][1], state[1][2]],
        [state[2][0], state[2][1], state[2][2]],
        [state[0][0], state[1][0], state[2][0]],
        [state[0][1], state[1][1], state[2][1]],
        [state[0][2], state[1][2], state[2][2]],
        [state[0][0], state[1][1], state[2][2]],
        [state[2][0], state[1][1], state[0][2]],
    ];

    for (var i = 0; i <= 7; i++) {
        var line = win_state[i];
        var filled = 0;
        for (var j = 0; j < 3; j++) {
            if (line[j] == player)
                filled++;
        }
        if (filled == 3)
            return true;
    }
    return false;
}

/* This function test if the human or AI wins */
function gameOverAll(state) {
    return gameOver(state, human) || gameOver(state, AI);
}

/* Function to evaluate the state. */
function evaluate(state) {
    var points = 0;

    if (gameOver(state, AI)) {
        points = 1;
    }
    else if (gameOver(state, human)) {
        points = -1;
    } else {
        points = 0;
    }

    return points;
}


/* A move is valid if the chosen cell is empty */
function isValidMove(x, y) {
    try {
        if (board[x][y] == 0) {
            return true;
        }
        else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

/* Set the move on board, if the coordinates are valid */
function setMove(x, y, player) {
    if (isValidMove(x, y)) {
        board[x][y] = player;
        return true;
    }
    else return false;

}

/*Function to return the empty cells in a board */

function emptyCells(state) {
    var cells = [];
    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            if (state[x][y] == 0)
                cells.push([x, y]);
        }
    }

    return cells;
}

/* *** AI function that chooses the best move *** */

function minimax(state, depth, player) {
    var best;

    if (player == AI) {
        best = [-1, -1, -Infinity];
    }
    else {
        best = [-1, -1, +Infinity];
    }

    if (depth == 0 || gameOverAll(state)) {
        var score = evaluate(state);
        return [-1, -1, score];
    }

    $.each(emptyCells(state), function (index, cell) {
        var x = cell[0];
        var y = cell[1];
        state[x][y] = player;
        var score = minimax(state, depth - 1, -player);
        state[x][y] = 0;
        score[0] = x;
        score[1] = y;

        if (player == AI) {
            if (score[2] > best[2])
                best = score;
        }
        else {
            if (score[2] < best[2])
                best = score;
        }
    });

    return best;
}

/* It calls the minimax function */
function aiTurn() {
    var x, y;
    var move;
    var cell;

    if (emptyCells(board).length == 9) {
        x = parseInt(Math.random() * 3);
        y = parseInt(Math.random() * 3);
    }
    else {
        move = minimax(board, emptyCells(board).length, AI);
        x = move[0];
        y = move[1];
    }

    if (setMove(x, y, AI)) {
        var pos = String(x) + String(y);
        cell = $('#' + pos);
        $(cell).html("O");
        $(cell).css("color", "red");
    }
}

/* main */
function clickedCell(cell) {

    var button = document.getElementById("bnt-firststart");
    button.disabled = true;
    var conditionToContinue = gameOverAll(board) == false && emptyCells(board).length > 0;

    if (conditionToContinue == true) {
        var x = cell.id.split("")[0];
        var y = cell.id.split("")[1];
        var move = setMove(x, y, human);
        if (move == true) {
            $(cell).html("X");
            $(cell).css("color", "blue");
            if (conditionToContinue)
                aiTurn();
        }
    }
    if (gameOver(board, AI)) {
        var lines;
        var cell;
        var msg;

        if (board[0][0] == 1 && board[0][1] == 1 && board[0][2] == 1)
            lines = [[0, 0], [0, 1], [0, 2]];
        else if (board[1][0] == 1 && board[1][1] == 1 && board[1][2] == 1)
            lines = [[1, 0], [1, 1], [1, 2]];
        else if (board[2][0] == 1 && board[2][1] == 1 && board[2][2] == 1)
            lines = [[2, 0], [2, 1], [2, 2]];
        else if (board[0][0] == 1 && board[1][0] == 1 && board[2][0] == 1)
            lines = [[0, 0], [1, 0], [2, 0]];
        else if (board[0][1] == 1 && board[1][1] == 1 && board[2][1] == 1)
            lines = [[0, 1], [1, 1], [2, 1]];
        else if (board[0][2] == 1 && board[1][2] == 1 && board[2][2] == 1)
            lines = [[0, 2], [1, 2], [2, 2]];
        else if (board[0][0] == 1 && board[1][1] == 1 && board[2][2] == 1)
            lines = [[0, 0], [1, 1], [2, 2]];
        else if (board[2][0] == 1 && board[1][1] == 1 && board[0][2] == 1)
            lines = [[2, 0], [1, 1], [0, 2]];

        for (var i = 0; i < lines.length; i++) {
            var pos = String(lines[i][0]) + String(lines[i][1]);
            cell = $('#' + pos);
            $(cell).css("color", "#78f00f");
            $(cell).css("background-color", "#333");
        }
        msg = $("#message");
        msg.html("You lose!");
    }
    if (emptyCells(board).length == 0 && !gameOverAll(board)) {
        var msg = msg = $("#message");
        msg.html("Draw");
    }
}

/* Restart the game*/
function firstStart(button) {
    if (button.value == "Start AI") {
        aiTurn();
        button.disabled = true;
    }
}

function restartBnt(button) {
    var htmlBoard;
    var msg;
    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            board[x][y] = 0;
            var pos = String(x) + String(y);
            htmlBoard = $('#' + pos);
            $(htmlBoard).css("color", "#444");
            $(htmlBoard).css("background-color", "#e8d6d6");
            $(htmlBoard).html("");
        }
    }
    var table = $("#tic-tac-toe");
    $(table).css("border-radius", "20px");
    var btn1 = document.getElementById("bnt-firststart");
    btn1.disabled = false;
    msg = $('#message');
    $(msg).html("");
}
