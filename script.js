$(document).ready(function () {

    var hour;
    var timeInterval;
    // header section
    // display time and update every second
    // https://momentjs.com/
    timeInterval = setInterval(function () {
        // display day of week
        $('#day-display').text(moment().format('dddd'));
        $("#full-time").text(moment().format('LTS'));
        // save time to variable
        hour = parseInt(moment().format('H'));
        var minutes = parseInt(moment().format('mm'));

        // timeblocks
        if (hour < 9) {
            $('.time-block').removeClass("present past").addClass("future");
        }
        if (hour > 16) {
            $('.time-block').removeClass("present future").addClass("past");
        }
        $(".time-block").each(function () {
            var timeblockNum = parseInt($(this).data("value"));
            if (hour < timeblockNum) {
                $(this).removeClass("past present").addClass("future");
            }
            if (hour == timeblockNum) {
                $(this).removeClass("past future").addClass("present");
            }
            if (hour > timeblockNum) {
                $(this).removeClass("present future").addClass("past");
            }

        });

    }, 100);



    // timeblocks object
    var blocks = {
        block9: {
            time: "9AM - 10AM",
            description: ""
        },
        block10: {
            time: "10AM - 11AM",
            description: ""
        },
        block11: {
            time: "11AM - 12PM",
            description: ""
        },
        block12: {
            time: "12PM - 1PM",
            description: ""
        },
        block13: {
            time: "1PM - 2PM",
            description: ""
        },
        block14: {
            time: "2PM - 3PM",
            description: ""
        },
        block15: {
            time: "3PM - 4PM",
            description: ""
        },
        block16: {
            time: "4PM - 5PM",
            description: ""
        },
        block17: {
            time: "5PM - 6PM",
            description: ""
        }
    };



    var dailyPlan = localStorage.getItem("dailyPlan");
    init();

    function renderBlocks() {
        $(".time-block").each(function () {
            var timeblockNum = $(this).attr("data-value");
            $(this).empty();

            if (blocks["block" + timeblockNum]) {
                // add text to timeblocks
                $(this).val(blocks["block" + timeblockNum].description);
            }
        });
    };

    function init() {
        // check if local storage has been used else get data from local storage
        if (dailyPlan === null) {
            console.log("Empty Daily Planner Data");
        } else {
            blocks = JSON.parse(localStorage.getItem("dailyPlan"));
        }
        // Render event text
        renderBlocks();
    };

    function storeBlocks() {
        // store timeblock objects in local storage
        localStorage.setItem("dailyPlan", JSON.stringify(blocks));
    };

    // declare variables for functions
    var blockNum;

    // save button
    $('.save').on("click", function (event) {
        event.preventDefault();
        $(this).text('Saving...')
        let blockNum = $(this).data('id');
        blocks["block" + blockNum].description = $('#' + blockNum).val();
        storeBlocks();
        $(this).text('Saved')
        $(this).addClass("btn-success")
        $(this).removeClass("btn-primary")
        renderBlocks();
    });

    $(".save").mouseout(function () {
        $(this).text('Save')
        $(this).addClass("btn-primary")
        $(this).removeClass("btn-success")
    });

    $('#reset').on("click", function (event) {
        localStorage.removeItem("dailyPlan");
        location.reload();
    })

});

