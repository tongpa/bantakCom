Ext.namespace("dental");

Ext.regModel('namevalue', {
    fields: [
    	{name: 'id' }  ,
         {name: 'name' }  
    ]
});

Ext.regModel('namekpi', {
    fields: [
    	{name: 'id' }  ,
         {name: 'name' },
         {name: 'value'} ,
         {name : 'kpigroup'},
         {name : 'schoollist'} ,
         {name : 'fiscalyear'},
         {name : 'serviceid' }
    ]
});
Ext.regModel('nameseniorkpi', {
    fields: [
    	{name: 'id' }  ,
         {name: 'name' },
         {name: 'value'} ,
         {name : 'serviceid'},
         {name : 'seniorclub'} ,
         {name : 'fiscalyear'} 
    ]
});
Ext.regModel('namechilddevkpi', {
    fields: [
    	{name: 'id' }  ,
         {name: 'name' },
         {name: 'value'} ,
         {name : 'serviceid'},
         {name : 'childdev'} ,
         {name : 'fiscalyear'} 
    ]
});

Ext.regModel('viewchilddevkpi', {
    fields: [
    	{name: 'id' }  ,
         {name: 'name' },
         {name: 'kpi1'} ,
         {name : 'kpi2'},
         {name : 'sortkpi1'} ,
         {name : 'sortkpi2'} 
    ]
});

Ext.regModel('viewschoolkpi', {
    fields: [
    	{name: 'id' }  ,
         {name: 'name' },
         {name: 'kpi1'} ,
         {name : 'kpi2'},
         {name : 'kpi3'},
         {name : 'kpi4'},
         {name : 'sortkpi1'} ,
         {name : 'sortkpi2'} ,
         {name : 'sortkpi3'},
         {name : 'sortkpi4'}
    ]
});

Ext.regModel('viewsenoirclubkpi', {
    fields: [
    	{name: 'id' }  ,
         {name: 'name' },
         {name: 'kpi1'} ,
         {name : 'kpi2'},
         {name : 'kpi3'}, 
         {name : 'sortkpi1'} ,
         {name : 'sortkpi2'} ,
         {name : 'sortkpi3'} 
    ]
});

dental.listSeniorClub =   new Ext.data.Store({
	model : 'namevalue',
	proxy: {
        type: 'ajax',
        url : '/dental/listSeniorClub',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: false
});
 
dental.listSchool =   new Ext.data.Store({
	model : 'namevalue',
	proxy: {
        type: 'ajax',
        url : '/dental/listSchool',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: false
});

dental.listChildDev =   new Ext.data.Store({
	model : 'namevalue',
	proxy: {
        type: 'ajax',
        url : '/dental/listChildDevCenter',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: false
});

dental.listkpiGroup =   new Ext.data.Store({
	model : 'namevalue',
	proxy: {
        type: 'ajax',
        url : '/dental/listDentalSchoolKpiGroup',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: false
});


dental.viewsenoirkpiStore =   new Ext.data.Store({
	model : 'viewsenoirclubkpi',
	proxy: {
        type: 'ajax',
        url : '/dental/showDentalSeniorClubKpi',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: false
});

dental.viewchildkpiStore =   new Ext.data.Store({
	model : 'viewchilddevkpi',
	proxy: {
        type: 'ajax',
        url : '/dental/showDentalChildDevKpi',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: false
});
dental.viewschoolkpiStore =   new Ext.data.Store({
	model : 'viewschoolkpi',
	proxy: {
        type: 'ajax',
        url : '/dental/showDentalSchoolKpi',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: false
});
dental.listkpi =   new Ext.data.Store({
	model : 'namekpi',
	autoDestroy: true,
	autoSync: false,
	schoollist : null,
 	kpigroup : null,
 	fiscalyear : null,
	proxy: {
		type: 'ajax',
        api: {
            read: '/dental/listDentalSchoolKpi',
            create: '/dental/saveDentalSchoolService',
            update: '/dental/updateDentalSchoolService'
           // destroy: 'app.php/users/destroy'
        },
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'root',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            root: 'data'
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
        
    },
    reloadData: function(){
    	if(this.schoollist != null &&   
	 		this.kpigroup != null && 
	 		this.fiscalyear != null )
	 		{
	 			dental.listkpi.load({
	         		params : {
	         			fiscalyear : this.fiscalyear,
	         			schoollist : this.schoollist,
	         			kpigroup: this.kpigroup
	         		}
	         	});
	 		}  
    },
    listeners: {
        write: function(proxy, operation){
            if (operation.action == 'destroy') {
                //main.child('#form').setActiveRecord(null);
            }
            dental.listkpi.reloadData();
           //alert(operation.resultSet.message);
            
            //Ext.MessageBox.show(operation.action, operation.resultSet.message);
        }
    },
    autoLoad: true
});

dental.listseniorkpi =   new Ext.data.Store({
	model : 'nameseniorkpi',
	autoDestroy: true,
	autoSync: false,
	schoollist : null,
 	kpigroup : null,
 	fiscalyear : null,
	proxy: {
		type: 'ajax',
        api: {
            read: '/dental/listDentalSeniorKpi',
            create: '/dental/saveDentalSeniorService',
            update: '/dental/updateDentalSeniorService'
           // destroy: 'app.php/users/destroy'
        },
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'root',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            root: 'data'
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
        
    },
    reloadData: function(){
    	if(this.schoollist != null &&   
	 		this.kpigroup != null && 
	 		this.fiscalyear != null )
	 		{
	 			dental.listseniorkpi.load({
	         		params : {
	         			fiscalyear : this.fiscalyear,
	         			schoollist : this.schoollist,
	         			kpigroup: this.kpigroup
	         		}
	         	});
	 		}  
    },
    listeners: {
        write: function(proxy, operation){
            if (operation.action == 'destroy') {
                //main.child('#form').setActiveRecord(null);
            }
            dental.listseniorkpi.reloadData();
           //alert(operation.resultSet.message);
            
            //Ext.MessageBox.show(operation.action, operation.resultSet.message);
        }
    },
    autoLoad: true
});

dental.listchilddevkpi =   new Ext.data.Store({
	model : 'namechilddevkpi',
	autoDestroy: true,
	autoSync: false,
	schoollist : null,
 	kpigroup : null,
 	fiscalyear : null,
	proxy: {
		type: 'ajax',
        api: {
            read: '/dental/listDentalChildDevKpi',
            create: '/dental/saveDentalSeniorService',
            update: '/dental/updateDentalSeniorService'
           // destroy: 'app.php/users/destroy'
        },
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'root',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            root: 'data'
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
        
    },
    reloadData: function(){
    	if(this.childdev != null &&   
	 		
	 		this.fiscalyear != null )
	 		{
	 			dental.listchilddevkpi.load({
	         		params : {
	         			fiscalyear : this.fiscalyear,
	         			childdev : this.childdev
	         		}
	         	});
	 		}  
    },
    listeners: {
        write: function(proxy, operation){
            if (operation.action == 'destroy') {
                //main.child('#form').setActiveRecord(null);
            }
            dental.listchilddevkpi.reloadData();
           //alert(operation.resultSet.message);
            
            //Ext.MessageBox.show(operation.action, operation.resultSet.message);
        }
    },
    autoLoad: true
});