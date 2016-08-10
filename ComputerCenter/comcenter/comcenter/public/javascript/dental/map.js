 
Ext.namespace("dental");

dental.MainChildDev = Ext.extend(Ext.form.Panel,{
	autoWidth : true,
	height : 400 ,
	initComponent: function() {
		var main = this;
		var today = new Date();
		year = Ext.Date.format(today, 'Y');
		year = parseInt(year, 10) +543;
		
		//year = parseInt(year, 10) +1; //next 1 year 
		
		
		
		 
		main.listShow = Ext.create('Ext.grid.Panel',{
			store: dental.listChildDev,
			columns: [
			 	new Ext.grid.RowNumberer(),
				{header: 'รายการ',width: 230,  dataIndex: 'name'} 
		    ] ,
		    flex: 1, 
		    selType: 'rowmodel',
		     
		    listeners:{
		         scope: this,
		         'select': function( model, record,   index,   eOpts ){
		    		//debugger;
		    		childdev = record.data.id;
		         	fiscalyear= main.fiscalyear.getValue();
		         	
		         	 
		         	dental.listchilddevkpi.childdev = childdev;
		         	dental.listchilddevkpi.fiscalyear = fiscalyear;
		         	
		         	dental.listchilddevkpi.load({
		         		params : {
		         			fiscalyear : fiscalyear,
		         			childdev: childdev
		         		}
		         	});
		    	} 
            } 
				    
		
		});
		
		
		 
		main.fiscalyear = Ext.create('Ext.form.field.Number',{
			//anchor: '40%',
	        name: 'fiscal_year',
	        fieldLabel: 'ปีงบประมาณ',
	        value : year,
	        maxValue: 2600,
        	minValue: 2553	,
        	columnWidth: .40			
		});
		
		main.save =  Ext.create('Ext.Button',{
			text     : 'บันทึก',
			iconCls: 'icon-save',
			width : 120,
			listeners: {
		        click: function() {
		            //this == the button, as we are in the local scope
		           // this.setText('I was clicked!');
		          // main.getForm().submit({
		          // });
		          //dental.listkpi.sync();
		            
		           dental.listchilddevkpi.save();
		        }
		    }
		 });
		          
		
		main.gridPanel = Ext.create('Ext.grid.Panel', { 
			store: dental.listchilddevkpi,
			 
			columns: [
			 
				{header: 'รายการ',width: 400,  dataIndex: 'name'},
		        {header: 'ผลงาน',width: 100,  dataIndex: 'value',
		            field: {
		                xtype: 'textfield',
		                allowBlank: false
		            }
				} 
		    ] ,
		    flex: 2,
		    selType: 'cellmodel',
		    plugins: [
		        Ext.create('Ext.grid.plugin.CellEditing', {
		            clicksToEdit: 1
		        })
		    ]
				    
		
		});
		
		main.btncontrol = Ext.create('Ext.Panel',{
			border : false,
			height: 30,
			autoWidth : true,
			flex: 2, 
			layout : {
				type : 'hbox',
				pack:'end',
               	align:'middle'
			},
			items : [    main.save ] 
		});
		
		main.control = Ext.create('Ext.Panel',{
			border : false,
			height : 30,
			 autoWidth : true,
			layout : {
				 type: 'hbox',
        		align: 'stretch',
		        padding: 0
			},
			 defaults:{margins:'0 5 5 0'},
			items : [main.fiscalyear ,main.btncontrol ] 
		
		});
		main.select = Ext.create('Ext.Panel', {
			border : false,
			height : 300,
			autoWidth : true,
			layout : {
				 type: 'hbox',
        		align: 'stretch',
		        padding: 0
			},
			 defaults:{margins:'0 5 0 0'},
			items : [main.listShow, main.gridPanel ]
		});
		
		Ext.apply(this, {
			bodyPadding: 10,
			  
			items : [main.control,main.select]  
		});
		
		dental.MainChildDev.superclass.initComponent.apply(this, arguments);
	}
});

function currentName(value,cell,record){
	 return '<span style="font-size:15px">' + value + '</span>';
}

function currentShowRate1 (value, cell, record){

	valuekpi = record.data.sortkpi1;
	icon = getImage(valuekpi);
	 return '<img src="' + icon + '">';

	 
}
function currentShowRate2 (value, cell, record){

	valuekpi = 100- record.data.sortkpi2;
	icon = getImage(valuekpi);
	 return '<img src="' + icon + '">';

	 
}
/*
 
function currentShowRate3 (value, cell, record){

	valuekpi =  record.data.sortkpi2;
	icon = '';
	if(valuekpi > 90 && valuekpi <=100)
	{	icon = '/images/rates/01.png';}
	else{
		if(valuekpi  > 80 && valuekpi <=90)
		{	icon = '/images/rates/02.png';}
		else{
			if(valuekpi >70 && valuekpi <=80)
			{	icon = '/images/rates/03.png';}
			else{
				if(valuekpi >60 && valuekpi <=70)
				{	icon = '/images/rates/04.png';}
				else{
					if(valuekpi >50 && valuekpi <=60)
					{	icon = '/images/rates/05.png';}
					else{
						if(valuekpi >40 && valuekpi <=50)
						{	icon = '/images/rates/06.png';}
						else{
							if(valuekpi >30 && valuekpi <=40)
							{	icon = '/images/rates/07.png';}
							else{
								if(valuekpi >20 && valuekpi <=30)
								{	icon = '/images/rates/08.png';}
								else{
									if(valuekpi >10 && valuekpi <=20)
									{	icon = '/images/rates/09.png';}
									else{
										if(valuekpi >0 && valuekpi <=10)
										{	icon = '/images/rates/10.png';}
										else{
											icon = '/images/rates/00.png'; 
										}
									}
								}
							}
						}
					}
				}
			}
		}	
	}
	 return '<img src="' + icon + '">';

	 
}*/

function getImage(valuekpi){
	icon = '';
	if(valuekpi >=0 && valuekpi <=10)
	{	icon = '/images/rates/01.png';}
	else{
		if(valuekpi >10 && valuekpi <=20)
		{	icon = '/images/rates/02.png';}
		else{
			if(valuekpi >20 && valuekpi <=30)
			{	icon = '/images/rates/03.png';}
			else{
				if(valuekpi >30 && valuekpi <=40)
				{	icon = '/images/rates/04.png';}
				else{
					if(valuekpi >40 && valuekpi <=50)
					{	icon = '/images/rates/05.png';}
					else{
						if(valuekpi >50 && valuekpi <=60)
						{	icon = '/images/rates/06.png';}
						else{
							if(valuekpi >60 && valuekpi <=70)
							{	icon = '/images/rates/07.png';}
							else{
								if(valuekpi >70 && valuekpi <=80)
								{	icon = '/images/rates/08.png';}
								else{
									if(valuekpi >80 && valuekpi <=90)
									{	icon = '/images/rates/09.png';}
									else{
										if(valuekpi >90 && valuekpi <=100)
										{	icon = '/images/rates/10.png';}
										else{
											icon = '/images/rates/00.png'; 
										}
									}
								}
							}
						}
					}
				}
			}
		}	
	}
	return icon;
}
 
dental.ViewChildDev = Ext.extend(Ext.form.Panel,{
	autoWidth : true,
	height : 650 ,
	initComponent: function() {
		var main = this;
		var today = new Date();
		year = Ext.Date.format(today, 'Y');
		year = parseInt(year, 10) +543;
		
		main.fiscalyear = Ext.create('Ext.form.field.Number',{
			//anchor: '40%',
	        name: 'fiscal_year',
	        fieldLabel: 'ปีงบประมาณ',
	        value : year,
	        maxValue: 2600,
        	minValue: 2553	,
        	columnWidth: .40			
		});
		
		main.gridPanel = Ext.create('Ext.grid.Panel', { 
			store: dental.viewchildkpiStore,			 
			columns: [
			 	new Ext.grid.RowNumberer(),
				{header: 'รายการ',width: 400,  dataIndex: 'name',renderer : currentName},
		        {header: 'ร้อยละเด็กอายุ 3 ปีปราศจากโรคฟันผุ',width: 200,  dataIndex: 'kpi1' ,renderer : currentShowRate1  } ,
		        {header: 'ค่าเฉลี่ย ฟันผุ ถอน อุด(DMFT)',width: 200,  dataIndex: 'kpi2',renderer : currentShowRate2   }  
		    ] ,
		    flex: 2,
		    selType: 'rowmodel' 
		});
		
		main.search =  Ext.create('Ext.Button',{
			text     : 'แสดง',
			width : 120,
			listeners: {
		        click: function() {
		        	fiscalyear= main.fiscalyear.getValue();
		         	dental.viewchildkpiStore.fiscalyear = fiscalyear;
		         	
		         	dental.viewchildkpiStore.load({
		         		params : {
		         			fiscalyear : fiscalyear 
		         		}
		         	});
		        }
		    }
		 });
		
		main.btncontrol = Ext.create('Ext.Panel',{
			border : false,
			height: 30,
			autoWidth : true,
			flex: 2, 
			layout : {
				type : 'hbox',
				pack:'end',
               	align:'middle'
			},
			items : [    main.search ] 
		});
		main.control = Ext.create('Ext.Panel',{
			border : false,
			height : 30,
			 autoWidth : true,
			layout : {
				 type: 'hbox',
        		align: 'stretch',
		        padding: 0
			},
			 defaults:{margins:'0 5 5 0'},
			items : [main.fiscalyear ,main.btncontrol ] 
		
		});
		Ext.apply(this, {
			bodyPadding: 10,
			  
			items : [main.control,main.gridPanel]  
		});
		
		dental.ViewChildDev.superclass.initComponent.apply(this, arguments);
	}
});
 