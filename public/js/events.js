window.onload = function () {

    $('#datepicks input').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
    });

    var initial_start = '2015-01-01';
    var initial_end = '2016-01-01';

    $('#startDate').val(initial_start);
    $('#endDate').val(initial_end);

    doStuff(initial_start, initial_end);

    $('#apply').click(function () {
        doStuff($('#startDate').val(), $('#endDate').val());
        return false;
    });

    function doStuff(a, b){
        var api =  'http://api.hel.fi/linkedevents/v0.1/event/';
        if (a && b){
            api = 'http://api.hel.fi/linkedevents/v0.1/event/?start='+a+'&end='+b;
        }
        if (a && b ==''){
            api = 'http://api.hel.fi/linkedevents/v0.1/event/?start='+a;
        }
        if(a=='' && b){
            api = 'http://api.hel.fi/linkedevents/v0.1/event/?start=today&end='+b;
        }
        if(a=='' && b==''){
            api = api;
        }

        $.getJSON(api, function (data) {

            var labels = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            var vals = [{
                "jan": {
                    "count": 0,
                    "average": 0
                },
                "feb": {
                    "count": 0,
                    "average": 0
                },
                "mar": {
                    "count": 0,
                    "average": 0
                },
                "apr": {
                    "count": 0,
                    "average": 0
                },
                "may": {
                    "count": 0,
                    "average": 0
                },
                "jun": {
                    "count": 0,
                    "average": 0
                },
                "jul": {
                    "count": 0,
                    "average": 0
                },
                "aug": {
                    "count": 0,
                    "average": 0
                },
                "sep": {
                    "count": 0,
                    "average": 0
                },
                "oct": {
                    "count": 0,
                    "average": 0
                },
                "nov": {
                    "count": 0,
                    "average": 0
                },
                "dec": {
                    "count": 0,
                    "average": 0
                }
            }];
            var temp = [];

            $.each(data.data.sort(), function (i, obj) {

                var title = obj.name.en;
                var descr = obj.description.en;
                var start_time = moment(obj.start_time);
                var info_url = obj.info_url.fi;

                temp += ["<div class='ref_box'>",
                    "<p><b>"+title+"</b></p>",
                    "<p>"+descr+"</p>",
                    "<p><a target='_blank' href="+info_url+">"+info_url+"</a></p>",
                    "<p><i>"+start_time.format('MMMM Do YYYY, h:mm:ss a')+" ("+start_time.fromNow()+")</i></p>",
                    "</div>"].join('');

                $('#jsonhere').html(temp);

                //console.log(obj);

                if(start_time.format('MMMM')==labels[0]){
                    vals[0].jan.average += parseInt(start_time.format("DD"));
                    vals[0].jan.count++;
                }

                if(start_time.format('MMMM')==labels[1]){
                    vals[0].feb.average += parseInt(start_time.format("DD"));
                    vals[0].feb.count++;
                }

                if(start_time.format('MMMM')==labels[2]){
                    vals[0].mar.average += parseInt(start_time.format("DD"));
                    vals[0].mar.count++;
                }

                if(start_time.format('MMMM')==labels[3]){
                    vals[0].apr.average += parseInt(start_time.format("DD"));
                    vals[0].apr.count++;
                }

                if(start_time.format('MMMM')==labels[4]){
                    vals[0].may.average += parseInt(start_time.format("DD"));
                    vals[0].may.count++;
                }

                if(start_time.format('MMMM')==labels[5]){
                    vals[0].jun.average += parseInt(start_time.format("DD"));
                    vals[0].jun.count++;
                }
                if(start_time.format('MMMM')==labels[6]){
                    vals[0].jul.average += parseInt(start_time.format("DD"));
                    vals[0].jul.count++;
                }
                if(start_time.format('MMMM')==labels[7]){
                    vals[0].aug.average += parseInt(start_time.format("DD"));
                    vals[0].aug.count++;
                }
                if(start_time.format('MMMM')==labels[8]){
                    vals[0].sep.average += parseInt(start_time.format("DD"));
                    vals[0].sep.count++;
                }
                if(start_time.format('MMMM')==labels[9]){
                    vals[0].oct.average += parseInt(start_time.format("DD"));
                    vals[0].oct.count++;
                }
                if(start_time.format('MMMM')==labels[10]){
                    vals[0].nov.average += parseInt(start_time.format("DD"));
                    vals[0].nov.count++;
                }
                if(start_time.format('MMMM')==labels[11]){
                    vals[0].dec.average += parseInt(start_time.format("DD"));
                    vals[0].dec.count++;
                }



            });

            vals[0].jan.average = vals[0].jan.average/vals[0].jan.count;
            vals[0].feb.average = vals[0].feb.average/vals[0].feb.count;
            vals[0].mar.average = vals[0].mar.average/vals[0].mar.count;
            vals[0].apr.average = vals[0].apr.average/vals[0].apr.count;
            vals[0].may.average = vals[0].may.average/vals[0].may.count;
            vals[0].jun.average = vals[0].jun.average/vals[0].jun.count;
            vals[0].jul.average = vals[0].jul.average/vals[0].jul.count;
            vals[0].aug.average = vals[0].aug.average/vals[0].aug.count;
            vals[0].sep.average = vals[0].sep.average/vals[0].sep.count;
            vals[0].oct.average = vals[0].oct.average/vals[0].oct.count;
            vals[0].nov.average = vals[0].nov.average/vals[0].nov.count;
            vals[0].dec.average = vals[0].dec.average/vals[0].dec.count;


            var graphData = [];

            $.each(vals[0], function (i, val) {
                if(isNaN(val.average)){
                    graphData.push(null);
                }else{
                    graphData.push(val.average);
                }
            });

            var data = {
                labels : labels,
                datasets : [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data : graphData
                    }
                ]
            };

            var ctx = document.getElementById("eventsChart").getContext("2d");
            window.myLine = new Chart(ctx).Line(data, {
                responsive: true
            });

        });
    }

};