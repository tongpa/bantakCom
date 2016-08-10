Ext.application({
    name: 'revenue',
    launch: function() {
    
        revenue.listDetail.load();
        expenses.listDetailExpenses.load();
        var listAllProject = new revenue.AllRevenue({
        	title:'รายรับประมาณการ-รายรับ',
        	//renderTo : 'maintenance-app',
        	height : 1500  
        	
        }); 
       
        var addProject  = new expenses.AllExpenses({
        	title : 'รายจ่ายประมาณ-รายจ่าย',
		     
        	height : 1400 
		    
		    
		});
        /*
        addProject.on('activate', function(){
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
