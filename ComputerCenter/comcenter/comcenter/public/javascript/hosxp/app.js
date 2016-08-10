Ext.application({
    name: 'hosxp',
    launch: function() {
 
        var listVisitInYear = new hosxp.showGraphVisitInYear({
        	title:'จำนวนผู้ป่วยมารับบริการ(ครั้ง)',
        	//renderTo : 'maintenance-app',
        	store : hosxp.visitinyearstore,
			ylabel : 'จำนวนครั้ง',
			xlabel : 'เดือน' 
        	
        }); 
        var listPatientInYear = new hosxp.showGraphVisitInYear({
         	title:'จำนวนผู้ป่วยมารับบริการ(คน)',
        	//renderTo : 'maintenance-app',
        	store : hosxp.patientinyearstore,
			ylabel : 'จำนวนคน',
			xlabel : 'เดือน' 
        	
        });
        
        var listPatientSexInYear = new hosxp.showGraphPatientSexInYear({
        	title: 'จำนวนผู้ป่วยมารับบรัการแยกชาย/หญิง(คน)',
        	store : hosxp.patientsexinyearstore,
        	ylabel : 'จำนวนคน',
			xlabel : 'เดือน' 
        });
        
       
          
         
        var project_main = new Ext.tab.Panel({
        	renderTo : 'maintenance-app',
        	items : [  listVisitInYear,listPatientInYear,listPatientSexInYear
        	]
        });
      
    }
});
Ext.namespace("hosxp");
 
 