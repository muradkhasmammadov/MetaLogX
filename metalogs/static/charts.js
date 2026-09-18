function generateRandomColors(numColors) {
    var colors = [];
    for (var i = 0; i < numColors; i++) {
        var randomColor = 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ', 0.8)';
        colors.push(randomColor);
    }
    return colors;
}

var numMRs = {{ chart_data.labels|length }}; 

var chartData = {
labels: {{chart_data.labels|safe}},
datasets: [{
    label: 'Number of Violations',
    data:  {{chart_data.data|safe}},
    backgroundColor: generateRandomColors(numMRs),
    // borderColor: generateRandomColors(numMRs),
    borderWidth: 1
}]
};

var chartContainer1 = document.getElementById('chart1');
var chartTypeSelect1 = document.getElementById('chart-type-select1');

var defaultChartType1 = 'doughnut';
var ctx = document.getElementById('chart1').getContext('2d');
var myChart1 = new Chart(ctx, {
type: defaultChartType1,
data: chartData,
options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        },
    },
}
});

chartTypeSelect1.addEventListener('change', function () {
  var selectedChartType = chartTypeSelect1.value;
  myChart1.config.type = selectedChartType;
  myChart1.update();
});



var chartData2 = {
labels: {{chart_data2.labels|safe}},
datasets: [{
    label: 'Number of Non Violations',
    data:  {{chart_data2.data|safe}},
    backgroundColor: generateRandomColors(numMRs),
    // borderColor: generateRandomColors(numMRs),
    borderWidth: 1
}]
};

var chartContainer2 = document.getElementById('chart2');
var chartTypeSelect2 = document.getElementById('chart-type-select2');

var defaultChartType2 = 'doughnut';
var ctx2 = document.getElementById('chart2').getContext('2d');
var myChart2 = new Chart(ctx2, {
type: defaultChartType2,
data: chartData2,
options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        },

    },
}
});

chartTypeSelect2.addEventListener('change', function () {
  var selectedChartType = chartTypeSelect2.value;
  myChart2.config.type = selectedChartType;
  myChart2.update();
});

var chartData3 = {
labels: {{chart_data3.labels|safe}} ,
datasets: [{
    label: 'Crashed MRs',
    data: {{chart_data3.data|safe}},
    backgroundColor: generateRandomColors(numMRs),
    // borderColor: generateRandomColors(numMRs),
    borderWidth: 1,
    barThickness: 20,
}]
};

var chartContainer3 = document.getElementById('chart3');
var chartTypeSelect3 = document.getElementById('chart-type-select3');

var defaultChartType3 = 'bar';
var ctx3 = document.getElementById('chart3').getContext('2d');
let delayed;
var myChart3 = new Chart(ctx3, {
type: defaultChartType3,
data: chartData3,
options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    animation: {
    onComplete: () => {
        delayed = true;
    },
    delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
    },
},
}
});

chartTypeSelect3.addEventListener('change', function () {
  var selectedChartType = chartTypeSelect3.value;
  myChart3.config.type = selectedChartType;
  myChart3.update();
});


var chartData4 = {
labels: {{chart_data4.labels|safe}} ,
datasets: [{
    label: 'Non-Crashed MRs',
    data: {{chart_data4.data|safe}},
    backgroundColor: generateRandomColors(numMRs),
    // borderColor: generateRandomColors(numMRs),
    borderWidth: 1,
    barThickness: 30,
}]
};

var chartContainer4 = document.getElementById('chart4');
var chartTypeSelect4 = document.getElementById('chart-type-select4');

var defaultChartType4 = 'bar';
var ctx4 = chartContainer4.getContext('2d');
var myChart4 = new Chart(ctx4, {
  type: defaultChartType4,
  data: chartData4,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      display: true,
    },
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
  },
});

chartTypeSelect4.addEventListener('change', function () {
  var selectedChartType = chartTypeSelect4.value;
  myChart4.config.type = selectedChartType;
  myChart4.update();
});


var chartData5 = {
labels: {{chart_data5.labels|safe}},
datasets: {{chart_data5.datasets|safe}} 
};


var chartContainer5 = document.getElementById('chart5');
var chartTypeSelect5 = document.getElementById('chart-type-select5');

var defaultChartType5 = 'bar';
var ctx5 = document.getElementById('chart5').getContext('2d');
var myChart5 = new Chart(ctx5, {
type: defaultChartType5,
data: chartData5,
options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
},
}                                                                      
});

chartTypeSelect5.addEventListener('change', function () {
  var selectedChartType = chartTypeSelect5.value;
  myChart5.config.type = selectedChartType;
  myChart5.update();
});



var chartData6 = {
labels: {{chart_data6.labels|safe}},
datasets: {{chart_data6.datasets|safe}},
};

var chartContainer6 = document.getElementById('chart6');
var chartTypeSelect6 = document.getElementById('chart-type-select6');

var defaultChartType6 = 'bar';
var ctx6 = document.getElementById('chart6').getContext('2d');
var myChart6 = new Chart(ctx6, {
type: defaultChartType6,
data: chartData6,
options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
},
}                                                                      
});

chartTypeSelect6.addEventListener('change', function () {
  var selectedChartType = chartTypeSelect6.value;
  myChart6.config.type = selectedChartType;
  myChart6.update();
});

var totalViolations = {{ chart_data7.data.0|safe }};
var totalNonViolations = {{ chart_data7.data.1|safe }};
var totalData = totalViolations + totalNonViolations;

var percentViolations = (totalViolations / totalData) * 100;
var percentNonViolations = 100 - percentViolations;
document.getElementById("total_rows").innerText = "Total data:" + {{chart_data7.total_data_points}}
document.getElementById("violated_rows").innerText = Math.round(percentViolations) + "% of data are violated."
// Create chart data
var chartData7 = {
    labels: ['Violations', 'Non-violations'],
    datasets: [{
        data: [percentViolations, percentNonViolations ],
        backgroundColor: ['rgba(93, 125, 255, 0.5)', 'rgb(73, 135, 255)'], 
        borderColor: ['rgba(77, 125, 255, 0.5)', 'rgba(132, 125, 255, 0.5)'],
        borderWidth: 1,
        barThickness: 20,
    }]
};

var ctx7 = document.getElementById('chart7').getContext('2d');
var myChart7 = new Chart(ctx7, {
    type: 'doughnut',
    data: chartData7,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: 85, 
        plugins: {
            legend: {
                display: false
            }
        }
    }
});


function showInfoBox(content, chartData, selectedMR, inputTestData, violated_MRchecker, outputTestInput) {
    var overlay = document.getElementById('overlay');
    var infoBox = document.getElementById('info-box');
    var infoContent = document.getElementById('info-content');

    var selectedIndex = chartData.labels.indexOf(selectedMR);

    var tableHTML = '<table class="table table-bordered">';
    if (selectedIndex !== -1) {
        tableHTML += `<tr><th>InputTestData</th><th>TransformedMR</th><th>OutputInputData</th><th>OutputMR</th><th>${selectedMR}</th><th>NumberOfViolations</th></tr>`;
        tableHTML += '<tr>';
        tableHTML += '<td>' + inputTestData + '</td>';
        tableHTML += '<td>' + violated_MRchecker + '</td>'; 
        tableHTML += '<td>' + outputTestInput + '</td>';
        tableHTML += '<td>' + 'bos' + '</td>'; 
        tableHTML += '<td>' + violated_MRchecker + '</td>'; 
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';

    infoContent.innerHTML = content + '<br>' + tableHTML;

    overlay.style.display = 'block';
    infoBox.style.display = 'block';
}

myChart1.options.onClick = function (e, elements) {
    if (elements[0]) {
        var index = elements[0].index;
        var content = 'Info related to label: ' + myChart1.data.labels[index];
        var selectedMR = myChart1.data.labels[index];
        var inputTestData = {{chart_data.input_testData_with_violations|safe}}.slice(0, 10);
        var violated_MRchecker = {{ chart_data.violated_MRchecker|safe }}[selectedMR];
        var outputTestInput = {{chart_data.output_testInput|safe}}.slice(0, 10); 

        showInfoBox(content, chartData, selectedMR, inputTestData, violated_MRchecker, outputTestInput);
  }
};

myChart2.options.onClick = function (e, elements) {
    if (elements[0]) {
        var index = elements[0].index;
        var content = 'Info related to label: ' + myChart2.data.labels[index];
        var selectedMR = myChart2.data.labels[index];
        showInfoBox(content, chartData2, selectedMR, inputTestData); // Pass inputTestData here
    }
};

document.getElementById('overlay').addEventListener('click', function () {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('info-box').style.display = 'none';
});