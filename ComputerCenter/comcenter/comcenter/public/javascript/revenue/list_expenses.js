Ext.namespace("projects");
﻿Ext.namespace("expenses"); 

expenses.ExpensesDaily = Ext.extend(Ext.form.Panel,{
	autoWidth : true,
	height : 800,
	border : false,
	initComponent : function(){
	
		expenses.ExpensesDaily.superclass.initComponent.apply(this, arguments);
	}

});

expenses.gridListExpenses = Ext.extend(Ext.grid.Panel,{
	store: expenses.listSearchExpenses,
	  
	columns: [
		{header: 'หมวดรายการ', width : 260, dataIndex: 'expenses_list_name'},  
        {header: 'รายการย่อย',width : 360,  dataIndex: 'expenses_sub_list_name',  }, 
		{header: 'เงินประมาณ',width : 100,align: 'right', dataIndex: 'estimate' ,renderer : currentBudget   }  
        
    ] 
	
	
});

expenses.ListExpenses = Ext.extend(Ext.form.Panel,{
	//title:'แสดงรายการโครงการ',
	autoWidth : true,
	//autoHeight: true,
	height : 800 ,
	loadDataSearch : function(){
		
		 
		
		
		fiscalyear = this.fiscalyear.getValue();
		expenses_list = this.expensesList.getValue();
		expenses_sub_list = this.expensesSubList.getValue();
		expenses.listSearchExpenses.load({
			params:{
				start : 0,
				limit :  25,
		 		fiscalyear: fiscalyear,
		 		expenses_list : expenses_list,
		 		expenses_sub_list : expenses_sub_list 
       		}
		});//.sort('revenue_list_id', 'ASC');
		 
		 
	}, 
	initComponent: function() {
		var main = this;
		
		var today = new Date();
		year = Ext.Date.format(today, 'Y');
		year = parseInt(year, 10) +543;
		
		year = parseInt(year, 10) +1; //next 1 year 
		 
		main.editExpenses= new expenses.AddExpenses( );
		
		main.showExpenses = new Ext.window.Window({
			width : 500,
			height : 550 ,
		    layout: 'fit',
		    closeAction : 'hide' ,
		    plain : true,
		    modal : true,
		    items : [main.editExpenses]
		});
		  
		main.editExpenses.fromWin = main.showExpenses;
		main.editExpenses.fromMain = main;
		main.gridlist = new expenses.gridListExpenses ({
			height : 800 , 
			listeners: {
                selectionchange: function(model, records) {
                    if (records[0]) {
                        this.up('form').getForm().loadRecord(records[0]);
                       	main.showExpenses.show();
                        main.editExpenses.setFormEdit(true);
                        main.editExpenses.setLoadData(records[0]);
                         
                        
                       
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
	 
		main.expensesList = new Ext.form.field.ComboBox({
			fieldLabel: 'รายการ',
			name : 'expensesList',
		    store:  expenses.listDetailExpenses,
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
		         	main.expensesSubList.reset();
		         	main.expensesSubList.setDisabled(false);
		         	if(groupId != 0){
			         
		         		expenses.listsSubDetailExpenses.load({
			         		params : {
			         			groupId : groupId
			         		}
			         	});
		         	 }
		         	 else {
			         	main.expensesSubList.setDisabled(true);
			         } 
		         }
		    }
		});
		
		main.expensesSubList = new Ext.form.field.ComboBox({
			fieldLabel: 'รายการย่อย',
			name : 'expensesSubList',
		    store: expenses.listsSubDetailExpenses,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,
		    value : '*',
		    editable: false	,
		    anchor: '100%',
		    allowBlank: true, 
		    
		    blankText :'กรุณาเลือกรายการย่อย' 
		});
	 
		main.addExpensesBtn = new Ext.Button({
			text : 'เพิ่ม รายการ',
			width : 120,
			listeners : {
				click : function(){
					//alert("เพิ่มรายหาร");
					main.editExpenses.setFormEdit(false);
					main.editExpenses.getForm().reset();
					main.showExpenses.show(); 
					 
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
		
		main.menu_ExpensesBtn = Ext.create('Ext.menu.Menu', {
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
		    		columnWidth: .40 ,
		    		items : [ main.expensesList ] 
			 	} ,
			 	{
			 		layout: 'anchor',
					border : false,
					 
					bodyStyle: {
					    //background: '#ffc',
					    padding: '0px 10px'
					},
		    		columnWidth: .35 ,
		    		items : [ main.expensesSubList ] 
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
					main.addExpensesBtn, 
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
	 
		
		Ext.apply(this, {
			bodyPadding: 10,
			autoHeight : true,
			border : false 
			,items : [main.search ,main.gridlist]  
		});
		
		
		expenses.ListExpenses.superclass.initComponent.apply(this, arguments);
	}
});

expenses.AllExpenses = Ext.extend(Ext.tab.Panel,{
	 autoWidth : true,
	 
	border : false,
	//autoHeight: true,
	height : 800 ,
	initComponent: function() {
	
		var listExpenses = new expenses.ListExpenses({
			title : 'เพิ่ม/ลบรายจ่ายประมาณการ',
			height : 800 
		});
		
		var estimateExpenses  = new  expenses.SumListExpenses({
        	title : 'สรุปรายจ่ายประมาณการ' ,
			height : 1500  
		    
		    
		});
		var estimate = new Ext.tab.Panel({
			autoWidth : true,
			autoHeight : true,
			title : 'รายจ่ายประมาณการ',
			items : [
				listExpenses,estimateExpenses
			]
		});
		
		
		var dailyExpenses = new expenses.ExpensesDaily ({
			title : 'รายจ่ายรายวัน'
			
		});
		Ext.apply(this, {
			 
			items : [estimate,dailyExpenses]  
		});
		expenses.AllExpenses.superclass.initComponent.apply(this, arguments);
	}
});
