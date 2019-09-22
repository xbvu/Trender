function Main(){
    CreateChart(LabelsArr,DataArr);
}

function CreateChart(LabelsArrPr, DataArrPr){
    alert("function triggered") //for debug
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
        options: {
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

var LabelsArr = ["l1","l2","l3","l4","l5","l6"];
var DataArr = [1,2,3,2,15,6]

function ChartDataAdapter(){ //get and check data

}