
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
        this.Searchstring = searchstring; //! conflict on this
        this.ServerAddress = ServerAddress;
        this.OutputArrayComplex = [];
        
    }

    GlobaliseResults(InputArray){ //! bad memory management due to copying
        this.OutputArrayComplex = String(InputArray);
        //alert(this.OutputArrayComplex); //array globalised via this
    }
    
    GetResult(){ //TODO test for undefined
        //console.log(OutputArrayComplex)
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
            //var OutputArr = new Array(SearchScopeArr, SearchTermArr/*, TimeStampArr*/)
            var OutputArr = [];
            OutputArr = [SearchScopeArr, SearchTermArr, TimeStampArr];
            //console.log(SearchScopeArr)
            return OutputArr;
            
            //Rquest.prototype.OutputArrayComplex = OutputArr;
            //Rquest.prototype.GlobaliseResults(OutputArr);
        }       
        try{
            xhr.send(params);
        }catch(error){
            console.log(error)
        }
        return this.OutputArrayComplex;
    }
}

class ChartInterpreter{ //? might need alot of fields here
    constructor(/*RawInput*/){
        //this.RawInput = RawInput;
        this.TimeArray = [1576688300,1576598137,1576650136,1576086449]; //TODO make this response from Rquester
        this.ValuesArray = [];
    }
    test(){
        //console.log(this.RawInput);
    }
    InitArrays(){
        for(var c=0; c < this.TimeArray.length; c++){
            this.TimeArray[c] = String(this.GetStampDate(this.TimeArray));
        }

        var points = 0;
        for(var i=0; i < this.TimeArray.length; i++){
            if(i == this.TimeArray.length - 1){
                if(this.GetTimeDifference(this.TimeArray[i-1], this.TimeArray[i]) == 0){
                    points++;
                    //save and reset
                    this.ValuesArray.push(points);
                }
                else{
                    //save and reset
                    this.ValuesArray.push(points);
                    points = 1;
                }
            }
            else{
                if(this.GetTimeDifference(this.TimeArray[i-1], this.TimeArray[i]) == 0){
                    points++;
                }
                else{
                    //save and reset
                    this.ValuesArray.push(points);
                    points = 1;
                }
            }
        }
        this.TimeArray = [... new Set(this.TimeArray)];
        this.ValuesArray = this.ValuesArray.splice(-1,1); //! may result in undefined behaviour on high numbers
        this.TimeArray;
        this.ValuesArray;

        var outarr = [this.TimeArray, this.ValuesArray];
        return outarr;

        //for testing
        //console.log(this.TimeArray)
        //console.log(this.ValuesArray)
        
    }

    GetStampDate(timestamp){
        var date = new Date();
        var ztod = date.toISOString(timestamp).substring(0,10); //! UTC time (Zulu) down to ms
        return ztod;
    }

    GetTimeDifference(date1, date2){
        var Diff = parseInt(String(date1).substring(5,7), 10) - parseInt(String(date2).substring(5,7), 10);
        return Diff;
    }
}

function Main(){
    console.log("attempting connection")
    var io = new Rquest("http://45.32.184.69:8080/api/search", "bitcoin");
    
    //var RequestOutArr3D = [];
    //RequestOutArr3D = io.QueryBuilder();
    //alert(RequestOutArr3D[0]);
    //var tst3D = [];

    var tst3D = io.QueryBuilder();
    alert(typeof(tst3D))
    //tst3D = io.GetResult();
    //console.log(tst3D);
    //alert(tst3D)
    
    //alert(io.OutputArrayComplex)
    //var tstarr = [];
    
    var CI = new ChartInterpreter();

    var ResultArray2D = []; //[0][n] is time | [1][n] is values
    
    ResultArray2D = CI.InitArrays();
    var ChartLabelsArr = ResultArray2D[0];
    var ChartDataArr = ResultArray2D[1];

    DrawChart(ChartLabelsArr,ChartDataArr); //TODO pass options arr later // works only with webpage

    //console.log(ResultArray2D[0][0]); //? how is this working but the response doesn't export???
    //? maybe because the called function is the same as the returning one ?????
}

//Main(); //for testing