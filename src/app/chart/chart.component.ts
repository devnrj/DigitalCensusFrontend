import { Component, OnInit } from '@angular/core';
import { HouseService } from '../services/index.js';
import { Chart } from "chart.js";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  statePopulationChart = [];
  agePopulationChart = [];
  lable = [];
  values = [];
  ages=[];
  ageCount=[];

  constructor(private houseService: HouseService) {
    this.houseService.allStatePopulation().subscribe
    (data => {
                console.log(data);
                this.lable = data[0];
                this.values = data[1];
                this.chartRender();
              },
    error => console.log(error)
    );

    this.houseService.allAgePopulation().subscribe(
      data=>{
        this.ages=data[0];
        this.ageCount=data[1];
        this.ageChartRender();
      },
      error=>{
        console.log(error);
      }
    );

    
  }

  generateColors() {
    var colors: string[] = [];
    for (let i = 0; i < 4; i++) {
      colors.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16))
    }
    return colors
  }

  ageChartRender(){
    
    this.agePopulationChart = new Chart('agePopulationChart', {
      type: 'bar',
      data: {
        labels: this.ages,
        datasets: [{
          data: this.ageCount,
          backgroundColor: this.generateColors(),
          borderWidth: 1,
        }]
      },
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'AgeWise Population'
        },
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              steps: 50,
              stepValue: 3,
              max: 20
            }
          }]
        },
      }
    });
  }
  chartRender() {

    this.statePopulationChart = new Chart('statePopulationChart', {
      type: 'bar',
      data: {
        labels: this.lable,
        datasets: [{
          data: this.values,
          backgroundColor: this.generateColors(),
          borderWidth: 1,
        }]
      },
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'StateWise Population'
        },
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              steps: 50,
              stepValue: 3,
              max: 20
            }
          }]
        },
      }
    });
  }

  ngOnInit() {
    
  }
}
