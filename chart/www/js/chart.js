
const chartBackgroundColorList = [
    'rgb(229, 117, 131)', //red
    'rgb(108, 224, 123)', // green
    'rgb(31, 139, 248)', //blue
    'rgb(246, 193, 53)', //yellow
    'rgb(31, 56, 247)',
    'rgb(59, 198, 217)',
    'rgb(166, 86, 243)',
    'rgb(208, 75, 168)',
]
const symbolColor = {
    red: 'rgb(229, 117, 131)',
    green: 'rgb(108, 224, 123)',
    blue: 'rgb(31, 139, 248)',
    yellow: 'rgb(246, 193, 53)',
    grey: 'rgb(159, 159, 159)'
}

function getDataset() {
    const response = fetch('../data/sample.json');
    return response.then(res => res.json());
}


console.log("chart js run");

async function run() {
    let dataset = [];
    try {
        dataset = await getDataset();
    } catch (error) {
        console.log(error);
    }
    let doughnutChartElement = '';
    const doughnutChartBox = document.getElementById("doughnut-chart-box");
    for (let i = 0; i < dataset.length; i++) {
        doughnutChartElement += `<canvas id="overviewChart${i}" width="300px" height="300px"></canvas>`;
    }

    doughnutChartBox.innerHTML = doughnutChartElement;

    for (let i = 0; i < dataset.length; i++) {
        let target = document.getElementById(`overviewChart${i}`);
        doughnutChart(target, dataset[i]);
    }
}

function doughnutChart(target, data) {
    return new Chart(target, {
        type: 'doughnut',
        data: {
            labels: [data.service],
            datasets: [{
                label: data.service,
                data: [data.num, 100 - data.num],
                borderRadius: 20,
                hoverOffset: 10,
                backgroundColor: [
                    chartBackgroundColorList[Math.floor(Math.random() * chartBackgroundColorList.length)],
                    'rgb(159, 159, 159)'
                ],
            }]
        },
        options: {
            responsive: false,
            plugins: {
                legend: {
                    position: 'none',
                }
            },
            cutout: "80%",
        },
        plugins: [{
            id: 'text',
            beforeDraw: function (chart, a, b) {
                var width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx;

                ctx.restore();
                var fontSize = 1;
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";

                var text = `${data.num}%`,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2;

                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }]
    });
}

run();