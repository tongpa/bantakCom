Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '/ux');
Ext.require([
    'Ext.form.Panel',
    'Ext.ux.form.MultiSelect',
    'Ext.ux.form.ItemSelector'
]);
 
 
Ext.application({
    name: 'risks',
    launch: function() {
    
       // maintenance.listType.load();
        risks.listSectionTeamStore.load();
        risks.listAcrossTeamStore.load();
        risks.listRiskLevel.load();
        risks.listRiskSection.load();
        risks.listRiskStatus.load();
        risks.listProgramGroup.load();
        risks.listProgramDetail.load({
			params:{ risk_program_group_id : '1' }
		});
		
        risks.getUserStore.load();
        
		 
        var addRiskPanel   =new risks.AddRiskForTab({
 			title:'รายงานอุบัติการณ์',
 			height : 520 ,
 			autoWidth : true  
		});
		
		
        var listAllProject = new risks.listRisk({
        	 title:'แสดงรายการอุบัติการณ์',
        	height : 520 
        	
        }); 
		
		var reportRisk   = new Ext.form.Panel({
 			title : 'รายงานอุบัติการณ์',
 			height : 520 ,
			items:[
				{
					html:"<br>&nbsp;&nbsp;1.<a href='/risk/report1'  target='_blank'> สรุปรายงานอุบัติการณ์/ภาวะไม่พึงประสงค์</a>",
					xtype : "panel",
					border : false					
				},
				{
					html:"<br>&nbsp;&nbsp;2.<a href='/risk/report2' target='_blank'> จำนวนหน่วยงานที่ส่งรายงานอุบัติการณ์/ความเสี่ยง</a>",
					xtype : "panel",
					border : false					
				},
				{
					html:"<br>&nbsp;&nbsp;3.<a href='/risk/report3' target='_blank'> สรุปการนำส่งและการตอบกลับ ข้อมูลความเสี่ยงอุบัติการณ์ ไปยัง<b> หน่วยงาน </b>ที่เกี่ยวข้อง</a>",
					xtype : "panel",
					border : false					
				}
				,
				{
					html:"<br>&nbsp;&nbsp;4.<a href='/risk/report4' target='_blank'> สรุปการนำส่งและการตอบกลับ ข้อมูลความเสี่ยงอุบัติการณ์ ไปยัง<b> ทีมคร่อม </b>ที่เกี่ยวข้อง</a>",
					xtype : "panel",
					border : false					
				}
			]
		});
 			
		
	 var project_main = new Ext.tab.Panel({
        	renderTo : 'maintenance-app',
			height : 620 ,
        	items : [ addRiskPanel, listAllProject ,reportRisk ],
        	listeners: {
        		scope: this,
        		'tabchange' : function ( tabPanel,   newCard,  oldCard,  eOpts ){
        			//alert ('tabchange');
        			//debugger;
        			//newCard.gridPanel.getStore().removeAll(); 
        			//newCard.listShow.getSelectionModel().deselectAll(true);
        			//newCard.listShow.getSelectionModel().deselectAll;
        			//newCard.listShow.getSelectionModel().deselectAll() ;
        			//newCard.listShow.getSelectionModel().selectRow(0);
        			//debugger; 
        		}
		         
		    }
        });
        
	  
    }

	
});
 
Ext.namespace("risks");

 