Ext.namespace("projects");
﻿Ext.namespace("revenue"); 
function currentBudget(value, cell, record){
	var total = Ext.util.Format.currency(value , '฿', 2,true);
	return     '<span style="color:green;">' + total + '</span>'; 
}
function currentSummaryAllBudget(value, summaryData, dataIndex){
	var total = Ext.util.Format.currency(value , '฿', 2,true);
	 return     '<span style="color:red;">' + total + '</span>'; 
}
function countSubGroup(value, summaryData, dataIndex){
	 return ((value === 0 || value > 1) ? '(' + value + ' รายการ)' : '(1 รายการ)');
}
revenue.gridSumListRevenue = Ext.extend(Ext.grid.Panel,{
	store: Ext.data.StoreManager.lookup('listGroupRevenue'),
	features: [{
            id: 'groupsumrevenue',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}' ,
            startCollapsed  : true
        }], 
	columns: [
		{header: 'หมวดรายการ', width : 260}, /*, dataIndex: 'group'*/
        {header: 'รายการย่อย',width : 360,  dataIndex: 'subgroup', summaryType: 'count',summaryRenderer : countSubGroup}, 
		{header: 'เงินประมาณ',width : 100,align: 'right', dataIndex: 'estimate' ,renderer : currentBudget ,summaryRenderer: currentSummaryAllBudget, summaryType: 'sum' }  
        
    ] 
	
	
});

revenue.SumListRevenue = Ext.extend(Ext.form.Panel,{
	//title:'แสดงรายการโครงการ',
	autoWidth : true,
	//autoHeight: true,
	height : 1500 ,
	loadDataSearch : function(){
		fiscalyear = this.fiscalyear.getValue();
		revenue_list = this.revenueList.getValue();
		revenue.listGroupRevenue.load({
			params:{
				start : 0,
				limit :  25,
		 		fiscalyear: fiscalyear,
		 		revenue_list : revenue_list
       		}
		});//.sort('revenue_list_id', 'ASC');
		
		revenue.listGroupRevenue.sort();
		
		revenue.showGraphRevenue.load({
			params:{
				start : 0,
				limit :  25,
		 		fiscalyear: fiscalyear,
		 		revenue_list : revenue_list
       		}
		
		});
		
		 
	}, 
	initComponent: function() {
		var main = this;
		var today = new Date();
		year = Ext.Date.format(today, 'Y');
		year = parseInt(year, 10) +543;
		
		year = parseInt(year, 10) +1; //next 1 year 
		
		 
		main.gridlist = new revenue.gridSumListRevenue ({
			height : 700 , 
			listeners: {
                selectionchange: function(model, records) {
                    if (records[0]) {
                        //this.up('form').getForm().loadRecord(records[0]);
                       
                         
                        
                       
                    }
                }
            }
		});
		
		main.graphChartRevenue   = Ext.create('widget.panel', {
	        //width: 800,
	        autoWidth : true,
	        height: 600,
	        title: 'กราฟ',
	        layout: 'fit' 
        	 ,items :  {
        	 	width : 750,
		    	height: 400,
        	 	xtype: 'chart',
        	 	animate: true,
			    store: revenue.showGraphRevenue,
			    shadow: true,
			    legend: {
	                position: 'right'
	            },
			    theme: 'Base:gradients',
			    series: [{
			        type: 'pie',
			        field: 'sum_estimate',
			        showInLegend: true,
			         
			        tips: {
			          trackMouse: true,
			          width: 140,
			          height: 48,
			          renderer: function(storeItem, item) {
			            //calculate and display percentage on hover
			            var total = 0;
			            revenue.showGraphRevenue.each(function(rec) {
			                total += rec.get('sum_estimate');
			            });
			            this.setTitle(storeItem.get('revenue_list_name') + ': ' + Math.round(storeItem.get('sum_estimate') / total * 100) + '%');
			          }
			        },
			        highlight: {
			          segment: {
			            margin: 20
			          }
			        },
			        label: {
			            field: 'revenue_list_name',
			            display: 'rotate',
			            contrast: true,
			            font: '12px Arial'
			        }
			    }  ] 
        	 }
        });
		
		main.fiscalyear = new Ext.form.field.Number({
			anchor: '100%',
	        name: 'fiscal_year',
	        fieldLabel: 'ปีงบประมาณ',
	        value : year,
	        maxValue: 2600,
        	minValue: 2553	 			
		});
		
		main.revenueList = new Ext.form.field.ComboBox({
			fieldLabel: 'รายการ',
			name : 'revenueList',
		    store:  revenue.listDetail,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,
		    value : '*',
		    editable: false	,
		    anchor: '100%',
		    allowBlank: true, 
		    blankText :'กรุณาเลือกรายการ',
		    
		    listeners:{
		         scope: this,
		         'select': function (  field,   value,   options ){
		         	/*groupId = value[0].data.id;
		         	main.revenueSubList.reset();
		         	main.revenueSubList.setDisabled(false);
		         	if(groupId != 0){
			         
			         	revenue.listsSubDetail.load({
			         		params : {
			         			groupId : groupId
			         		}
			         	});
		         	 }
		         	 else {
			         	main.revenueSubList.setDisabled(true);
			         }*/
		         }
		    }
		});
		
	 
		
		main.search_button = new Ext.Button({
			text     : 'ค้นหา',
			width : 120,
			listeners: {
		        click: function() {
		        	main.loadDataSearch();  
		        }  
		    }
		});
		
		
		main.search = new Ext.form.Panel({
			border : false,
			layout:'column',
			items : [
			 	{
			 		layout: 'anchor',
					border : false,
					 
					bodyStyle: {
					    //background: '#ffc',
					    padding: '0px 10px'
					},
		    		columnWidth: .25,
		    		items : [ main.fiscalyear ]
			 	} ,
			 	{
			 		layout: 'anchor',
					border : false,
					 
					bodyStyle: {
					    //background: '#ffc',
					    padding: '0px 10px'
					},
		    		columnWidth: .40,
		    		items : [ main.revenueList ]
			 	}  
			 
			], 
			 dockedItems :[
			  
			 {
				xtype :'toolbar',
				dock : 'bottom',
				ui : 'footer',
				layout : {
					pack : 'center'
				},
				items : [
					
					main.search_button
				]
			}]	
		});
		
		Ext.apply(this, {
			bodyPadding: 10,
			autoHeight : true,
			border : false,
			items : [main.search ,main.gridlist,main.graphChartRevenue]  
		});
		
		revenue.SumListRevenue.superclass.initComponent.apply(this, arguments);
	}
});