$(function () {
    HoveringBoard($("#hovering-board"), $("#hovering-board-inner"), 45);
})

function HoveringBoard(holder, board, offset) {
    
    //Basic Constants
    var IMG_AMPLITUDE = 1 / 48,
        IMG_X_OFFSET = 557 * 0.2,
        IMG_Y_OFFSET = 360 * 0.2;
    var ANIMATION_DELAY = 10,
        ANIMATION_SPEED = 1 / 25,
        RESET_DELAY = 1000,
        START_DELAY = 3000;

    //Basic global parameters
    var mx = 0, my = 0, //Coordinates of mouse
        bx = 0, by = 0, //Coordinates of board
        ox = 0, oy = 0; //Coordinates of offset between holder and board
    var isInside = false; //Boolean of whether mouse is inside the holder
    var interval = 0; //Integer of the interval
    
    /**
     * Initialize the basic parameters and put the board to the center
     */
    function initialize() {
        
        //Initialize the parameter and positions
        initializeOffset();
        initializeCenter();

        //Set Listeners
        resizeListen();
        hoverListen();
        mouseListen();
        
        //Start the animation
        startAnimation();
    }
    
    /**
     * Initialize the offsets
     */
    function initializeOffset() {
        ox = (holder.innerWidth() - board.outerWidth()) / 2;
        oy = (holder.innerHeight() - board.outerHeight()) / 2;
    }
    
    /**
     * Initialize the center position by setting mouse and board position
     */
    function initializeCenter() {
        setMousePosition(ox, oy);
        setBoardPosition(ox, oy);
    }
    
    /**
     * Set the mouse position to given x y
     * @param x
     * @param y
     */
    function setMousePosition(x, y) {
        mx = x;
        my = y;
    }
    
    /**
     * Set the board position to given x y
     * @param x
     * @param y
     */
    function setBoardPosition(x, y) {
        bx = x;
        by = y;
        refreshBoardPosition(x, y);
    }

    /**
     * Directly change the boarder's position
     * @param x
     * @param y
     */
    function refreshBoardPosition(x, y) {
        board.css("margin-left", x + "px");
        board.css("margin-top", y + offset + "px");
    }

    /**
     * The Animation Interval
     */
    function startAnimation() {
        setInterval(function () {
            bx += (mx - bx) * ANIMATION_SPEED;
            by += (my - by) * ANIMATION_SPEED;
            
            //Set the position of the board
            if (Math.pow(mx - bx, 2) + Math.pow(my - by, 2) > 1) {
                setBoardPosition(bx, by);
            }
        }, ANIMATION_DELAY);
    }

    /**
     * Refresh the basic parameter when window get resized
     */
    function resizeListen() {
        $(window).resize(function () {
            initializeOffset();
            setMousePosition(ox, oy);
        });
    }

    /**
     * Refresh the mouse coordinates when mouse moves
     */
    function mouseListen() {
        holder.mousemove(function (event) {
            mx = ox * event.pageX / (holder.innerWidth() / 2);
            my = oy * (event.pageY - holder.offset().top) / (holder.innerHeight() / 2);
        });
    }

    /**
     * The Hover Functions
     */
    function hoverListen() {
        holder.hover(function (event) {

            //When the mouse enter the holder
            isInside = true;
            clearInterval(interval);
        }, function (event) {
            
            if (holder.attr("data-tracking") === "1") {
                //When the mouse leave the holder, set the interval so that the
                //board can return to the center position
                isInside = false;

                interval = setInterval(function () {

                    if (isInside == false) {
                        mx = ox;
                        my = oy;
                    }

                    //When run through one Interval, clear the interval
                    clearInterval(interval);
                }, RESET_DELAY);
            }
        });
    }

    initialize();
};
