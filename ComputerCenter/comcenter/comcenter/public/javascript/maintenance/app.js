Ext.application({
    name: 'maintenance',
    launch: function() {
        var mam = new maintenance.AddMaintanance({
        	renderTo : 'maintenance-app',
        }); 
         
    }
});
Ext.namespace("maintenance");



maintenance.AddMaintanance = Ext.extend(Ext.form.Panel,{
	title : 'แบบฟอร์มการแจ้งซ่อม',
	 
	width : 500,
	height : 400 ,
	initComponent: function() {
		main = this;
		userName = new Ext.form.field.Text({
			name:'user_name',
			fieldLabel : 'ผู้แจ้งซ่อม',
			allowBlank: false
		});
		
		detail = new Ext.form.field.TextArea({
			grow      : true,
	        name      : 'detail',
	        fieldLabel: 'รายละเอียด',
	        anchor    : '100%'
				
		});
		
		maintainType = new Ext.form.field.ComboBox({
			fieldLabel: 'หัวข้อ',
			name : 'maintainType',
		    store: maintenance.listType,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,
		    value : '*',
		    editable: false	
		});
		
		division= new Ext.form.field.ComboBox({
			fieldLabel: 'แผนก/ฝ่าย',
			name : 'division', 
		    store: maintenance.listDivision,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,
		    value : '*',
		    editable: false	
		});
		
		save = new Ext.Button({
			text     : 'บันทึก',
			listeners: {
		        click: function() {
		            //this == the button, as we are in the local scope
		           // this.setText('I was clicked!');
		           main.getForm().submit({
		                url: '/maintenance/createMaintain',
		                waitMsg: 'Please waiting...',
		                success: function(fp1, o) {
				       	}
			       }); 
			     }  
		       /*, mouseover: function() {
		            //set a new config which says we moused over, if not already set
		            if (!this.mousedOver) {
		                this.mousedOver = true;
		                alert('You moused over a button!\n\nI wont do this again.');
		            }
		        }*/
		    }
					
		});
		
		Ext.apply(this, {
			bodyPadding: 10,
			 
			items : [userName,division,maintainType,detail ],
			dockedItems :[{
				xtype :'toolbar',
				dock : 'bottom',
				ui : 'footer',
				layout : {
					pack : 'center'
				},
				items : [
					save
				]
			}]	 
		});
		maintenance.AddMaintanance.superclass.initComponent.apply(this, arguments);
	}
	
	/*
	items :[
		{
			xtype: 'datefield',
	        anchor: '100%',
	        fieldLabel: 'From',
	        name: 'from_date',
	        maxValue: new Date() 
		
		}
	]*/
});