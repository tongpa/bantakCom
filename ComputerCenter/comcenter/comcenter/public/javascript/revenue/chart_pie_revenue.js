Ext.namespace("projects");
﻿Ext.namespace("revenue"); 
revenue.graphChartRevenue = new Ext.extend(Ext.chart.Chart,{
	
	animate: true,
    store: projects.showGraphByDivisionStore ,
    shadow: true,
    legend: {
        position: 'right'
    },
    insetPadding: 60,
    theme: 'Base:gradients',
    series: [{
        type: 'pie',
        field: 'data1',
        showInLegend: true,
        
        tips: {
          trackMouse: true,
          width: 140,
          height: 28,
          renderer: function(storeItem, item) {
            //calculate percentage.
            var total = 0;
            store1.each(function(rec) {
                total += rec.get('data1');
            });
            this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
          }
        } 
    }]
});