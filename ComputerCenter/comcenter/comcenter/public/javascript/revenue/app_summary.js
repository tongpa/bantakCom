Ext.application({
    name: 'revenue',
    launch: function() {
    
         revenue.listDetail.load();
         expenses.listDetailExpenses.load();
        var listAllProject = new revenue.AllRevenue({
        	border : false,
        	title:'รายรับประมาณการ-รายรับ',
        	//renderTo : 'maintenance-app',
        	height : 1400  
        	
        }); 
       
        var addProject  = new expenses.AllExpenses({
        	border : false,
        	title : 'รายจ่ายประมาณ-รายจ่าย',
		   // width: 400,
        	height : 1400 
		    
		    
		});
        /*
        addProject.on('activate', function(){
        	border : false,
			 window.location = '/project';
		}); 
         */
        var project_main = new Ext.tab.Panel({
        	renderTo : 'maintenance-app',
        	 
        	items : [  listAllProject,addProject
        	],
        	listeners: {
		        click: {
		            element: 'el', //bind to the underlying el property on the panel
		            fn: function(){ 
		            
		             
		             
		            }
		        } 
		    }
        });
         
    }
});
Ext.namespace("revenue");
Ext.namespace("projects");
Ext.namespace("maintenance");
