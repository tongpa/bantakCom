Ext.application({
    name: 'dental',
    launch: function() {
     
        dental.listSchool.load();
      //  dental.listkpiGroup.load(); 
        dental.listSeniorClub.load(); 
        dental.listChildDev.load();
        
        var mainNineDental = new dental.MainChildDev ({
        	title:'เด็กอายุ 3 ปี'   
        });
        
        var mainDental = new dental.MainDental ({
        	title:'เด็กอายุ 12 ปี'  ,
        	kpi:2
        }); 
 		
 		var mainSenior = new dental.MainSenior({
 			title : 'ชมรมผู้สูงอายุ'
 		});
 		
 		
 		
 		var project_main = new Ext.tab.Panel({
        	renderTo : 'maintenance-app',
        	items : [ mainNineDental, mainDental,mainSenior ],
        	listeners: {
        		scope: this,
        		'tabchange' : function ( tabPanel,   newCard,  oldCard,  eOpts ){
        			//alert ('tabchange');
        			//debugger;
        			newCard.gridPanel.getStore().removeAll(); 
        			newCard.listShow.getSelectionModel().deselectAll(true);
        			//newCard.listShow.getSelectionModel().deselectAll;
        			//newCard.listShow.getSelectionModel().deselectAll() ;
        			//newCard.listShow.getSelectionModel().selectRow(0);
        			//debugger; 
        		}
		         
		    }
        });
        
    }
});
Ext.namespace("dental");
 
 
 