var Furry = require("./furry");
var Coin = require("./coin");

var Game = function() {
    this.board = document.querySelectorAll("section#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    this.startGame = function() {
        var self = this;
        this.idSetinterval = setInterval(function() {
            self.moveFurry();
        }, 250);
    };

    this.moveFurry = function () {
        if(this.furry.direction === 'right') {
            this.furry.x += 1;
        } else if (this.furry.direction === 'left') {
            this.furry.x -= 1;
        } else if(this.furry.direction === 'down') {
            this.furry.y += 1;
        } else if (this.furry.direction === 'up') {
            this.furry.y -=1;
        }
        if(this.gameOver() == false) {
            this.showFurry();
            this.checkCoinCollision();
        } else {
            clearInterval(this.idSetinterval);
            var over = document.getElementById('over');
            over.classList.remove('invisible');
            over.querySelector('span').innerText = this.score;
            this.hideVisibleFurry();
        }
    };

    this.hideVisibleFurry = function () {
        var seeFurry = document.querySelector('.furry');
        if (seeFurry) {
            seeFurry.classList.remove('furry');
        }

    };

    this.turnFurry = function(event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
        }
    };

    this.checkCoinCollision = function () {
        if(this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            var seeCoin = document.querySelector('.coin');
            seeCoin.classList.remove('coin');
            this.score += 1;
            var scoreField = document.querySelector('#score>div strong');
            scoreField.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function () {
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            return true;
        } else {
            return false;
        }
    };
}

module.exports = Game;