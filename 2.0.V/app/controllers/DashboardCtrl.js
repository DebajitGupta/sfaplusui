(function () {
    'use strict'
    angular
        .module('app')
        .controller('DashboardCtrl', ['$scope', 'DashboardSrvc', function ($scope, DashboardSrvc) {

            getattandancechart();
            getLeedchart();
            getCompany();
            getSubscription();

            function getattandancechart() {

                // Themes begin
                am4core.useTheme(am4themes_animated);
                // Themes end



                var chart = am4core.create('chartdiv', am4charts.XYChart)
                chart.colors.step = 2;

                chart.legend = new am4charts.Legend()
                chart.legend.position = 'top'
                chart.legend.paddingBottom = 20
                chart.legend.labels.template.maxWidth = 95

                var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
                xAxis.dataFields.category = 'category'
                xAxis.renderer.cellStartLocation = 0.1
                xAxis.renderer.cellEndLocation = 0.9
                xAxis.renderer.grid.template.location = 0;

                var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
                yAxis.min = 0;

                function createSeries(value, name) {
                    var series = chart.series.push(new am4charts.ColumnSeries())
                    series.dataFields.valueY = value
                    series.dataFields.categoryX = 'category'
                    series.name = name

                    series.events.on("hidden", arrangeColumns);
                    series.events.on("shown", arrangeColumns);

                    var bullet = series.bullets.push(new am4charts.LabelBullet())
                    bullet.interactionsEnabled = false
                    bullet.dy = 30;
                    bullet.label.text = '{valueY}'
                    bullet.label.fill = am4core.color('#ffffff')

                    return series;
                }

                chart.data = [
                    {
                        category: '19-10-20',
                        first: 65,
                        second: 35
                       
                    },
                    {
                        category: '20-10-20',
                        first: 70,
                        second: 30
                        
                    },
                    {
                        category: '21-10-20',
                        first: 60,
                        second: 40
                        
                    },
                   
                ]


                createSeries('first', 'Present');
                createSeries('second', 'Absent');

                function arrangeColumns() {

                    var series = chart.series.getIndex(0);

                    var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
                    if (series.dataItems.length > 1) {
                        var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
                        var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
                        var delta = ((x1 - x0) / chart.series.length) * w;
                        if (am4core.isNumber(delta)) {
                            var middle = chart.series.length / 2;

                            var newIndex = 0;
                            chart.series.each(function (series) {
                                if (!series.isHidden && !series.isHiding) {
                                    series.dummyData = newIndex;
                                    newIndex++;
                                }
                                else {
                                    series.dummyData = chart.series.indexOf(series);
                                }
                            })
                            var visibleCount = newIndex;
                            var newMiddle = visibleCount / 2;

                            chart.series.each(function (series) {
                                var trueIndex = chart.series.indexOf(series);
                                var newIndex = series.dummyData;

                                var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                                series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                                series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                            })
                        }
                    }
                }

            }

            function getLeedchart() {
                am4core.useTheme(am4themes_animated);
                // Themes end

                // Create chart instance
                var chart = am4core.create("chartdiv1", am4charts.PieChart);

                // Set data
                var selected;
                var types = [{
                    type: "Leed",
                    percent: 70,
                    color: chart.colors.getIndex(0),
                    subs: [{
                        type: "Super Dealer",
                        percent: 15
                    }, {
                            type: "Dealer",
                        percent: 35
                    }, {
                        type: "Engineer",
                        percent: 20
                    }]
                }, {
                        type: "Leed Not",
                    percent: 30,
                    color: chart.colors.getIndex(1),
                    subs: [{
                        type: "Super Dealer",
                        percent: 15
                    }, {
                            type: "Dealer",
                        percent: 10
                    }, {
                            type: "Engineer",
                        percent: 5
                    }]
                }];

                // Add data
                chart.data = generateChartData();

                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = "percent";
                pieSeries.dataFields.category = "type";
                pieSeries.slices.template.propertyFields.fill = "color";
                pieSeries.slices.template.propertyFields.isActive = "pulled";
                pieSeries.slices.template.strokeWidth = 0;

                function generateChartData() {
                    var chartData = [];
                    for (var i = 0; i < types.length; i++) {
                        if (i == selected) {
                            for (var x = 0; x < types[i].subs.length; x++) {
                                chartData.push({
                                    type: types[i].subs[x].type,
                                    percent: types[i].subs[x].percent,
                                    color: types[i].color,
                                    pulled: true
                                });
                            }
                        } else {
                            chartData.push({
                                type: types[i].type,
                                percent: types[i].percent,
                                color: types[i].color,
                                id: i
                            });
                        }
                    }
                    return chartData;
                }

                pieSeries.slices.template.events.on("hit", function (event) {
                    if (event.target.dataItem.dataContext.id != undefined) {
                        selected = event.target.dataItem.dataContext.id;
                    } else {
                        selected = undefined;
                    }
                    chart.data = generateChartData();
                });
            }

            function getCompany() {
                am4core.useTheme(am4themes_animated);
                // Themes end
                // Create chart instance
                var chart = am4core.create("chartcomp", am4charts.XYChart3D);

                // Add data
                chart.data = [{
                    "country": "August",
                    "visits": 40000,
                    "color": chart.colors.next()
                }, {
                    "country": "September",
                    "visits": 18000,
                    "color": chart.colors.next()
                }, {
                    "country": "October",
                    "visits": 80000,
                    "color": chart.colors.next()
                }, {
                    "country": "November",
                    "visits": 32000,
                    "color": chart.colors.next()
                }];

                // Create axes
                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "country";
                categoryAxis.renderer.labels.template.rotation = 270;
                categoryAxis.renderer.labels.template.hideOversized = false;
                categoryAxis.renderer.minGridDistance = 20;
                categoryAxis.renderer.labels.template.horizontalCenter = "right";
                categoryAxis.renderer.labels.template.verticalCenter = "middle";
                categoryAxis.tooltip.label.rotation = 270;
                categoryAxis.tooltip.label.horizontalCenter = "right";
                categoryAxis.tooltip.label.verticalCenter = "middle";

                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.title.text = "Monthly Companies";
                valueAxis.title.fontWeight = "bold";

                // Create series
                var series = chart.series.push(new am4charts.ColumnSeries3D());
                series.dataFields.valueY = "visits";
                series.dataFields.categoryX = "country";
                series.name = "Visits";
                series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
                series.columns.template.fillOpacity = .8;
                series.columns.template.propertyFields.fill = "color";

                var columnTemplate = series.columns.template;
                columnTemplate.strokeWidth = 2;
                columnTemplate.strokeOpacity = 1;
                columnTemplate.stroke = am4core.color("#FFFFFF");

                chart.cursor = new am4charts.XYCursor();
                chart.cursor.lineX.strokeOpacity = 0;
                chart.cursor.lineY.strokeOpacity = 0;

                // Enable export
                chart.exporting.menu = new am4core.ExportMenu();
            }

            function getSubscription() {
                // Themes begin
                am4core.useTheme(am4themes_animated);
                // Themes end

                // Create chart instance
                var chart = am4core.create("Subscription", am4charts.XYChart);

                // Add data
                chart.data = [
                    {
                        "region": "October",
                        "state": "Week 1",
                        "sales": 92
                    },
                    {
                        "region": "October",
                        "state": "Week 2",
                        "sales": 131
                    },
                    {
                        "region": "October",
                        "state": "Week 3",
                        "sales": 91
                    },
                    {
                        "region": "October",
                        "state": "Week 4",
                        "sales": 77
                    }
                ];

                // Create axes
                var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
                yAxis.dataFields.category = "state";
                yAxis.renderer.grid.template.location = 0;
                yAxis.renderer.labels.template.fontSize = 10;
                yAxis.renderer.minGridDistance = 10;

                var xAxis = chart.xAxes.push(new am4charts.ValueAxis());

                // Create series
                var series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueX = "sales";
                series.dataFields.categoryY = "state";
                series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";
                series.columns.template.strokeWidth = 0;
                series.columns.template.adapter.add("fill", function (fill, target) {
                    if (target.dataItem) {
                        switch (target.dataItem.dataContext.region) {
                            case "October":
                                return chart.colors.getIndex(0);
                                break;
                            //case "East":
                            //    return chart.colors.getIndex(1);
                            //    break;
                            //case "South":
                            //    return chart.colors.getIndex(2);
                            //    break;
                            //case "West":
                            //    return chart.colors.getIndex(3);
                            //    break;
                        }
                    }
                    return fill;
                });

                var axisBreaks = {};
                var legendData = [];

                // Add ranges
                function addRange(label, start, end, color) {
                    var range = yAxis.axisRanges.create();
                    range.category = start;
                    range.endCategory = end;
                    range.label.text = label;
                    range.label.disabled = false;
                    range.label.fill = color;
                    range.label.location = 0;
                    range.label.dx = -130;
                    range.label.dy = 12;
                    range.label.fontWeight = "bold";
                    range.label.fontSize = 12;
                    range.label.horizontalCenter = "left"
                    range.label.inside = true;

                    range.grid.stroke = am4core.color("#396478");
                    range.grid.strokeOpacity = 1;
                    range.tick.length = 200;
                    range.tick.disabled = false;
                    range.tick.strokeOpacity = 0.6;
                    range.tick.stroke = am4core.color("#396478");
                    range.tick.location = 0;

                    range.locations.category = 1;
                    var axisBreak = yAxis.axisBreaks.create();
                    axisBreak.startCategory = start;
                    axisBreak.endCategory = end;
                    axisBreak.breakSize = 1;
                    axisBreak.fillShape.disabled = true;
                    axisBreak.startLine.disabled = true;
                    axisBreak.endLine.disabled = true;
                    axisBreaks[label] = axisBreak;

                    legendData.push({ name: label, fill: color });
                }

                addRange("October", "Week 1", "Week 4", chart.colors.getIndex(0));
                //addRange("East", "New York", "West Virginia", chart.colors.getIndex(1));
                //addRange("South", "Florida", "South Carolina", chart.colors.getIndex(2));
                //addRange("West", "California", "Wyoming", chart.colors.getIndex(3));

                chart.cursor = new am4charts.XYCursor();


                var legend = new am4charts.Legend();
                legend.position = "right";
                legend.scrollable = true;
                legend.valign = "top";
                legend.reverseOrder = true;

                chart.legend = legend;
                legend.data = legendData;

                legend.itemContainers.template.events.on("toggled", function (event) {
                    var name = event.target.dataItem.dataContext.name;
                    var axisBreak = axisBreaks[name];
                    if (event.target.isActive) {
                        axisBreak.animate({ property: "breakSize", to: 0 }, 1000, am4core.ease.cubicOut);
                        yAxis.dataItems.each(function (dataItem) {
                            if (dataItem.dataContext.region == name) {
                                dataItem.hide(1000, 500);
                            }
                        })
                        series.dataItems.each(function (dataItem) {
                            if (dataItem.dataContext.region == name) {
                                dataItem.hide(1000, 0, 0, ["valueX"]);
                            }
                        })
                    }
                    else {
                        axisBreak.animate({ property: "breakSize", to: 1 }, 1000, am4core.ease.cubicOut);
                        yAxis.dataItems.each(function (dataItem) {
                            if (dataItem.dataContext.region == name) {
                                dataItem.show(1000);
                            }
                        })

                        series.dataItems.each(function (dataItem) {
                            if (dataItem.dataContext.region == name) {
                                dataItem.show(1000, 0, ["valueX"]);
                            }
                        })
                    }
                })
            }
        }]);
})();