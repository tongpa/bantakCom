 
Ext.namespace("dental");

dental.MainSenior = Ext.extend(Ext.form.Panel,{
	autoWidth : true,
	height : 400 ,
	initComponent: function() {
		var main = this;
		var today = new Date();
		year = Ext.Date.format(today, 'Y');
		year = parseInt(year, 10) +543;
		
		//year = parseInt(year, 10) +1; //next 1 year 
		
		
		
		 
		main.listShow = Ext.create('Ext.grid.Panel',{
			store: dental.listSeniorClub,
			columns: [
			 	new Ext.grid.RowNumberer(),
				{header: 'รายการ',width: 230,  dataIndex: 'name'} 
		        
		    ] ,
		    flex: 1, 
		    selType: 'cellmodel',
		    plugins: [
		        Ext.create('Ext.grid.plugin.CellEditing', {
		            clicksToEdit: 1
		        })
		    ],
		    listeners:{
		         scope: this,
		         'select': function( model, record,   index,   eOpts ){
		    		//debugger;
		    		seniorclub = record.data.id;
		         	fiscalyear= main.fiscalyear.getValue();
		         	
		         	 
		         	dental.listseniorkpi.seniorclub = seniorclub;
		         	dental.listseniorkpi.fiscalyear = fiscalyear;
		         	
		         	dental.listseniorkpi.load({
		         		params : {
		         			fiscalyear : fiscalyear,
		         			seniorclub: seniorclub
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
		            
		           dental.listseniorkpi.save();
		        }
		    }
		 });
		          
		
		main.gridPanel = Ext.create('Ext.grid.Panel', { 
			store: dental.listseniorkpi,
			 
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
		
		dental.MainSenior.superclass.initComponent.apply(this, arguments);
	}
});
 
dental.ViewSeniorClub = Ext.extend(Ext.form.Panel,{
	autoWidth : true,
	height : 800 ,
	currentName : function (value,cell,record){
	 	return '<span style="font-size:15px">' + value + '</span>';
	},
	showOverRate : function (value, cell, record){	
		valuekpi = value;
		icon = getImage(valuekpi);
		 return '<img src="' + icon + '"  height="18" width="96">';	 
	},
	showMinRate : function (value, cell, record){	
		valuekpi = 100 - value;
		icon = getImage(valuekpi);
		 return '<img src="' + icon + '"  height="18" width="96">';	 
	},
	
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
			store: dental.viewsenoirkpiStore,	
			height : 700 ,	 
			columns: [
			 	new Ext.grid.RowNumberer(),
				{header: 'รายการ',width: 220,  dataIndex: 'name',renderer : main.currentName},
		        {header: 'คู่สบฟันหลังเป็นฟันแท้กับฟันแท้ 4 คู่ขึ้นไป',width: 200,  dataIndex: 'sortkpi1' },// ,renderer : main.showOverRate  } ,
		        {header: 'คู่สบฟันหลังเป็นฟันแท้กับฟันเทียมหรือฟันเทียมกับฟันเทียม 4 คู่ขึ้นไป',width: 200,  dataIndex: 'sortkpi2' },// ,renderer : main.showOverRate   }  ,
		        {header: 'มีฟันแท้ใช้งานได้ 20 ซี่',width: 200,  dataIndex: 'sortkpi3' } // ,renderer : main.showOverRate   } 
		         
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
		         	dental.viewsenoirkpiStore.fiscalyear = fiscalyear;
		         	
		         	dental.viewsenoirkpiStore.load({
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
		dental.ViewSeniorClub.superclass.initComponent.apply(this, arguments);
	}
	
});
		 