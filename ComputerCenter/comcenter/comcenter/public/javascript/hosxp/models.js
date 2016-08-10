Ext.namespace("hosxp");

Ext.regModel('visitinyear', {
    fields: [
    	{name: 'id' }  ,
         {name: 'data' }  ,
         {name: 'year' }  ,
         {name: 'name'}
    ]
});

hosxp.visitinyearstore = new Ext.data.Store({
			fields: [
			    		{name: 'id' }  ,
			         	{name: 'data' }  ,
			         	{name: 'year' }  ,
			         	{name: 'name'}
			    ] ,
			proxy : {
				type: 'ajax',
				url : '/statisticonline/visitinyear',
				reader : {
					type: 'json',
					root: 'root'
				}
			},
			autoLoad : false
		});

hosxp.patientinyearstore = new Ext.data.Store({
			fields: [
			    		{name: 'id' }  ,
			         	{name: 'data' }  ,
			         	{name: 'year' }  ,
			         	{name: 'name'}
			    ] ,
			proxy : {
				type: 'ajax',
				url : '/statisticonline/patientinyear',
				reader : {
					type: 'json',
					root: 'root'
				}
			},
			autoLoad : false
		});
		
hosxp.patientsexinyearstore = new Ext.data.Store({
			fields: [
			    		{name: 'id' }  ,
			         	{name: 'men' }  ,
			         	{name : 'ชาย'},
			         	{name : 'หญิง'},
			         	{name: 'women'  }  ,
			         	{name: 'year' }  ,
			         	{name: 'name'}
			    ] ,
			proxy : {
				type: 'ajax',
				url : '/statisticonline/patientsexinyear',
				reader : {
					type: 'json',
					root: 'root'
				}
			},
			autoLoad : false
		});