﻿Ext.namespace("projects");

function currentSumBudget (value, cell, record){

	 var total = Ext.util.Format.currency(value , '฿', 2,true);
	 return     '<span style="color:green;">' + total + '</span>'; 
}

function currentSummaryAllBudget(value, summaryData, dataIndex){
	var total = Ext.util.Format.currency(value , '฿', 2,true);
	 return     '<span style="color:red;">' + total + '</span>'; 
}

function currentBudget(value, cell, record){
	var total = Ext.util.Format.currency(value , '฿', 2,true);
	return     '<span style="color:green;">' + total + '</span>'; 
}

function currentDetail (value, cell, record){
	return '<textarea readonly class="x-form-textarea x-form-field">' + value +'</textarea>';
}
function currentStatus (value, cell, record){
	var status = 1;
	if(record.data.project_status_id != null){
		 status = parseInt(record.data.project_status_id,10);
	}
 
	var colorStatus = "color:#FFCC00;";
	
	if(status == 2){
		colorStatus = "color:green;";
	}else{
		if(status == 3){
			colorStatus = "color:red;";
		}else
		{
			if(status == 4){
				colorStatus = "color:blue;";
			}else
			{
				if(status == 5){
					colorStatus = "color:#556B2F;";
				} 
			}
		}
	}
	
	return     '<span style="'+colorStatus + '">' + value + '</span>'; 
}

function currentSummaryTask(value, summaryData, dataIndex){
	 return ((value === 0 || value > 1) ? '(' + value + ' รายการ)' : '(1 รายการ)');
}

projects.gridSumByDivisionProject = Ext.extend(Ext.grid.Panel,{
	store: Ext.data.StoreManager.lookup('sumProjectByDivisionStore'),
	iconCls: 'icon-grid',
 
	//collapseFirst : false,
	features: [{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}' ,
            startCollapsed  : true
        }], 
	columns: [
	//	{header: 'ปีงบประมาณ', width:70,  dataIndex: 'fiscal_year'},
		{header: 'ประเภท',  dataIndex: 'project_type',summaryType: 'count', summaryRenderer : currentSummaryTask},
        {header: 'โครงการ',  dataIndex: 'project_name'},
        {header: 'หน่วย/งาน', dataIndex: 'section'} ,
        {header: 'งบประมาณรวม',align: 'right', dataIndex: 'allBudget',renderer : currentSumBudget ,summaryRenderer: currentSummaryAllBudget, summaryType: 'sum'},
		{header: 'เงินงบประมาณ',align: 'right', dataIndex: 'project_budget',renderer : currentBudget ,summaryRenderer: currentSummaryAllBudget, summaryType: 'sum'},
		{header: 'เงินบำรุง',align: 'right', dataIndex: 'maintenance_funds_budget',renderer : currentBudget ,summaryRenderer: currentSummaryAllBudget, summaryType: 'sum'},
		{header: 'งบประมาณอื่น',align: 'right', dataIndex: 'budget_other',renderer : currentBudget,summaryRenderer: currentSummaryAllBudget , summaryType: 'sum'},
        {header: 'ผู้รับผิดชอบ', dataIndex: 'user_name'}
       /* {header: 'สถานะ', width:110,dataIndex: 'project_status',renderer :currentStatus},
       	 {header: 'แผนก/ฝ่าย', dataIndex: 'division'},
       */
        
       
       
        
    ] 
	
	
});

projects.graphChartGroupByDevision = new Ext.extend(Ext.chart.Chart,{
	animate: true,
    store: Ext.data.StoreManager.lookup('showGraphByDivisionStore'),
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

projects.ListProject = Ext.extend(Ext.form.Panel,{
	//title:'แสดงรายการโครงการ',
	autoWidth : true,
	autoHeight: true,
	//height : 600 ,
	loadDataSearch : function(){
		fiscalyear = this.fiscalyear.getValue();
    	division = this.division.getValue();
    	section = this.section.getValue();
    	searchstatus = this.searchstatus.getValue();
  		projectType = this.projectType.getValue();
    	 
    	projects.listProjectStore.load({
    		params:{
				 
				start : 0,
				limit :  25,
		 		fiscalyear: fiscalyear,
		 		division : division,
		 		section: section,
		 		status: searchstatus ,
		 		projectType : projectType
       		}
    	});
	},
	exportToExcel : function(){
		var main = this;
		fiscalyear = this.fiscalyear.getValue();
    	division = this.division.getValue();
    	section = this.section.getValue();
    	searchstatus = this.searchstatus.getValue();
  		projectType = this.projectType.getValue();
  		 
    	document.location.href = '/project/ExportProjectToExcel?fiscalyear='+fiscalyear +'&division='+division +'&section='+section+'&status='+status+'&projectType='+projectType;
    	
    	 
	},
	initComponent: function() {
		var main = this;
		
		main.editProject = new projects.AddProject( );
		
		 
		
		var storevalue = new Ext.data.Store({
			fields: [
			    	{name: 'division' }  ,
			         {name: 'allBudget' }  
			    ] ,
			proxy : {
				type: 'ajax',
				url : '/project/showGraphByDivision',
				reader : {
					type: 'json',
					root: 'root'
				}
			},
			autoLoad : false
		});
		
		 
		 
	 
		main.showChartPanel = Ext.create('widget.panel', {
	        //width: 800,
	        autoWidth : true,
	        height: 600,
	        title: 'กราฟแสดงงบประมาณรวมของแต่ละกลุ่มงาน',
	        layout: 'fit' 
        	 ,items :  {
        	 	width : 750,
		    	height: 550,
        	 	xtype: 'chart',
        	 	animate: true,
			    store: projects.showGraphByDivisionStore,
			    shadow: true,
			    legend: {
	                position: 'right'
	            },
			    theme: 'Base:gradients',
			    series: [{
			        type: 'pie',
			        field: 'allBudget',
			        showInLegend: true,
			         
			        tips: {
			          trackMouse: true,
			          width: 140,
			          height: 28,
			          renderer: function(storeItem, item) {
			            //calculate and display percentage on hover
			            var total = 0;
			            projects.showGraphByDivisionStore.each(function(rec) {
			                total += rec.get('allBudget');
			            });
			            this.setTitle(storeItem.get('division') + ': ' + Math.round(storeItem.get('allBudget') / total * 100) + '%');
			          }
			        },
			        highlight: {
			          segment: {
			            margin: 20
			          }
			        },
			        label: {
			            field: 'division',
			            display: 'rotate',
			            contrast: true,
			            font: '12px Arial'
			        }
			    }  ] 
        	 }
        });
        
       

    main.showGraphBarPanel = Ext.create('widget.panel', {
         
        width: 840,
        height: 400,
        title: 'แสดงงบประมาณรวม',
         
        layout: 'fit',
        items: {
            xtype: 'chart',
            animate: true,
            shadow: true,
            store: projects.showGraphByDivisionStore,
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: [   'งบประมาณ' , 'เงินบำรุง', 'งบประมาณอื่น'],
                title: 'จำนวนเงิน ( บาท )',
                grid: true,
                label: {
                    renderer: function(v) {
                    	return  Ext.util.Format.currency(v , '฿', 1,true);
                       
                    }
                },
                roundToDecimal: false
            }, {
                type: 'Category',
                position: 'left',
                fields: ['division'],
                title: 'กลุ่มงาน'
            }],
            series: [{
                type: 'bar',
                axis: 'bottom',
                gutter: 80,
                xField: 'division',
                yField: [   'งบประมาณ', 'เงินบำรุง', 'งบประมาณอื่น'],
                stacked: true,
                tips: {
                    trackMouse: true,
                    width: 120,
                    height: 28,
                    renderer: function(storeItem, item) {
                    	  
                        this.setTitle(Ext.util.Format.currency(item.value[1]  , '฿', 0,true));
                    }
                }
            }]
        }
    });
        
        
         
        
	 
		
		main.showProject = new Ext.window.Window({
			width : 500,
			height : 550 ,
		    layout: 'fit',
		    closeAction : 'hide' ,
		    plain : true,
		    modal : true,
		    items : [main.editProject]
		});
		main.editProject.fromWin = main.showProject;
		
		main.gridProject = new projects.gridSumByDivisionProject({
			height : 400 ,
			listeners: {
                selectionchange: function(model, records) {
                    if (records[0]) {
                        //this.up('form').getForm().loadRecord(records[0]);
                        main.showProject.show();
                        main.editProject.setFromView();
                        main.editProject.setLoadData(records[0]);
                        
                       
                    }
                }
            }
		});
		main.fiscalyear = new Ext.form.field.Number({
			//anchor: '50%',
	        name: 'search_fiscal_year',
	        fieldLabel: 'ปีงบประมาณ',
	        value : year,
	        maxValue: 2600,
        	minValue: 2553	,
        	columnWidth: .40			
		});
		main.division= new Ext.form.field.ComboBox({
			fieldLabel: 'แผนก/ฝ่าย',
			name : 'search_division', 
		    store: maintenance.listDivision,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,
		    value : '',
		    editable: false	,
		    anchor: '100%',
		    listeners:{
		         scope: this,
		         'select': function (  field,   value,   options ){
		         	main.section.reset();
		         	division = value[0].data.id;
		         	projects.listSection.load({
		         		params : {
		         			division : division
		         		}
		         	});
		         	 
		         }
		    }
		    
		});
		main.section = new Ext.form.field.ComboBox({
			fieldLabel: 'หน่วย/งาน',
			name : 'search_section', 
		    store: projects.listSection,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,
		    value : '',
		    editable: false	,
		    anchor: '100%',  
		    columnWidth: .50
		});
		
		main.searchstatus = new Ext.form.field.ComboBox({
			fieldLabel: 'สถานะ',
			name : 'project_status', 
		    store: projects.listStatus,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,
		    value : '',
		    editable: false	,
		    anchor: '100%'  ,
		    columnWidth: .50
		}); 
		
		main.search_button = new Ext.Button({
			text     : 'ค้นหา',
			width : 120,
			listeners: {
		        click: function() {
		        	fiscalyear = main.fiscalyear.getValue();
		        	division = main.division.getValue();
		        	section = main.section.getValue();
		        	searchstatus = main.searchstatus.getValue();
		      		projectType = main.projectType.getValue();
		        	 
		        	projects.sumProjectByDivisionStore.load({
		        		params:{
       						 
       						start : 0,
       						limit :  25,
       				 		fiscalyear: fiscalyear,
       				 		division : division,
       				 		section: section,
       				 		status: searchstatus ,
       				 		projectType : projectType
			       		}
		        	});     
		        	
		        	projects.showGraphByDivisionStore.load({
		        		params:{
       						 
       						start : 0,
       						limit :  25,
       				 		fiscalyear: fiscalyear,
       				 		division : division,
       				 		section: section,
       				 		status: searchstatus ,
       				 		projectType : projectType
			       		}
		        	});  	
		            
			     }  
		      
		    }
					
		});
		 
		main.exportExcel_button = new Ext.Button({
			text     : 'บันทึก เป็น Excel',
			width : 120,
			listeners: {
		        click: function() {
		        	main.exportToExcel();     	
		            
			     }  
		      
		    }
					
		});
		main.menu_add = new Ext.Button({
			text : 'เพิ่ม/ลบ รายการ',
			width : 120,
			listeners : {
				click : function(){
				 		window.location = '/project';
				 	//alert("เพิ่มรายหาร");
				/*	main.editProject.setFormEdit(false);
					main.editProject.getForm().reset();
					main.showProject.show();*/
				}
			}
		});
		
		main.menu_summary = new Ext.Button({
			text : 'สรุปรายการตามกลุ่มงาน',
			width : 120,
			listeners : {
				click : function() {
					window.location = '/project/summary';
				}
			}
		});
		
		main.projectType = new Ext.form.field.ComboBox({
			fieldLabel: 'ประเภท',
			name : 'sumProjectType',
		    store: projects.listProjectType,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,
		    value : '*',
		    editable: false	,
		    anchor: '100%',
		     
		    labelWidth : 70,
		    blankText :'กรุณาเลือกประเภทโครงการ',
		    columnWidth: .60 ,
		    labelStyle : 'padding: 3px 0px 0px 10px'
		});
		
		main.search = new Ext.form.Panel({
			border : false,
			layout:'column',
			items : [
				{	
					layout: 'anchor',
					border : false,
					anchor: '100%',
					bodyStyle: {
					    //background: '#ffc',
					    padding: '0px 10px'
					},
		    		columnWidth: .50,
					items : [
					{
		    			layout : 'column',
		    			border : false,
		    			anchor : '100%',
		    			items : [ main.fiscalyear,main.projectType ]
		    		},main.division
		    		
					  ]
				} ,
				{	
					layout: 'anchor',
					border : false,
					anchor: '100%',
					bodyStyle: {
					    //background: '#ffc',
					    padding: '0px 10px'
					},
		    		columnWidth: .50,
					items : [  main.searchstatus,main.section ]
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
					main.search_button ,
					main.exportExcel_button
				]
			}]	
		});
		
		Ext.apply(this, {
			bodyPadding: 10,
			dockedItems: [{
            	itemId: 'toolbar',
            	xtype: 'toolbar',
            	items : [  main.menu_summary  ]
            } ],
			items : [main.search,main.gridProject,main.showChartPanel,main.showGraphBarPanel  ]  
		});
		
		projects.ListProject.superclass.initComponent.apply(this, arguments);
	}
});