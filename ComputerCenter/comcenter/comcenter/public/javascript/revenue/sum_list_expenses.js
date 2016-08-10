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

expenses.AllExpenses = Ext.extend(Ext.tab.Panel,{
	autoWidth : true,
	border : false,
	//autoHeight: true,
	//height : 800 ,
	initComponent: function() {
		
		var listExpenses = new expenses.SumListExpenses({
			title : 'รายจ่ายประมาณการ' 
		});
		var dailyExpenses = new expenses.ExpensesDaily ({
			title : 'รายจ่ายรายวัน'
			
		});
		Ext.apply(this, {
			 
			items : [listExpenses,dailyExpenses]  
		});
		expenses.AllExpenses.superclass.initComponent.apply(this, arguments);
	}
});