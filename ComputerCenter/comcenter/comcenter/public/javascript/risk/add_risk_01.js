Ext.namespace("risks");

risks.PanelResponseRisk = Ext.extend(Ext.panel.Panel,{
	textid : null,
	field_label : "",
	text_detail : "",
	 
	initComponent: function( ) {
		var main = this;
		this.addEvents({ deleteMe: true });
		main.deleteBt = new Ext.Button({
			 
			tooltip:'ลบรายการ :'+main.field_label,
			icon: '/images/delete.png',			
			name :  main.textid,
			listeners: {
		        click: function() {
		        	 Ext.Msg.confirm('ยินยัน', 'ต้องการลบรายการ '+ main.field_label + " นี้หรือไม่ ?", function(btn, text){
					       //alert(btn);
					       if(btn == 'yes')
					       {
					       	main.fireEvent('deleteMe',main);
					       }
					    });
 					 
			     }  
		       
		    }
					
		});
		main.deleteBt.setVisible(false);
		main.obj1 = new Ext.form.field.TextArea({
				grow      : true,
		        name      : 'details'+main.textid ,
		        fieldLabel: main.field_label,
		        anchor    : '100%',
		       // anchor    : '100%  -47'	,
		        value     :  main.text_detail 
			});
		 
		
		Ext.apply(this, {
			border : false,
			anchor: '100%',	
			//bodyPadding: 10 ,
			layout:'column',
			//defaults:{margins:'0 5 5 0'},
			items : [
				{
					border : false,
					columnWidth: .95,
					layout: 'anchor',
					items:[main.obj1]
				},
				{
					border : false,
					columnWidth: .05,
					layout: 'anchor',
					items:[main.deleteBt]
				}
			]
			 
			 	 
		});
		
		risks.PanelResponseRisk.superclass.initComponent.apply(this, arguments);
	}
});

risks.ResponseRisk = Ext.extend(Ext.form.Panel,{
	resetAll :function(){
		this.removeAll(true); 
	},
	setLoadData : function(record){
		var main = this;
		var section_team = record.data.section_team;
		var cron_team = record.data.crom_team;
		var len = risks.listSectionTeamStore.data.length;
		var data = risks.listSectionTeamStore.data;
		 
		
		this.removeAll(true); 
		this.doLayout();
		var teams =  "";
		for(var i in section_team) {
			var steam = section_team[i];
			for (var r=0 ; r < len;r++){
				var value =  data.items[r];
				if(value.data.id == steam)
				{
					teams =teams +steam + "," ;
		 		
					 
					break;
				}
			} 
		}
		var len = risks.listAcrossTeamStore.data.length;
		var data = risks.listAcrossTeamStore.data;
		for(var i in cron_team) {
			var steam = cron_team[i];
			for (var r=0 ; r < len;r++){
				var value =  data.items[r];
				if(value.data.id == steam)
				{
					teams =teams +steam + "," ;
 				 
					break;
				}
			} 
		}
		if(teams.length >=1)
			teams = teams.substring(0,(teams.length-1) );
	
		risks.findRiskResponsible.load({
			params : {
     			 risk_team : teams,
     			 risk_namager:record.data.risk_management_id
     		},
     		callback: function(records, o, s) {
                if (s) {
                	 
                	var leng = records.length;
                	for (var row=0 ; row< leng ; row++)
                	{
	                	 
					 	var obj1 = new risks.PanelResponseRisk({
					 		textid : records[row].data.id,
							field_label : records[row].data.name,
							text_detail : records[row].data.detail ,
							listeners: {
		        				deleteMe: function(panel) {
		        					//alert('delete me');
		        					//debugger;
		        					main.remove(panel);
		        				}
		        			}
					 	});
					 	
						main.add(obj1);
					}
    				main.doLayout();
                     
                }
        	}
		});
	 	
		
	 	//alert(teams);
		
	},
	initComponent: function( ) {
		var main = this;
		
		
		Ext.apply(this, {
			bodyPadding: 10, 
			border : false
			 	 
		});
		
		risks.ResponseRisk.superclass.initComponent.apply(this, arguments);
	}
	
});

risks.AddRisk = Ext.extend(Ext.form.Panel,{
//	title : 'แบบฟอร์ม',
	fromedit : false, 
	//width : 490,
	//height : 500 ,
	fromWin: null,
	fromMain: null,
	currentRecord : null,
	forAddShowResponse: function(){
		risks.listSectionTeamStore.load();
        risks.listAcrossTeamStore.load();
        
        this.sendTeam.setVisible(false);
        this.answer.setVisible(false);
        
        
         
	},	
	forAdd : function(){
	
		//this.riskStatus.setDisabled(true);
		this.sectionTeam.setDisabled(true);
		this.cromTeam.setDisabled(true);
		this.responses.setDisabled(true);
		this.answer.setDisabled(true);
		 
	//	this.riskStatus.setVisible(false);
		
		this.sectionTeam.setVisible(false);
		this.cromTeam.setVisible(false);
		this.responses.setVisible(false);
		this.sendTeam.setVisible(false);
		this.answer.setVisible(false);
		 
	},
	
	setLoadData : function(record){
		form = this;
		form.getForm().loadRecord(record);
		form.currentRecord = record;
		
		if(record.data.risk_program_group_id == 1) 
		{
			this.clinic.setValue(true);
			this.phycal.setValue(false);
		}
		else{
			this.clinic.setValue(false);
			this.phycal.setValue(true);
		}
		
		 
		//reset and load program
		this.riskProgramDetail.reset();
     	division = record.data.risk_program_group_id;
     	risks.listProgramDetail.load({
     		params : {
     			 risk_program_group_id : division
     		},
     		callback: function(records, o, s) {
                if (s) {
                	 
                    form.riskProgramDetail.setValue(form.currentRecord.data.risk_program_detail_id);
                    
                }
        	}
     	});
     	
     	//reset and load risklevel
     	this.riskLevel.reset();
     	 
     	risks.listRiskLevel.load({
			params:{risk_program_group_id : division },
			callback: function(records, o, s) {
                if (s) {                	 
                    form.riskLevel.setValue(form.currentRecord.data.risk_level_id);
                    
                }
        	}
			
		});
  	
     	
     	
     	this.sectionTeam.setValue(record.data.section_team);
		this.cromTeam.setValue(record.data.crom_team);
	//	this.riskStatus.setValue((record.data.risk_status_id + 1));
		
		//set button show
		this.answer.setVisible(true);
		this.save.setVisible(true);
		this.sendTeam.setVisible(true); 
		this.responses.getLayout().setActiveItem(0);
		
		 
		
		if(record.data.risk_status_id == 1)
		{
			this.answer.setVisible(false);
		}else
		{
			if(record.data.risk_status_id == 2)
			{
				this.save.setVisible(false);
				this.answer.setVisible(false);
			}
			else{
				this.responses.getLayout().setActiveItem(0);
				this.sendTeam.setVisible(true);
				if(record.data.risk_status_id >= 3)
				{	
					this.save.setVisible(false); 
					this.sendTeam.setVisible(false); 
					this.responseRisk.setLoadData(record);
					this.responses.getLayout().setActiveItem(1);
					
				}
			}
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
		
		clickRadio = function (ctl,val){
		 
			 
			main.riskProgramDetail.reset();
			main.riskLevel.reset();
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
			
			
			 
		}
		
		main.clinic = new Ext.form.field.Radio({
			boxLabel: 'โปรแกรมทางคลินิก', name: 'risk_program', inputValue: '1'  , checked: true,handler: clickRadio
		}); 
		main.phycal = new Ext.form.field.Radio({
			boxLabel: 'โปรแกรมทางกายภาพ', name: 'risk_program', inputValue: '2',handler: clickRadio
		}); 
		
		main.riskProgramGroup = new Ext.form.RadioGroup({
			columns : 2,
			vertical : true,
			tempValue : 1,
			fieldLabel: 'ประเภท',
			items : [ main.clinic,main.phycal 	
					]  
			 
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
		
		main.save = new Ext.Button({
			text     : 'บันทึก',
			width : 120,
			listeners: {
		        click: function() {
		            
		           main.getForm().submit({
		                url: '/risk/createRisk',
		                waitMsg: 'Please waiting...',
		                success: function(fp1, o) {
		                	 
		                	Ext.Msg.alert('บันทึก', 'บันทึกเสร็จเรียบร้อย.' );
		                	main.getForm().reset();
		                
		                	if( main.fromWin != null ){
								main.fromWin.hide();
							}
							if(main.fromMain != null){
								main.fromMain.loadDataSearch();
							}	  
				       	}
			       }); 
			     }  
		       
		    }
					
		});
		
		main.sendTeam = new Ext.Button({
			text : 'ส่งทีมที่เกี่ยวข้อง',
			width : 120,
			listeners : {
				click : function(){
					
					var lenSecTeam = main.sectionTeam.getValue().length;
					var lenCromTeam = main.cromTeam.getValue().length;
					
					if(lenSecTeam == 0  &&  lenCromTeam == 0){
						Ext.MessageBox.alert('เตือน', 'กรุณาเลือกทีมที่เกี่ยวข้องด้วย ');
						return ;
					}
					
					main.getForm().submit({
		                url: '/risk/sendTeam',
		                waitMsg: 'Please waiting...',
		                success: function(fp1, o) {
		                	 
		                	Ext.Msg.alert('บันทึก', 'ส่งข้อมูลเสร็จเรียบร้อย.' );
		                	main.getForm().reset();
		                	
		                	if( main.fromWin != null ){
								main.fromWin.hide();
							}
							if(main.fromMain != null){
								main.fromMain.loadDataSearch();
							}  
				       	}
			       }); 
				}
			}
		});
		
		main.answer = new Ext.Button({
			text     : 'ตอบกลับ',
			width : 120,
			listeners: {
		        click: function() {
		            
		           main.getForm().submit({
		                url: '/risk/replayRisk',
		                waitMsg: 'Please waiting...',
		                success: function(fp1, o) {
		                	 
		                	Ext.Msg.alert('บันทึก', 'บันทึกเสร็จเรียบร้อย.' );
		                	main.getForm().reset();
		                
		                	if( main.fromWin != null ){
								main.fromWin.hide();
							}
							if(main.fromMain != null){
								main.fromMain.loadDataSearch();
							}	  
				       	}
			       }); 
			     }  
		       
		    }
					
		});
		
		main.responseRisk = new risks.ResponseRisk( );
		
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
		main.responses  = Ext.create('Ext.panel.Panel',{
			border : false,			 
			anchor: '100%',		 
			layout: 'card',
			activeItem: 0, 
			defaults:{margins:'0 5 5 0'},
			items : [
				{
					xtype: 'fieldset',
	            	title:'หน่วยงานรับผิดชอบ',
	            	//width : 800,
	            	items:[
	            		{
	            			anchor: '100%',
							layout:'column',
							border : false,
					 		 
					 		items : [
					 			main.sectionTeam,
						        main.cromTeam
					 		]
	            		}
	            	]
				},
				main.responseRisk
				
				]
		});	
		
		Ext.apply(this, {
			bodyPadding: 10,
			 
			items : [main.riskId,main.reportDate, 
			main.riskSection ,		
			main.riskProgramGroup,
			main.riskLevel,			
		 
			main.riskProgramDetail,
			main.detail,
		//	main.riskStatus,
			main.responses
			 ],
			dockedItems :[{
				xtype :'toolbar',
				dock : 'bottom',
				ui : 'footer',
				layout : {
					pack : 'center'
				},
				items : [
					  main.save ,main.sendTeam,main.answer,main.close
				]
			}] 
			 	 
		});
		 
		risks.AddRisk.superclass.initComponent.apply(this, arguments);
	}
 
});
 

risks.AddRiskForTab  = Ext.extend(Ext.form.Panel,{
 	
	initComponent: function( ) {
		var main = this;
		
		main.riskId = new Ext.form.field.Hidden({
			name : 'risk_management_id',
			value : ''
		});
		main.reportDate = new Ext.form.field.Date({
			fieldLabel : 'วันที่พยเหตุการณ์',
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
		
		clickRadio = function (ctl,val){
		 
			 
			main.riskProgramDetail.reset();
			main.riskLevel.reset();
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
			
			
			 
		}
		
		main.clinic = new Ext.form.field.Radio({
			boxLabel: 'โปรแกรมทางคลินิก', name: 'risk_program', inputValue: '1'  , checked: true,handler: clickRadio
		}); 
		main.phycal = new Ext.form.field.Radio({
			boxLabel: 'โปรแกรมทางกายภาพ', name: 'risk_program', inputValue: '2',handler: clickRadio
		}); 
		
		main.riskProgramGroup = new Ext.form.RadioGroup({
			columns : 2,
			vertical : true,
			tempValue : 1,
			fieldLabel: 'ประเภท',
			items : [ main.clinic,main.phycal  ]  
			 
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
		
		 
		
		main.save = new Ext.Button({
			text     : 'บันทึก',
			width : 120,
			listeners: {
		        click: function() {
		            
		           main.getForm().submit({
		                url: '/risk/createRisk',
		                waitMsg: 'Please waiting...',
		                success: function(fp1, o) {
		                	 
		                	Ext.Msg.alert('บันทึก', 'บันทึกเสร็จเรียบร้อย.' );
		                	main.getForm().reset();
		                
		                	 	  
				       	}
			       }); 
			     }  
		       
		    }
					
		});
		
		  
		 
		
		main.reset = new Ext.Button({
			text : 'ล้างข้อมูล',
			width : 120,
			listeners : {
				click : function (){
					 main.getForm().reset();
				}
			}
		});  
		
		main.button =Ext.create('Ext.panel.Panel',{
			border : false,
			layout: {
                type: 'hbox',
                padding:'5',
                pack:'center',
                align:'middle'
            },
            defaults:{margins:'0 5 0 0'},
			items : [main.save , main.reset]
		});
		
		Ext.apply(this, {
			bodyPadding: 10,
			 
			items : [main.riskId,main.reportDate, 
			main.riskSection ,		
			main.riskProgramGroup,
			main.riskLevel,			
			
			main.riskProgramDetail,
			main.detail,
			main.button
			 ] 
			 
			 	 
		});
		 
		risks.AddRiskForTab.superclass.initComponent.apply(this, arguments);
	}
 
});
