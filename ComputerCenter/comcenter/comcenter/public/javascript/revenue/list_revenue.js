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
revenue.gridListRevenue = Ext.extend(Ext.grid.Panel,{
	store: Ext.data.StoreManager.lookup('listSearchRevenue'),
	  
	columns: [
		{header: 'หมวดรายการ', width : 260, dataIndex: 'revenue_list_name'},  
        {header: 'รายการย่อย',width : 360,  dataIndex: 'revenue_sub_list_name',  }, 
		{header: 'เงินประมาณ',width : 100,align: 'right', dataIndex: 'estimate' ,renderer : currentBudget   }  
        
    ] 
	
	
});



revenue.ListRevenue = Ext.extend(Ext.form.Panel,{
	//title:'แสดงรายการโครงการ',
	autoWidth : true,
	//autoHeight: true,
	height : 800 ,
	loadDataSearch : function(){
		
		
		
		
		fiscalyear = this.fiscalyear.getValue();
		revenue_list = this.revenueList.getValue();
		revenue_sub_list = this.revenueSubList.getValue();
		revenue.listSearchRevenue.load({
			params:{
				start : 0,
				limit :  25,
		 		fiscalyear: fiscalyear,
		 		revenue_list : revenue_list,
		 		revenue_sub_list : revenue_sub_list 
       		}
		});//.sort('revenue_list_id', 'ASC');
		
		 
	}, 
	initComponent: function() {
		var main = this;
		
		var today = new Date();
		year = Ext.Date.format(today, 'Y');
		year = parseInt(year, 10) +543;
		
		year = parseInt(year, 10) +1; //next 1 year 
		
		main.editRevenue= new revenue.AddRevenue( );
		
		main.showRevenue = new Ext.window.Window({
			width : 500,
			height : 550 ,
		    layout: 'fit',
		    closeAction : 'hide' ,
		    plain : true,
		    modal : true,
		    items : [main.editRevenue]
		});
		main.editRevenue.fromWin = main.showRevenue;
		main.editRevenue.fromMain = main;
		main.gridlist = new revenue.gridListRevenue ({
			height : 800 , 
			listeners: {
                selectionchange: function(model, records) {
                    if (records[0]) {
                        //this.up('form').getForm().loadRecord(records[0]);
                       	main.showRevenue.show();
                        main.editRevenue.setFormEdit(true);
                        main.editRevenue.setLoadData(records[0]);
                         
                        
                       
                    }
                }
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
		         	groupId = value[0].data.id;
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
			         }
		         }
		    }
		});
		
		main.revenueSubList = new Ext.form.field.ComboBox({
			fieldLabel: 'รายการย่อย',
			name : 'revenueSubList',
		    store: revenue.listsSubDetail,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,
		    value : '*',
		    editable: false	,
		    anchor: '100%',
		    allowBlank: true, 
		    
		    blankText :'กรุณาเลือกรายการย่อย' 
		});
		
		main.addRevenueBtn = new Ext.Button({
			text : 'เพิ่ม รายการ',
			width : 120,
			listeners : {
				click : function(){
					//alert("เพิ่มรายหาร");
					main.editRevenue.setFormEdit(false);
					main.editRevenue.getForm().reset();
					main.showRevenue.show(); 
					 
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
		
		main.menu_RevenueBtn = Ext.create('Ext.menu.Menu', {
	        id: 'mainMenu',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [
	              '-', {
	                text: 'Radio Options',
	                menu: {        // <-- submenu by nested config object
	                    items: [
	                        // stick any markup in a menu
	                        '<b class="menu-title">Choose a Theme</b>',
	                        {
	                            text: 'Aero Glass',
	                            checked: true,
	                            group: 'theme' 
	                        }, {
	                            text: 'Vista Black',
	                            checked: false,
	                            group: 'theme' 
	                        }, {
	                            text: 'Gray Theme',
	                            checked: false,
	                            group: 'theme' 
	                        }, {
	                            text: 'Default Theme',
	                            checked: false,
	                            group: 'theme' 
	                        }
	                    ]
	                }
	           },{
	               text: 'Choose a Date',
	               iconCls: 'calendar' 
	               
	           },{
	               text: 'Choose a Color' 
	           }
	        ]
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
			 	} ,
			 	{
			 		layout: 'anchor',
					border : false,
					 
					bodyStyle: {
					    //background: '#ffc',
					    padding: '0px 10px'
					},
		    		columnWidth: .35,
		    		items : [ main.revenueSubList ]
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
					main.addRevenueBtn, 
					main.search_button
				]
			}]	
		});
		
		Ext.apply(this, {
			bodyPadding: 10,
			autoHeight : true,
			border : false,
			items : [main.search ,main.gridlist]  
		});
		
		revenue.ListRevenue.superclass.initComponent.apply(this, arguments);
	}
});

revenue.RevenueDaily = Ext.extend(Ext.form.Panel,{
	autoWidth : true,
	height : 800,
	border : false,
	initComponent : function(){
	
		revenue.RevenueDaily.superclass.initComponent.apply(this, arguments);
	}

});

revenue.AllRevenue = Ext.extend(Ext.tab.Panel,{
	autoWidth : true,
	border : false,
	//autoHeight: true,
	height : 800 ,
	initComponent: function() {
		
		var listRevenue = new revenue.ListRevenue({
			title : 'เพิ่ม/ลบรายรับประมาณการ',
			height : 800 
		});
		
		var estimateRevenue  = new  revenue.SumListRevenue({
        	title : 'สรุปรายรับประมาณการ' ,
			height : 1500  
		    
		    
		});
		var estimate = new Ext.tab.Panel({
			autoWidth : true,
			autoHeight : true,
			title : 'รายรับประมาณการ',
			items : [
				listRevenue,estimateRevenue
			]
		});
		
		
		var dailyRevenue = new revenue.RevenueDaily ({
			title : 'รายรับรายวัน'
			
		});
		Ext.apply(this, {
			 
			items : [estimate,dailyRevenue]  
		});
		revenue.AllRevenue.superclass.initComponent.apply(this, arguments);
	}
});

