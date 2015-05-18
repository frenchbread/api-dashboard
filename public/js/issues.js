$(document).ready(function(){
    $.getJSON("https://asiointi.hel.fi/palautews/rest/v1/services.json", function (data) {
        var tags = [];
        var vals = [];
        var allIssues = [];
        $.each(data, function(i, field){



            var temp = ["<div class='ref_box'>",
                "<p>#"+field.service_code+" <b>"+field.service_name+"</b> - <i>"+field.group+"</i></p>",
                "<p>" + field.description+"</p>",
                "<p id='labelss"+field.service_code+"'></p>",
                "<p class='text-danger'>"+field.type+"</p>",
                "</div>"].join('');

            $('#issuesList').append(temp);

            var labels = field.keywords;
            var onearr = labels.split(',');
            for(var i=0;i<onearr.length;i++){
                var cl = capitalizeFirstLetter(onearr[i]);
                tags.push(capitalizeFirstLetter(onearr[i]));
                $('#labelss' + field.service_code).append('<span class="label label-primary">'+capitalizeFirstLetter(onearr[i])+'</span> ');
            }

        });

        tags = tags.sort();

        for(var i=0;i<tags.length;i++ ){
            vals.push(1);
            if(tags[i+1]==tags[i]){
                tags.splice(i, 1);
                vals.splice(i, 2, 2);
            }
            if(tags[i] == ""){
                tags.splice(i, 1);
                vals.splice(i, 1);
            }
        }

        var data = {
            labels: tags,
            datasets: [
                {
                    label: "Issues",
                    data: vals
                }
            ]
        };

        var ctx = document.getElementById("issuesChart").getContext("2d");
        window.myBar = new Chart(ctx).Bar(data, {
            responsive: true
        });

    });


});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}