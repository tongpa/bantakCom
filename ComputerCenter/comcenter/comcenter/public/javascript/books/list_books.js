Ext.namespace("books");

books.gridBooks = Ext.extend(Ext.grid.Panel,{
	loadMask: true,
	columns: [
 
		 {header: 'เลขทะเบียน', dataIndex: 'book_number',width : 80  },
		{header: 'ที่',  dataIndex: 'book_at',width : 120},
        {header: 'ลงวันที่',  dataIndex: 'book_recive',width : 100,xtype: 'datecolumn',   format: 'd-m-Y'},
        {header: 'จาก',  dataIndex: 'book_from',width : 100 },
		{header: 'ถึง',  dataIndex: 'book_to' ,width : 100 },
		{header: 'เรื่อง',  dataIndex: 'book_detail' ,width : 270}
     
        
    ] 
	
	
}); 

books.listBooks = Ext.extend(Ext.form.Panel,{
 
	fromedit : false, 
	//width : 490,
	//height : 500 ,
	fromWin: null,
	fromMain: null,
	currentRecord : null,
	storeBook:null,
	border : false,
	bookType : 1,
	loadDataSearch : function(record){
		
		var main = this;
		startDate = main.startDate.getValue() ;
    	stopDate = main.stopDate.getValue() ;
    	bookSearch = main.bookSearch.getValue() ; 
    	 
    	main.storeBook.currentPage = 1; 
    	main.storeBook.load({
        	params : {
     			startDate : startDate,
     			stopDate : stopDate,
     			bookType : main.bookType,
     			bookSearch : bookSearch 
     		},
            callback: function(c) {
                //ddebugger;
            }

        });
	},
	exportToExcel : function(){
		var main = this;
		startDate = main.startDate.getValue() ;
    	stopDate = main.stopDate.getValue() ;
    	bookSearch = main.bookSearch.getValue() ; 
    	var sstartDate = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate() + 'T00:00:00'; 
    	var sstopDate = stopDate.getFullYear() + '-' + (stopDate.getMonth() + 1) + '-' + stopDate.getDate() + 'T00:00:00'; 
    	
    	document.location.href = '/books/exportBooksToExcel?startDate='+sstartDate +'&stopDate='+sstopDate +'&bookType='+main.bookType+'&bookSearch='+bookSearch;
    	
    	 
	},
	setFromView : function(visible){
		 
	},
	setFormEdit : function(visible){
		 
	},
	initComponent: function( ) {
		var main = this;
		
		var today = new Date();
		 
		
		year = Ext.Date.format(today, 'Y');
		year = parseInt(year, 10) +543;
		
		year = parseInt(year, 10) +1; //next 1 year 
		
		
		main.startDate = new Ext.form.field.Date({
			fieldLabel : 'วันที่เริ่ม',
			name: 'startdt',
            //id: 'startdt',
            //vtype: 'daterange',
			value: new Date(),
            format: 'd/m/Y' 
              
            //endDateField: 'enddt'
		});
		main.stopDate  = new Ext.form.field.Date({
			fieldLabel : 'วันที่สิ้นสุด',
			name: 'enddt',
            //id: 'enddt',
           // vtype: 'daterange',
			value: new Date(),
            format: 'd/m/Y' 
           // startDateField: 'startdt'
		}); 
		
		main.bookSearch = new Ext.form.field.Text({
			name: 'book_search',
			fieldLabel :'คำค้นหา',
			width : 450		
		});
		
		 
		
		main.addBookPanel = new books.addBooks( {
			setbooktype : main.bookType,
			storeBook : main.storeBook
		} );
		
		main.showWin  = new Ext.window.Window({
			//width : 800,
			//height : 550 ,
		    layout: 'fit',
		    closeAction : 'hide' ,
		    plain : true,
		    modal : true,
		    items : [main.addBookPanel]
		});
		
		main.addBookPanel.fromWin = main.showWin;
		main.addBookPanel.fromMain = main;
		
		main.searchs = new Ext.Button({
			text     : 'ค้นหาs',
			width : 120,
			listeners: {
		        click: function() {
		        	debugger;
		        	 
		        	 
		        }
		       
		    }
					
		});
		main.search = new Ext.Button({
			text     : 'ค้นหา',
			width : 120,
			listeners: {
		        click: function() {
		        	main.loadDataSearch();    
		        	 
		        	 
		        }
		       
		    }
					
		});
		main.addBook = new Ext.Button({
			text     : 'เพิ่ม',
			width : 120,
			listeners: {
		        click: function() {
		        	main.addBookPanel.setBookType(main.bookType);
		         
		        	main.showWin.show();
		        }
		       
		    }
					
		});
		
		main.exportExcel_button = new Ext.Button({
			text     : 'บันทึก เป็น Excel',
			width : 120,
			listeners: {
		        click: function() {
		        	//main.loadDataSearch();     	
		        	main.exportToExcel();
		        	
			     }  
		      
		    }
					
		});
		
		main.bookGrid = new books.gridBooks({
			//title : '',
			height : 400,
			dockedItems: [{
		        xtype: 'pagingtoolbar',
		        store: main.storeBook,   // same store GridPanel is using
		        dock: 'bottom',
		        displayInfo: true
		    }],
			store: main.storeBook,
			listeners: {
                selectionchange: function(model, records) {
                    if (records[0]) {
                        //this.up('form').getForm().loadRecord(records[0]);
                        main.showWin.show();
                        main.addBookPanel.setFormEdit(true);
                        main.addBookPanel.setLoadData(records[0]);
                        
                        main.bookGrid.getSelectionModel().deselectAll();
                       
                    }
                }
            }
		});
		
		main.layout1 = Ext.create('Ext.Panel',{
			border : false,
			autoWidth : true,
			title : main.title,
			defaults : {margins:'0 5 5 0'},
			items : [
		         
		         {
		        	 border : false,
		        	 layout : 'column',
		        	 items : [
		      				{	
		    					layout: 'anchor',
		    					border : false,
		    					anchor: '100%',
		    					bodyStyle: {
		    					    //background: '#ffc',
		    					    padding: '5px 10px'
		    					},
		    					columnWidth: .50,
		    					items : [ main.startDate]//, main.riskSection, main.riskProgramGroup 
		    					 
		    				} ,
		    				{	
		    					layout: 'anchor',
		    					border : false,
		    					anchor: '100%',
		    					bodyStyle: {
		    					    //background: '#ffc',
		    					    padding: '5px 10px'
		    					},
		    					columnWidth: .50,
		    					items : [main.stopDate ] //,  main.riskStatus, main.riskProgramDetail
		    				}  
		    				]
		         },
		         {
		        	 border : false,
		        	 anchor: '100%',
		        	 bodyStyle: {
 					    //background: '#ffc',
 					    padding: '0px 10px'
 					},
		        	 items : [main.bookSearch ]
		        	 
		         }
		         
			],
			dockedItems :[{
				xtype :'toolbar',
				dock : 'bottom',
				ui : 'footer',
				layout : {
					pack : 'center'
				},
				items : [
main.searchs,'->', main.addBook,'->',main.search , '->','->',main.exportExcel_button
				]
			}]  
		});
		
		 
		 
		
		Ext.apply(this, {
			bodyPadding: 10,
			border : false,
			//width :800,
			items : [ 
				{	
					//layout: 'anchor',
					border : true,
					items : [main.layout1 ,main.bookGrid]
				}
			
			 ]
		});
		books.listBooks.superclass.initComponent.apply(this, arguments);
	}
	
	/*
	items :[
		{
			xtype: 'datefield',
	        anchor: '100%',
	        fieldLabel: 'From',
	        name: 'from_date',
	        maxValue: new Date() 
		
		}
	]*/
});