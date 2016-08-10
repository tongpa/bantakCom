Ext.namespace("projects");
﻿Ext.namespace("revenue"); 

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
	//height : 800 ,
	initComponent: function() {
		
		var listRevenue = new revenue.SumListRevenue({
			title : 'รายรับประมาณการ' 
		});
		var dailyRevenue = new revenue.RevenueDaily ({
			title : 'รายรับรายวัน'
			
		});
		Ext.apply(this, {
			 
			items : [listRevenue,dailyRevenue]  
		});
		revenue.AllRevenue.superclass.initComponent.apply(this, arguments);
	}
});