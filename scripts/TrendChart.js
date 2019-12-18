


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

class Rquest{
    constructor(ServerAddress, searchstring) {
        this.Searchstring = searchstring //! conflict on this
        this.ServerAddress = ServerAddress
    }

    QueryBuilder() {
        var url = new URL(this.ServerAddress); //! change later
        //url.searchParams.append("search_term", this.Searchstring);
        var params = "search_term" + "=" + this.Searchstring;
        
        //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhr = new XMLHttpRequest();

        xhr.open("POST", url);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.onload = function(){
            //var Parsed = JSON.parse(xhr.responseText);
            //console.log(Parsed[1].timestamp);
            //console.log(Parsed.length);
            var Parsed = (xhr.responseText);
            //alert(Parsed);

            var FieldNames = ["search_scope","search_term","timestamp"]
            var EntryNumber = Parsed.length;
            
            var SearchScopeArr = [];
            var SearchTermArr = [];
            var TimestampArr = [];

            //return(Parsed[0].timestamp);

            var Entry = 0;
            var Field = 0; 
            for(Entry=0; Entry < EntryNumber; Entry++){ //! this is O(n^2)
                for(Field=0; Field < 3; Field++){
                    if(Field == 0){
                        SearchScopeArr[Entry] = Parsed[Entry].FieldNames[Field];
                    }
                    else if(Field == 1){
                        SearchTermArr[Entry] = Parsed[Entry].FieldNames[Field];
                    }
                    else if (Field == 2){
                        TimestampArr[Entry] = Parsed[Entry].FieldNames[Field];
                    }
                }
            }

            for(j=0; j < 2; j++){
                alert(SearchTermArr);
            }

            
        }
               
        try{
            xhr.send(params);
        }catch(error){
            console.log(error)
        }
    }


}

class ChartInterpreter{ //? might need alot of fields here
    constructor(RawInput){
        this.RawInput = RawInput
        this.Object = Object 
    }
    test(){
        //console.log(this.RawInput);
    }

}

function Main(){
    console.log("attempting connection")
    //DrawChart(LabelsArr,DataArr); //! pass options arr later
    io = new Rquest("http://45.32.184.69:8080/api/search", "bitcoin");
    
    
    io.QueryBuilder();
    
    //cd = new ChartInterpreter(DataOutput);
    //cd.test();

    //console.log(ParsedResponse[1].timestamp);
    //console.log(ParsedResponse.length);
}

//Main(); //for testing