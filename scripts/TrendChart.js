
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

//! function deprecated for use of OOP code below
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

    GlobaliseResults(InputArray){ //! bad memory management due to copying
        this.OutputArrayComplex = String(InputArray);
        //alert(this.OutputArrayComplex); //array globalised via this
    }
    
    GetResult(){ //TODO test for undefined
        return this.OutputArrayComplex;
    }

    QueryBuilder() {
        var url = new URL(this.ServerAddress);
        var params = "search_term" + "=" + this.Searchstring;
        var xhr = new XMLHttpRequest();

        xhr.open("POST", url);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.onload = function(){
            var Parsed = JSON.parse(xhr.responseText);
            var EntryNumber = Parsed.length; //? this is 100 for some reason
            
            var SearchScopeArr = []; //TODO need to export these to interpreter
            var SearchTermArr = [];
            var TimeStampArr = [];
 
            for(var Entry=0; Entry < EntryNumber; Entry++){ //this is O(n)
                for(var Field=0; Field < 3; Field++){
                    if(Field == 0){
                        SearchScopeArr[Entry] = String(Parsed[Entry].search_scope); //type is string
                    }
                    else if(Field == 1){
                        SearchTermArr[Entry] = String(Parsed[Entry].search_term);
                    }
                    else if (Field == 2){
                        TimeStampArr[Entry] = String(Parsed[Entry].timestamp);
                    }
                }
            }
            //alert(Parsed[0].search_term) //example

            var OutputArr = [SearchScopeArr, SearchTermArr, TimeStampArr];
            
            //Rquest.prototype.OutputArrayComplex = OutputArr;
            Rquest.prototype.GlobaliseResults(OutputArr);
        }       
        try{
            xhr.send(params);
        }catch(error){
            console.log(error)
        }
    }
}

class ChartInterpreter{ //? might need alot of fields here
    constructor(/*RawInput*/){
        //this.RawInput = RawInput
        this.TimeArray = [1576688300,1576598137,1576650136,1576086449];
        this.ValuesArray = [];
    }
    test(){
        //console.log(this.RawInput);
    }
    InitArrays(){ //max length will be length of  timearray
        for(var c=0; c < this.TimeArray.length; c++){
            this.TimeArray[c] = String(this.GetStampDate(this.TimeArray));
            //console.log(this.TimeArray[c])
        }

        var points;
        for(var i=0; i < this.TimeArray.length; i++){
            if(i == this.TimeArray.length - 1){
                if(this.GetTimeDifference(i-1, i) == 0){
                    points++;
                }
                else{
                    //save and reset
                    this.ValuesArray.push(points);
                    points = 0;
                }
            }
            else{
                if(this.GetTimeDifference(i, i+1) == 0){
                    points++
                }
                else{
                    //save and reset
                    this.ValuesArray.push(points);
                    points = 0;
                }
            }
            this.GetTimeDifference(i+1,i+1)
        }
    }


    GetStampDate(timestamp){
        var date = new Date();
        var ztod = date.toISOString(timestamp).substring(5,7)//.substring(0,10); //! UTC time (Zulu) down to ms
        console.log(String((ztod)));
        return ztod;
        //TODO save this back into the same array of timestamps and it will be ready to pass
    }
    GetTimeDifference(date1, date2){
        //console.log(date1.substring(5,7));
        var Diff = parseInt(date1.substring(5,7), 10) - parseInt(date2.substring(5,7), 10);
        return Diff;
    }

    CalculatePopularity(){
        //TODO use differential of time to and add +1 to 0 for each mention within a day

    }

}

function Main(){
    /*
    console.log("attempting connection")
    //DrawChart(LabelsArr,DataArr); //! pass options arr later
    io = new Rquest("http://45.32.184.69:8080/api/search", "bitcoin");
    
    io.QueryBuilder();
    alert(io.OutputArrayComplex)
    //var tstarr = [];
    */
    

    //var CI = new ChartInterpreter()
    //CI.InitArrays();

    for(var c=0;c<3;c++){
        console.log(c);
    }
}

Main(); //for testing