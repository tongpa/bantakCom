Ext.application({
    name: 'dental',
    launch: function() {
     
     //   dental.listSchool.load();
     
    //    dental.listSeniorClub.load(); 
    //    dental.listChildDev.load();
        
        var mainNineDental = new dental.ViewChildDev ({
        	title:'เด็กอายุ 3 ปี'   
        });
        
        var mainDental = new dental.ViewSchoolDental ({
        	title:'เด็กอายุ 12 ปี'  ,
        	kpi:2
        }); 
 		
 		var mainSenior = new dental.ViewSeniorClub({
 			title : 'ชมรมผู้สูงอายุ'
 		});
 		
 		var mapDental = new Ext.form.Panel({
 			title : 'แผนที่',
 			height : 400 ,
 			layout : {
					type : 'hbox',
					pack:'center',
	               	align:'middle'
				},
 			items : [{
 				
 				xtype : 'button',
 				text : 'แสดง แผนที่',
 				height : 50,
 				listeners: {
			        click: function() {
			        	window.location="/dental/map";
			        }
			    }
 			}]
 			
 		});
 		
 		var project_main = new Ext.tab.Panel({
        	renderTo : 'maintenance-app',
        	items : [ mainNineDental, mainDental,mainSenior,mapDental ],
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
Ext.namespace("dental");
 
 
 