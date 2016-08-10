Ext.namespace("projects");
Ext.namespace("maintenance");
Ext.namespace("revenue");
Ext.namespace("expenses");

expenses.AddExpenses = Ext.extend(Ext.form.Panel,{
	fromedit : false, 
	width : 490,
	height : 500 ,
	fromWin : null,
	fromMain : null,
	currentRecord : null,
	setFormEdit : function(visible){
	},
	setFormEdit: function(visible){
	},
	
	setLoadData : function(record){
		
		groupId = record.data.expenses_list;
     	if(groupId != 0){ 
     		if(this.currentRecord == null  || groupId != this.currentRecord.data.expenses_list){ 
     			expenses.listsSubDetailExpenses.load({
	         		params : {
	         			groupId : groupId
	         		},
	         		scope   : this,
	    			callback: function(records, operation, success) {
	    				this.getForm().loadRecord(record);
	    			
	    			}
	         	});
	         }
         }
		
		this.getForm().loadRecord(record);
		this.currentRecord = record;
		/*if(record.data.plantype_id == 1) 
		{
			this.inPlan.setValue(true);
			this.outPlan.setValue(false);
		}
		else{
			this.inPlan.setValue(false);
			this.outPlan.setValue(true);
		}*/
		//debugger;
		
	},
	initComponent: function( ) {
		var main = this;
		
		var today = new Date();
		/*var offset = 7;//bangkok 
		utc = today.getTime() + (today.getTimezoneOffset() * 60000);
		nd = new Date(utc + (3600000*offset)); //nd.toLocaleString()*/
		
		year = Ext.Date.format(today, 'Y');
		year = parseInt(year, 10) +543;
		
		year = parseInt(year, 10) +1; //next 1 year 
		
		main.expensesId = new Ext.form.field.Hidden({
			name : 'expenses_id',
			anchor:'100%',
			value : ''
		});
		
		main.fiscalyear = new Ext.form.field.Number({
			anchor: '50%',
	        name: 'fiscal_year',
	        fieldLabel: 'ปีงบประมาณ',
	        value : year,
	        maxValue: 2600,
        	minValue: 2553				
		});
		
		main.estimate = new Ext.form.field.Number({
			anchor: '50%',
	        name: 'estimate',
	        fieldLabel: 'เงินประมาณการ',
	        hideTrigger: true,
	        keyNavEnabled: false,
	        mouseWheelEnabled: false,
	        value : 0				
		});
		
		
		main.expensesList = new Ext.form.field.ComboBox({
			fieldLabel: 'รายการ',
			name : 'expenses_list',
		    store:  expenses.listDetailExpenses,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,
		    value : '*',
		    editable: false	,
		    anchor: '100%',
		    allowBlank: false, 
		    blankText :'กรุณาเลือกรายการ',
		    listeners:{
		         scope: this,
		         'select': function (  field,   value,   options ){
		         	main.expensesSubList.reset();
		          
		         	main.income_other.setDisabled(true);
		         	main.income_other.reset();
		         	
		         	groupId = value[0].data.id;
		         	if(groupId != 0){ 
		         	 
		         		expenses.listsSubDetailExpenses.load({
			         		params : {
			         			groupId : groupId
			         		}
			         	});
			         }
			         else{
			         	field.setValue("");
			         }
			         
		         	 
		         }
		    }
		});
		
		main.expensesSubList = new Ext.form.field.ComboBox({
			fieldLabel: 'รายการย่อย',
			name : 'expenses_sub_list',
		    store: expenses.listsSubDetailExpenses,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,
		    value : '*',
		    editable: false	,
		    anchor: '100%',
		    allowBlank: false, 
		    blankText :'กรุณาเลือกรายการย่อย',
		    listeners:{
		         scope: this,
		         'select': function (  field,   value,   options ){
		         	 
		         	//debugger;
		         	other = value[0].data.other;
		         	id = value[0].data.id;
		         	main.income_other.setDisabled(true);
		         	//main.income_other.reset();
		          
		         	if(other == 1){
		         	  
		         		main.income_other.setDisabled(false);
		         		
		         	}
		         	
		         	if(id == 0)
		         	{
		         		field.setValue("");
		         	}
		         	 
		         }
		    }
		});
		
		main.detail = new Ext.form.field.TextArea({
			grow      : true,
	        name      : 'detail',
	        fieldLabel: 'รายละเอียด',
	        anchor    : '100%'
				
		});
		
		main.income_other = new Ext.form.field.TextArea({
			grow      : false,
	        name      : 'income_other',
	        fieldLabel: 'จาก',
	        allowBlank: false, 
	        disabled  : true,
	        anchor    : '100%',
	        growMin :30, 
	        growMax :60,
	        height : 30,
			blankText :'กรุณากรอก ที่มาของรายได้'
				
		});
		
		main.close = new Ext.Button({
			text : 'ปิด',
			width : 120,
			listeners : {
				click : function (){
					if( main.fromWin != null ){
						 
						main.fromWin.hide();
						
					}
				}
			}
		});
		
		main.save = new Ext.Button({
			text     : 'บันทึก',
			width : 120,
			listeners: {
		        click: function() {
		            //this == the button, as we are in the local scope
		           // this.setText('I was clicked!');
		           main.getForm().submit({
		                url: '/expenses/createExpenses',
		                waitMsg: 'Please waiting...',
		                success: function(fp1, o) {
		                	//alert("success");
		                	//o.result.message
		                	//debugger;
		                	Ext.Msg.alert('บันทึก', 'บันทึกเสร็จเรียบร้อย.' );
		                	main.getForm().reset();
		                	if( main.fromWin != null ){
								main.fromWin.hide();
							}
							if(main.fromMain != null){
								main.fromMain.loadDataSearch();
							}
							//projects.listProjectStore.reload();
				       	}
			       }); 
			     }  
		      
		    }
					
		});
		Ext.apply(this, {
			bodyPadding: 10 ,
			items : [
				main.expensesId, 
				main.fiscalyear,
				main.expensesList,
				main.expensesSubList,
				main.income_other,
				main.estimate,
				main.detail
			],
			dockedItems :[{
				xtype :'toolbar',
				dock : 'bottom',
				ui : 'footer',
				layout : {
					pack : 'center'
				},
				items : [
					  main.save,main.close
				]
			}]	   
			  
		});
		expenses.AddExpenses.superclass.initComponent.apply(this, arguments);
	}

 });