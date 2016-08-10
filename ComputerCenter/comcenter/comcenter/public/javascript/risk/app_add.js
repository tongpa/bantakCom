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
    	//risks.listSectionTeamStore.load();
        //risks.listAcrossTeamStore.load();
        
        //risks.listRiskLevel.load();
        //risks.listRiskSection.load();
        
        
       
        
        var listAllProject = new risks.AddRisk({
         	title:'รายงานอุบัติการณ์',
        	renderTo : 'maintenance-app' 
        }); 
        listAllProject.loadStoreForAdd();
      //  listAllProject.forAddShowResponse();
        
    }
});
 
Ext.namespace("risks");

 