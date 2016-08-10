Ext.application({
    name: 'books',
    launch: function() {
    
      
    	books.listBookType.load();
        
        var listBookReciveIn = new books.listBooks({
        	title:'ทะเบียนหนังสือรับภายใน',
        	autoWidth :true,
        	bookType : 1,
        	 
        	storeBook : Ext.data.StoreManager.lookup('listBookReciveInStore')
        	
        }); 
        var listBookReciveOut = new books.listBooks({
        	title:'ทะเบียนหนังสือรับภายนอก',
        	storeBook : Ext.data.StoreManager.lookup('listBookReciveOutStore'),
        	bookType : 2,
        	autoWidth :true 
        });
        
        var listBookSendIn = new books.listBooks({
        	title:'ทะเบียนหนังสือส่งภายใน',
        	autoWidth :true,
        	bookType : 3,
        	storeBook : Ext.data.StoreManager.lookup('listBookSendInStore')
        	
        }); 
        var listBookSendOut = new books.listBooks({
        	title:'ทะเบียนหนังสือส่งภายนอก',
        	storeBook : Ext.data.StoreManager.lookup('listBookSendOutStore'),
        	bookType : 4,
        	autoWidth :true 
        });
     //   listAllProject.setBookType(2);
        /*
        var addProject = new projects.AddProject({
        	title : 'แบบฟอร์ม'
        }); 
          
         */
        var project_main = new Ext.tab.Panel({
        	renderTo : 'maintenance-app',
        	items : [  listBookReciveIn,listBookReciveOut,listBookSendIn,listBookSendOut
        	]
        });
         
    }
});
 
 