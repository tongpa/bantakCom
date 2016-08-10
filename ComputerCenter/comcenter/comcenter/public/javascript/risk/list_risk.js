Ext.namespace("risks");

Ext.apply(Ext.form.field.VTypes, {
        daterange: function(val, field) {
            var date = field.parseDate(val);

            if (!date) {
                return false;
            }
            if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                var start = field.up('form').down('#' + field.startDateField);
                start.setMaxValue(date);
                start.validate();
                this.dateRangeMax = date;
            }
            else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                var end = field.up('form').down('#' + field.endDateField);
                end.setMinValue(date);
                end.validate();
                this.dateRangeMin = date;
            }
             
            return true;
        },

        daterangeText: 'วันที่เริ่มต้นต้องน้อยกว่าวันที่สิ้นสุด'
 
    });


function showDate(value, cell, record){
	 
	return new Date(value);
}
risks.gridRisks = Ext.extend(Ext.grid.Panel,{
	store: Ext.data.StoreManager.lookup('listRiskStore'),
	columns: [
	    {header: 'risk id', dataIndex: 'risk_management_id',width : 40  },      
		 {header: 'วันที่รายงาน', dataIndex: 'report_date' ,xtype: 'datecolumn', format: 'd-m-Y'},
		{header: 'หน่วยงาน',  dataIndex: 'risk_section',width : 120},
        {header: 'ประเภท',  dataIndex: 'risk_program_group',width : 120},
        {header: 'ด้าน/โปรแกรม',align: 'right', dataIndex: 'risk_program_detail',width : 250 },
		{header: 'ระดับ',align: 'right', dataIndex: 'risk_level' ,width : 60 },
		{header: 'สถานะ',align: 'right', dataIndex: 'risk_status' }
     
        
    ] 
	
	
});


risks.listRisk = Ext.extend(Ext.form.Panel,{
//	title : 'แบบฟอร์ม',
	fromedit : false,
	autoWidth : true, 
	//width : 490,
	height : 500 ,
	fromWin: null,
	fromMain: null,
	currentRecord : null,
	loadDataSearch : function(){
		var main = this;
		startDate = main.startDate.getValue() ;
		        	
		        	
    	stopDate = main.stopDate.getValue() ;
    	riskSection = main.riskSection.getValue();
    	riskProgramGroup = main.riskProgramGroup.getValue();
    	riskStatus = main.riskStatus.getValue();
    	riskProgramDetail = main.riskProgramDetail.getValue();
    	searchJobId = main.searchJobId.getValue();
    	 
        risks.listRiskStore.load({
        	params : {
     			startDate : startDate,
     			stopDate : stopDate,
     			riskSection : riskSection,
     			riskProgramGroup : riskProgramGroup,
     			riskStatus : riskStatus,
     			riskProgramDetail : riskProgramDetail,
     			riskJobId : searchJobId
     		}
        });
	}, 
	initComponent: function( ) {
		var main = this;
		
		main.showRiskManage = new risks.AddRisk ( );
		
		main.showProject = new Ext.window.Window({
			width : 800,
			height : 550 ,
		    layout: 'fit',
		    closeAction : 'hide' ,
		    plain : true,
		    modal : true,
		    items : [main.showRiskManage]
		});
		
		main.showRiskManage.fromWin = main.showProject;
		main.showRiskManage.fromMain = main;
		
		main.startDate = new Ext.form.field.Date({
			fieldLabel : 'วันที่เริ่ม',
			name: 'startdt',
            id: 'startdt',
            vtype: 'daterange',
            format: 'd/m/Y',
            endDateField: 'enddt'
		});
		main.stopDate  = new Ext.form.field.Date({
			fieldLabel : 'วันที่สิ้นสุด',
			name: 'enddt',
            id: 'enddt',
            vtype: 'daterange',
            format: 'd/m/Y',
            startDateField: 'startdt'
		}); 
		
		
		main.riskGrid = new risks.gridRisks({
			title : 'รายงานอุบัติการณ์',
			height : 400,
			listeners: {
                selectionchange: function(model, records) {
                    if (records[0]) {
                        //this.up('form').getForm().loadRecord(records[0]);
                        main.showProject.show();
                       // main.showRiskManage.setFormEdit(true);
                        main.showRiskManage.setLoadData(records[0]);
                        
                        main.riskGrid.getSelectionModel().deselectAll();
                       
                    }
                }
            }
		});
		 
		
		main.riskStatus = new Ext.form.field.ComboBox({
			fieldLabel: 'สถานะ',
			name : 'risk_level',
		    store: risks.listRiskStatus,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,		     
		    editable: false	,
		    anchor: '100%',
		    allowBlank: true, 
		    value : 1,
		    blankText :'กรุณาเลือกสถานะ' 
		});
		
		main.riskSection = new Ext.form.field.ComboBox({
			fieldLabel: 'หน่วยงาน',
			name : 'risk_section',
		    store: risks.listRiskSection,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,		     
		    editable: true	,
		    anchor: '100%',
		    width : 300,
		    allowBlank: true, 
		    blankText :'กรุณาเลือกหน่วยงานที่รายงาน' 
		});
		
		main.riskProgramGroup = new Ext.form.field.ComboBox({
			fieldLabel: 'ประเภท',
			name : 'risk_program_group',
		    store: risks.listProgramGroup,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,		     
		    editable: false	,
		    anchor: '100%',
		    allowBlank: true, 
		    blankText :'กรุณาเลือกประเภท',
		    listeners:{
		         scope: this,
		         'select': function (  field,   value,   options ){
		         	main.riskProgramDetail.reset();
		         	division = value[0].data.id;
		         	risks.listProgramDetail.load({
		         		params : {
		         			 risk_program_group_id : division
		         		}
		         	});
		         	 
		         }
		    }
		}); 
				 
		
		main.riskProgramDetail = new Ext.form.field.ComboBox({
			fieldLabel: 'ด้าน/โปรแกรม',
			name : 'risk_program_detail',
		    store: risks.listProgramDetail,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,		     
		    editable: false	,
		    anchor: '100%',
		    allowBlank: true, 
		    blankText :'กรุณาเลือกด้าน/โปรแกรม'
		});
		
		main.searchJobId = new Ext.form.field.Text({
			name:'search_job_id',
			fieldLabel : 'เลข risk id',
			allowBlank: true,
			anchor: '100%' 
		});
		
		main.search = new Ext.Button({
			text     : 'ค้นหา',
			width : 120,
			listeners: {
		        click: function() {
		        	
		        	main.loadDataSearch();
		        	
		        }
		       
		    }
					
		});
		
		main.layout1 = Ext.create('Ext.Panel',{
			border : false,
			 
			autoWidth : true,
			anchor: '100%',
			layout:'column',
			defaults:{margins:'0 5 5 0'},
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
		    		items : [ main.startDate, main.riskSection, main.riskProgramGroup,main.searchJobId ]
					 
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
					items : [main.stopDate,  main.riskStatus, main.riskProgramDetail ]
				}   ],
			dockedItems :[{
				xtype :'toolbar',
				dock : 'bottom',
				ui : 'footer',
				layout : {
					pack : 'center'
				},
				items : [
					  main.search 
				]
			}]  
			
		});
		
		Ext.apply(this, {
			bodyPadding: 10,
			border : false, 
			items : [ 
				{	
					layout: 'anchor',
					border : false,
					items : [main.layout1,  main.riskGrid ]
				}
			
			 ]
			 	 
		});
		 
		risks.AddRisk.superclass.initComponent.apply(this, arguments);
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


risks.listRiskView = Ext.extend(Ext.form.Panel,{
	loadDataSearch : function(){
		var main = this;
		startDate = main.startDate.getValue() ;
		        	
		        	
    	stopDate = main.stopDate.getValue() ;
    	riskSection = main.riskSection.getValue();
    	riskProgramGroup = main.riskProgramGroup.getValue();
    	riskStatus = main.riskStatus.getValue();
    	riskProgramDetail = main.riskProgramDetail.getValue();
    	//search_job_id
    	//searchJobId = main.searchJobId.getValue();
        risks.listRiskStore.load({
        	params : {
     			startDate : startDate,
     			stopDate : stopDate,
     			riskSection : riskSection,
     			riskProgramGroup : riskProgramGroup,
     			riskStatus : '*',
     			riskProgramDetail : riskProgramDetail
     		}
        });
	},
	initComponent: function( ) {
		var main = this;
		
	 
		
		 
 
		
		main.startDate = new Ext.form.field.Date({
			fieldLabel : 'วันที่เริ่ม',
			name: 'startdt',
            id: 'startdt',
            vtype: 'daterange',
            format: 'd/m/Y',
            endDateField: 'enddt'
		});
		main.stopDate  = new Ext.form.field.Date({
			fieldLabel : 'วันที่สิ้นสุด',
			name: 'enddt',
            id: 'enddt',
            vtype: 'daterange',
            format: 'd/m/Y',
            startDateField: 'startdt'
		}); 
		
		
		main.riskGrid = new risks.gridRisks({
			title : 'รายงานอุบัติการณ์',
			height : 400,
			listeners: {
                selectionchange: function(model, records) {
                    if (records[0]) {
                        //this.up('form').getForm().loadRecord(records[0]);
                         
                        
                        main.riskGrid.getSelectionModel().deselectAll();
                       
                    }
                }
            }
		});
		 
		
		main.riskStatus = new Ext.form.field.ComboBox({
			fieldLabel: 'สถานะ',
			name : 'risk_level',
		    store: risks.listRiskStatus,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,		     
		    editable: false	,
		    anchor: '100%',
		    allowBlank: true, 
		    value : 1,
		    blankText :'กรุณาเลือกสถานะ' 
		});
		
		main.riskSection = new Ext.form.field.ComboBox({
			fieldLabel: 'หน่วยงาน',
			name : 'risk_section',
		    store: risks.listRiskSection,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,		     
		    editable: true	,
		    anchor: '100%',
		    width : 300,
		    allowBlank: true, 
		    blankText :'กรุณาเลือกหน่วยงานที่รายงาน' 
		});
		
		main.riskProgramGroup = new Ext.form.field.ComboBox({
			fieldLabel: 'ประเภท',
			name : 'risk_program_group',
		    store: risks.listProgramGroup,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,		     
		    editable: false	,
		    anchor: '100%',
		    allowBlank: true, 
		    blankText :'กรุณาเลือกประเภท',
		    listeners:{
		         scope: this,
		         'select': function (  field,   value,   options ){
		         	main.riskProgramDetail.reset();
		         	division = value[0].data.id;
		         	risks.listProgramDetail.load({
		         		params : {
		         			 risk_program_group_id : division
		         		}
		         	});
		         	 
		         }
		    }
		}); 
				 
		
		main.riskProgramDetail = new Ext.form.field.ComboBox({
			fieldLabel: 'ด้าน/โปรแกรม',
			name : 'risk_program_detail',
		    store: risks.listProgramDetail,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,		     
		    editable: false	,
		    anchor: '100%',
		    allowBlank: true, 
		    blankText :'กรุณาเลือกด้าน/โปรแกรม'
		});
		
		main.search = new Ext.Button({
			text     : 'ค้นหา',
			width : 120,
			listeners: {
		        click: function() {
		        	
		        	main.loadDataSearch();
		        	
		        }
		       
		    }
					
		});
		
		main.layout1 = Ext.create('Ext.Panel',{
			border : false,
			 
			autoWidth : true,
			anchor: '100%',
			layout:'column',
			defaults:{margins:'0 5 5 0'},
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
		    		items : [ main.startDate]//, main.riskSection, main.riskProgramGroup 
					 
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
					items : [main.stopDate ] //,  main.riskStatus, main.riskProgramDetail
				}   ],
			dockedItems :[{
				xtype :'toolbar',
				dock : 'bottom',
				ui : 'footer',
				layout : {
					pack : 'center'
				},
				items : [
					  main.search 
				]
			}]  
			
		});
		
		Ext.apply(this, {
			bodyPadding: 10,
			border : false, 
			items : [ 
				{	
					layout: 'anchor',
					border : false,
					items : [main.layout1,  main.riskGrid ]
				}
			
			 ]
			 	 
		});
		 
		risks.listRiskView.superclass.initComponent.apply(this, arguments);
	}

});