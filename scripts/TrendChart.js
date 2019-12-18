


function DrawChart(LabelsArrPr, DataArrPr, OptionsArrPr){
    //alert("function triggered") //for debug
    var Ctx = document.getElementById('CanvasLC');
    var LineChart = new Chart(Ctx, {
        type: "line",
        data:{
            labels: LabelsArrPr,
            datasets: [{
                label: "TestLabel",
                data: DataArrPr
            }]
        },
        options: {//TODO: automate options part
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

var LabelsArr = ["l1","l2","l3","l4","l5","l6"]; //!for testing automate later
var DataArr = [1,2,3,2,15,6]; //!for testing automate later
var OptionsArr = []; //!needs further testing before automation

function ChartDataAdapter(InputData,InputLabels){ //get and check data
    //!this handles the parsing and interpretation of incoming data (W.I.P)
    //TODO: also need functionality for submitting wanted parameters
    if (LabelsArr.length() != DataArr.length()){
        console.warn("Label and Data lengths do not match")
        //TODO add options to reselect
    }
    else{
        //TODO everything is ok carry on with data processing
    }
}

class IOHandler{
    constructor(ServerAddress, searchstring) {
        this.Searchstring = searchstring //! conflict on this
        this.ServerAddress = ServerAddress
    }

    JStoJSON() {
        //alert("bamshaka")
    } //waybe won't need this since url.append is there

    JSONtoJS(response) {
        if(response == "" || response == null){
            //empty response try again
            //alert("empty response")
            console.log("empty response")
        }
        else{
            //because the response will be a singular array it will be split in 2 and first half is values

            var ResponseArray = JSON.parse(response);
            var SepPoint = response.length() / 2;

            var ResponseValues;
            var ResponseLabels;

            for(c = 0; c < SepPoint; c++){
                ResponseValues = ResponseArray;
            }
            for(i = SepPoint; i < response.length; c++){
                ResponseLabels = ResponseArray;
            }
            console.log(response)
        }
        //alert(response) //for testing
        
    }

    QueryBuilder() {
        var url = new URL("http://127.0.0.1:4042"); //! change later
        url.searchParams.append("srch", this.Searchstring);
        
        //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.onload = this.JSONtoJS(xhr.response);
        xhr.addEventListener("loadend",function(){console.log("load complete")})
        xhr.send();

    }
}

function Main(){
    console.log("asdjsakjld")
    //DrawChart(LabelsArr,DataArr); //! pass options arr later
    io = new IOHandler("127.0.0.1", "brk");
    io.QueryBuilder();
    
}

Main(); //for testing