Ext.namespace("dental");

dental.MainDental = Ext.extend(Ext.form.Panel,{
	autoWidth : true,
	height : 400 ,
	kpi : 1,
	initComponent: function() {
		var main = this;
		var today = new Date();
		year = Ext.Date.format(today, 'Y');
		year = parseInt(year, 10) +543;
		
		//year = parseInt(year, 10) +1; //next 1 year 
		
		 
		
		main.listShow = Ext.create('Ext.grid.Panel',{
			store: dental.listSchool,
			columns: [
				new Ext.grid.RowNumberer(),
				{header: 'รายการ',width: 230,  dataIndex: 'name'} 
		    ] ,
		    flex: 1, 
		    selType: 'rowmodel',
		    plugins: [
		        Ext.create('Ext.grid.plugin.CellEditing', {
		            clicksToEdit: 1
		        })
		    ],
		    listeners:{
		         scope: this,
		         'select': function( model, record,   index,   eOpts ){
		    		//debugger;
		    		schoollist = record.data.id;
		         	kpigroup = main.kpi;
		         	fiscalyear= main.fiscalyear.getValue();
		         	
		         	dental.listkpi.schoollist = schoollist;
		         	dental.listkpi.kpigroup = kpigroup;
		         	dental.listkpi.fiscalyear = fiscalyear;
		         	
		         	dental.listkpi.load({
		         		params : {
		         			fiscalyear : fiscalyear,
		         			schoollist : schoollist,
		         			kpigroup: kpigroup
		         		}
		         	});
		         	 
		    	} 
            } 
				    
		
		});
		
		 
		main.fiscalyear = new Ext.form.field.Number({
			//anchor: '40%',
	        name: 'fiscal_year',
	        fieldLabel: 'ปีงบประมาณ',
	        value : year,
	        maxValue: 2600,
        	minValue: 2553	,
        	columnWidth: .40			
		});
		 
		main.save = new Ext.Button({
			text     : 'บันทึก',
			width : 120,
			listeners: {
		        click: function() {
		            //this == the button, as we are in the local scope
		           // this.setText('I was clicked!');
		          // main.getForm().submit({
		          // });
		          //dental.listkpi.sync();
		          
		          
		          
		          
		          
		           dental.listkpi.save();
		        }
		    }
		 });
		          
		
		main.gridPanel = new Ext.grid.Panel({
			store: dental.listkpi,
			height : 300,
			flex: 2, 
			columns: [
			 	
				{header: 'รายการ',width: 400,  dataIndex: 'name'},
		        {header: 'ผลงาน',width: 100,  dataIndex: 'value',
		            field: {
		                xtype: 'textfield',
		                allowBlank: false
		            }
				} 
		        
		    ] ,
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
			items : [     main.save ] 
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
			  
			items : [main.control  ,main.select ]  
		});
		
		dental.MainDental.superclass.initComponent.apply(this, arguments);
	}
});
  
dental.ViewSchoolDental = Ext.extend(Ext.form.Panel,{
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
			store: dental.viewschoolkpiStore,	
			height : 700 ,	 
		 	columnLines: false,
			columns: [
			 	new Ext.grid.RowNumberer(),
				{text: 'รายการ',width: 250,  dataIndex: 'name',renderer : main.currentName},
		        {text: 'ร้อยละของเด็กอายุ 12 ปีไม่มีเหงือกเลือดออก',width: 200,  dataIndex: 'sortkpi1'  },// ,renderer : main.showOverRate  } ,
		        {text: 'ร้อยละของเด็กอายุ 12 ปีปราศจากโรคฟันผุ',width: 200,  dataIndex: 'sortkpi2'  },//,renderer : main.showOverRate   }  ,
		        {text: 'ร้อยละของเด็กอายุ 12 ปี(ป.6) มีฟันตกกระ',width: 200,  dataIndex: 'sortkpi3' },// ,renderer : main.showMinRate   },
		        {text: 'ค่าเฉลี่ย ฟันผุ ถอน อุด(DMFT) ของเด็กอายุ 12 ปี',width: 200,  dataIndex: 'sortkpi4' } // ,renderer : main.showMinRate   }
		    ] ,
		    flex: 2,
		     viewConfig: {
            stripeRows: true
        }
		});
		
		main.search =  Ext.create('Ext.Button',{
			text     : 'แสดง',
			width : 120,
			listeners: {
		        click: function() {
		        	fiscalyear= main.fiscalyear.getValue();
		         	dental.viewschoolkpiStore.fiscalyear = fiscalyear;
		         	
		         	dental.viewschoolkpiStore.load({
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
		dental.ViewSchoolDental.superclass.initComponent.apply(this, arguments);
	}
	
});
 