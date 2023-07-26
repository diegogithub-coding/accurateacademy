<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Getting Started with Chart JS with www.chartjs3.com</title>
    <style>

      .chartBox {
        width: 700px;
        padding: 20px;
        border-radius: 20px;
        //border: solid 3px rgba(54, 162, 235, 1);
        background: white;
      }
    </style>
  </head>
  <body>

    
      <div class="chartBox">
        <canvas id="myChart"></canvas>
      </div>

    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js"></script>
    <script>
    // setup 
    const data = {
      //labels: ['Time Scheduled','Time Present','Time Absent'],
      datasets: [{
        label: 'Time Scheduled',
        data: [1800387],
        backgroundColor:['rgba(255,26,104,1)'],
        boderColor:['white'],
        borderWidth:5,
        circumference: (ctx) =>{
            return ctx.dataset.data[0]/1800387*270;
        }
      },{
        label: 'Time Present',
        data: [1600387],
        backgroundColor:['rgba(54,162,235,1)'],
        boderColor:['white'],
        borderWidth:5,
        circumference: (ctx) =>{
            return ctx.dataset.data[0]/1800387*270;
        }
      },{
        label: 'Time Absent',
        data: [138985],
        backgroundColor:['rgba(75,192,192,1)'],
        boderColor:['white'],
        borderWidth:5,
        circumference: (ctx) =>{
            return ctx.dataset.data[0]/1800387*270;
        }
      }]
    };

	//custom Radial Labels
    const labelsRadialBar = {
    	id: 'labelsRadialBar',
        afterDatasetsDraw(chart,args,pluginOptions){
        	const {ctx, data} = chart;
            ctx.save();
            ctx.font = 'bold 20px sans-serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            
            
            for(let i = 0; i < data.datasets.length; i++){
            ctx.fillStyle = data.datasets[i].backgroundColor[0];
            const outerRadius = chart.getDatasetMeta(i).controller.outerRadius;
            const innerRadius = chart.getDatasetMeta(i).controller.innerRadius;
            const width = outerRadius - innerRadius;
            const xPos = chart.getDatasetMeta(i).data[0].x;
            const yPos = chart.getDatasetMeta(i).data[0].y;
            
            ctx.fillText(data.datasets[i].label,xPos - 10,yPos - innerRadius - (width/2));
            }
        }
    }

    // config 
    const config = {
      type: 'doughnut',
      data,
      options: {
      	cutout:'30%',
        borderRadius:10,
        plugins:{
        	legend:{
            	display:false
            }
        }
      },
      plugins: [labelsRadialBar]
    };

    // render init block
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );

    //Instantly assign Chart.js version
    const chartVersion = document.getElementById('chartVersion');
    chartVersion.innerText = Chart.version;
    </script>

  </body>
</html>