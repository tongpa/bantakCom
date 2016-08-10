Ext.namespace("risks");
risks.AddRisk = Ext.extend(Ext.form.Panel,{
	
	loadStoreForAdd :function(){
		//search programdetail
		risks.listProgramDetail.load({
			params:{ risk_program_group_id : '1' }
		});
		//search risk level
        risks.listRiskLevel.load({
			params:{risk_program_group_id : '1' }
		});
        
        risks.listSectionTeamStore.load();
        risks.listAcrossTeamStore.load();
	},
	
	clickRadio: function (ctl,val){
		 
		 
		this.main.riskProgramDetail.reset();
		this.main.riskLevel.reset();
		if(ctl.inputValue == "1" && val){
			risks.listProgramDetail.load({
				params:{ risk_program_group_id : ctl.inputValue }
			});
			risks.listRiskLevel.load({
				params:{risk_program_group_id : ctl.inputValue }
			});
		}
		if(ctl.inputValue == "2"&& val){
			risks.listProgramDetail.load({
				params:{ risk_program_group_id : ctl.inputValue }
			});
			risks.listRiskLevel.load({
				params:{risk_program_group_id : ctl.inputValue }
			});
		}
		
		
		 
	},
	
	initComponent: function( ) {
		var main = this;
		main.riskId = new Ext.form.field.Hidden({
			name : 'risk_management_id',
			value : ''
		});
		main.reportDate = new Ext.form.field.Date({
			fieldLabel : 'วันที่พบเหตุการณ์',
			name :'report_date',
			value : new Date(),
			format: 'd/m/Y',
			anchor : '100%'
		});
		main.detail = new Ext.form.field.TextArea({
			grow      : true,
	        name      : 'detail',
	        fieldLabel: 'รายละเอียด',
	        anchor    : '100%  -47'
				
		});
		
		main.riskLevel = new Ext.form.field.ComboBox({
			fieldLabel: 'ระดับ',
			name : 'risk_level_id',
		    store: risks.listRiskLevel,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,		     
		    editable: false	,
		    anchor: '100%',
		    allowBlank: false, 
		    blankText :'กรุณาเลือกระดับ'
		});
		
		main.riskSection = new Ext.form.field.ComboBox({
			fieldLabel: 'หน่วยงาน',
			name : 'risk_section_id',
		    store: risks.listRiskSection,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,		     
		    editable: true	,
		    anchor: '100%',
		    allowBlank: false, 
		    blankText :'กรุณาเลือกหน่วยงานที่รายงาน'
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
		    allowBlank: false, 
		    blankText :'กรุณาเลือกด้าน/โปรแกรม'
		});
		
		main.riskStatus = new Ext.form.field.ComboBox({
			fieldLabel: 'สถานะ',
			name : 'risk_status_id',
		    store: risks.listRiskStatus,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,		     
		    editable: false	,
		    anchor: '100%',
		    allowBlank: false, 
		    blankText :'กรุณาสถานะ'
		});
		
		
		/////////////////////////////////////
		 
		
		main.sectionTeam = new Ext.ux.form.ItemSelector({
			name: 'section_team',
            anchor: '100%',
            fieldLabel: 'หน่วยงาน',
            imagePath: '/ux/images/',
			labelWidth : 60, 
            store: risks.listSectionTeamStore,
            displayField: 'name',
            valueField: 'id',
            //value: ['3', '4', '6'],
			columnWidth: .50,
            allowBlank: true, 
            msgTarget: 'side'
            
		});
		
		main.cromTeam = new Ext.ux.form.ItemSelector({
			name: 'crom_team',
            anchor: '100%',
            fieldLabel: 'ทีมคร่อม',
            imagePath: '/ux/images/',
			labelWidth : 60, 
            store: risks.listAcrossTeamStore,
            displayField: 'name',
            valueField: 'id',
           // value: ['3', '4', '6'],
			columnWidth: .50,
            allowBlank: true, 
            msgTarget: 'side'
		});
		main.panelAgencies = Ext.create('Ext.panel.Panel',{
			border : false,
			anchor: '100%',
			layout:'column',
			items : [ main.sectionTeam,  main.cromTeam	]
		});
		
		/////////////////////////////////////
		
		main.clinic = new Ext.form.field.Radio({
			main:main,boxLabel: 'โปรแกรมทางคลินิก', name: 'risk_program', inputValue: '1'  , checked: true,handler: main.clickRadio
		}); 
		main.phycal = new Ext.form.field.Radio({
			main:main,boxLabel: 'โปรแกรมทางกายภาพ', name: 'risk_program', inputValue: '2',handler: main.clickRadio
		}); 
		
		main.riskProgramGroup = new Ext.form.RadioGroup({
			columns : 2,
			vertical : true,
			tempValue : 1,
			fieldLabel: 'ประเภท',
			items : [ main.clinic,main.phycal 	
					]  
			 
		});
		
		/////////////////////////////////////
		main.panelAddRisk = Ext.create('Ext.panel.Panel',{
			border : false,
			layout : 'anchor',
			items : [main.riskId,
			         main.reportDate,
			         main.riskSection,
			         main.riskProgramGroup,
			         main.riskProgramDetail,
			         main.riskLevel,
			         main.detail,
			         main.riskStatus,
			         main.panelAgencies
			         ]
		});
		
		Ext.apply(this, {
			bodyPadding: 10,
			 
			items : [ main.panelAddRisk  ] 
			 	 
		});
		
		
		
		risks.AddRisk.superclass.initComponent.apply(this, arguments);
	}
});