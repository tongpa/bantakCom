Ext.namespace("hosxp");



hosxp.showGraphVisitInYear = Ext.extend(Ext.form.Panel,{
	//title:'แสดงรายการโครงการ',
	autoWidth : true,
	autoHeight: true,
	store : null,
	ylabel : 'จำนวน',
	xlabel : 'เดือน',
	//height : 600 ,
	searchValue: function(){
		year = this.year.getValue();
		this.store.load({
		//hosxp.patientinyearstore.load({
		//hosxp.visitinyearstore.load({
			params:{
				start : 0,
				limit :  25,
		 		year: year 
       		}
		});
	}, 
	initComponent: function() {
		var main = this;
		
		var today = new Date();
		 
		
		year = Ext.Date.format(today, 'Y');
		year = parseInt(year, 10) +543;
		
		main.year = new Ext.form.field.Number({
			anchor: '50%',
			
	        name: 'year',
	        fieldLabel: 'ปี',
	        value : year,
	        maxValue: 2600,
        	minValue: 2553				
		}); 
		
		main.search_button = new Ext.Button({
			text     : 'แสดง',
			width : 120,
			//columnWidth: .50,
			listeners: {
		        click: function() {
		        	main.searchValue();     	
		            
			     }  
		      
		    }
					
		});
		
		
		main.showGraph  = Ext.create('widget.panel', {
         
	        width: 840,
	        height: 400,
	        //title: 'จำนวนครั้งที่ผู้ป่วยเข้ารับบริการ',
	         
	        layout: 'fit',
	        items: {
	        	id: 'chartCmp',
	        	xtype: 'chart',
	            style: 'background:#fff',
	            animate: true,
	            shadow: true,
	            //store: hosxp.visitinyearstore,
	            store : main.store,
	            axes: [{
	                type: 'Numeric',
	                position: 'left',
	                fields: ['data'],
	                title: main.ylabel,//'จำนวนครั้ง',
	                label: {
	                    renderer: Ext.util.Format.numberRenderer('0,0')
	                },
	                grid: true,
	                minimum: 0
	            }, {
	                type: 'Category',
	                position: 'bottom',
	                fields: ['name'],
	                title:  main.xlabel,//'เดือน',
	                label: {
	                    rotate: {
	                        degrees: 0
	                    }
	                }
	            }],
	            series: [{
	                type: 'column',
	                axis: 'left',
	                highlight: true,
	                gutter: 80,
	                xField: 'id',
	                yField: ['data'],
	                tips: {
	                    trackMouse: true,
	                    width: 100,
	                    height: 38,
	                    renderer: function(storeItem, item) {
	                    	
	                    	var visit = Ext.util.Format.currency(storeItem.get('data') , ' ', 2,true);
	                    
	                        this.setTitle(storeItem.get('name') + ':<br />' + visit  );
	                    }
	                },
	                label: {
	                  display: 'insideEnd',
	                  'text-anchor': 'middle',
	                    field: 'data',
	                    renderer: Ext.util.Format.numberRenderer('0,0'), 
	                    //Ext.util.Format.numberRenderer('0'),
	                    orientation: 'vertical',
	                    color: '#333'
	                }
	                /*,
	                style: {
	                    fill: '#38B8BF'
	                }*/
	            }]	 
	        }
	    });
		
		main.search = new Ext.form.Panel({
			border : false,
			layout:'column',
			bodyStyle: {
					    //background: '#ffc',
					    padding: '0px 10px'
					},
			items : [
				{
					border : false,
					columnWidth: .50,
					items : [main.year]
				},
				{
					border : false,
					columnWidth: .50,
					items : [main.search_button]
				}
				
			]
		});
		
		Ext.apply(this, {
			bodyPadding: 10,
			
			items : [main.search,main.showGraph ]  
		});
		
		hosxp.showGraphVisitInYear.superclass.initComponent.apply(this, arguments);	
	}
	
});



hosxp.showGraphPatientSexInYear = Ext.extend(Ext.form.Panel,{
	//title:'แสดงรายการโครงการ',
	autoWidth : true,
	autoHeight: true,
	store : null,
	ylabel : 'จำนวน',
	xlabel : 'เดือน',
	//height : 600 ,
	searchValue: function(){
		year = this.year.getValue();
		this.store.load({
		//hosxp.patientinyearstore.load({
		//hosxp.visitinyearstore.load({
			params:{
				start : 0,
				limit :  25,
		 		year: year 
       		}
		});
	}, 
	initComponent: function() {
		var main = this;
		
		var today = new Date();
		 
		
		year = Ext.Date.format(today, 'Y');
		year = parseInt(year, 10) +543;
		
		main.year = new Ext.form.field.Number({
			anchor: '50%',
			
	        name: 'year',
	        fieldLabel: 'ปี',
	        value : year,
	        maxValue: 2600,
        	minValue: 2553				
		}); 
		
		main.search_button = new Ext.Button({
			text     : 'แสดง',
			width : 120,
			//columnWidth: .50,
			listeners: {
		        click: function() {
		        	main.searchValue();     	
		            
			     }  
		      
		    }
					
		});
		
		var colors = ['rgb(47, 162, 223)',
                 'rgb(154, 176, 213)' ];

	    Ext.chart.theme.Browser = Ext.extend(Ext.chart.theme.Base, {
	        constructor: function(config) {
	            Ext.chart.theme.Base.prototype.constructor.call(this, Ext.apply({
	                colors: colors
	            }, config));
	        }
	    });
		
		main.showGraph  = Ext.create('widget.panel', {
         
	        width: 840,
	        height: 400,
	        //title: 'จำนวนครั้งที่ผู้ป่วยเข้ารับบริการ',
	         
	        layout: 'fit',
	        items: {
	        	id: 'chartCmp',
	        	xtype: 'chart',
	            style: 'background:#fff',
	            animate: true,
	            shadow: true,
	           theme: 'Browser:gradients',
	            store : main.store,
	             legend: {
		              position: 'right'  
		            },
	            axes: [{
	                type: 'Numeric',
	                position: 'left',
	                fields: ['ชาย','หญิง'],
	                 
	                title: main.ylabel,//'จำนวนครั้ง',
	                label: {
	                    renderer: Ext.util.Format.numberRenderer('0,0')
	                },
	                grid: true,
	                minimum: 0
	            }, {
	                type: 'Category',
	                position: 'bottom',
	                fields: ['name'],
	                
	                title:  main.xlabel,//'เดือน',
	                label: {
	                    rotate: {
	                        degrees: 0
	                    }
	                }
	            }],
	            series: [{
	                type: 'column',
	                 axis: 'left',
	                highlight: true,
	                gutter: 80,
	                xField: 'name',
	                
	                yField: ['ชาย','หญิง'],
	                style: {
	                	//width : 25,
			            opacity: 0.93
			        },
	                 
	                label: {
	                  display: 'insideEnd',
	                  'text-anchor': 'middle',
	                    field: ['ชาย','หญิง'],
	                    renderer: Ext.util.Format.numberRenderer('0,0'), 
	                    //Ext.util.Format.numberRenderer('0'),
	                    orientation: 'vertical',
	                    color: '#333'
	                }
	                /*,
	                style: {
	                    fill: '#38B8BF'
	                }*/
	            }]	 
	        }
	    });
		
		main.search = new Ext.form.Panel({
			border : false,
			layout:'column',
			bodyStyle: {
					    //background: '#ffc',
					    padding: '0px 10px'
					},
			items : [
				{
					border : false,
					columnWidth: .50,
					items : [main.year]
				},
				{
					border : false,
					columnWidth: .50,
					items : [main.search_button]
				}
				
			]
		});
		
		Ext.apply(this, {
			bodyPadding: 10,
			
			items : [main.search,main.showGraph ]  
		});
		
		hosxp.showGraphPatientSexInYear.superclass.initComponent.apply(this, arguments);	
	}
	
});

