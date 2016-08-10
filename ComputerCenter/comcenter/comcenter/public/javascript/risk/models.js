Ext.namespace("risks");

Ext.regModel('namevalue', {
    fields: [
    	{name: 'id' }  ,
         {name: 'name' }  
    ]
});

Ext.regModel('responsevalue', {
    fields: [
    	{name: 'id' }  ,
         {name: 'name' }  ,
         {name: 'detail'}
    ]
});

Ext.regModel('risksmodel',{
	fields: [
		{ name: 'risk_management_id'},
		{ name: 'detail'},
		{ name: 'risk_level_id'},
		{ name: 'risk_section_id'},
		{ name: 'risk_status_id'},
		{ name: 'risk_program_group_id'},
		{ name: 'risk_program_detail_id'},
		{ name: 'report_date',type:'date' , dateFormat: 'Y-m-d H:i:s' },
		{ name: 'create_date',type:'date' , dateFormat: 'Y-m-d H:i:s' },
		{ name: 'risk_level'},
		{ name: 'risk_section'},
		{ name: 'risk_program_detail'},
		{ name: 'risk_program_group'},
		{ name: 'risk_status'},
		{ name: 'crom_team'},
		{ name: 'section_team'}

 		
	]
});
 
risks.listRiskLevel =   new Ext.data.Store({
	model : 'namevalue',
	proxy: {
        type: 'ajax',
        url : '/risk/listRiskLevel',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: false
});
 
risks.listRiskSection =   new Ext.data.Store({
	model : 'namevalue',
	proxy: {
        type: 'ajax',
        url : '/risk/listSection',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: false
});

risks.listProgramGroup =   new Ext.data.Store({
	model : 'namevalue',
	proxy: {
        type: 'ajax',
        url : '/risk/listProgramGroup',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: false
});

risks.listProgramDetail =   new Ext.data.Store({
	model : 'namevalue',
	proxy: {
        type: 'ajax',
        url : '/risk/listProgramDetail',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: false
});

risks.listRiskStatus =   new Ext.data.Store({
	model : 'namevalue',
	proxy: {
        type: 'ajax',
        url : '/risk/listRiskStatus',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: false
});

risks.listRiskStore = new Ext.data.Store({
	model : 'risksmodel',
	storeId:'listRiskStore',
	proxy : {
		type: 'ajax',
		url : '/risk/showRiskManage',
		reader : {
			type: 'json',
			root: 'root'
		}
	},
	autoLoad : false
});

risks.listSectionTeamStore = new Ext.data.Store({
	model : 'namevalue',
	proxy: {
        type: 'ajax',
        url : '/risk/listTeamRespose?team_type=1',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: false
});

risks.listAcrossTeamStore = new Ext.data.Store({
	model : 'namevalue',
	proxy: {
        type: 'ajax',
        url : '/risk/listTeamRespose?team_type=2',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: false
}); 

risks.findRiskResponsible = new Ext.data.Store({
	model : 'responsevalue',
	proxy: {
        type: 'ajax',
        url : '/risk/findRiskResponsible',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: false
}); 

risks.getUserStore = new Ext.data.Store({
	model : 'responsevalue',
	proxy :{
		type : 'ajax',
		url : '/risk/getUser',
		reader: {
			type : 'json',
			root : 'root'
		}
	},
    autoLoad: false
	//risks.getUserStore.data.items[0].data.id
});
