Ext.namespace("books");

 

books.addBooks = Ext.extend(Ext.form.Panel,{
//	title : 'แบบฟอร์ม',
	fromedit : false, 
	width : 490,
	height : 500 ,
	fromWin: null,
	fromMain: null,
	currentRecord : null,
	setbooktype : '3', 
	storeBook : null,
	setBookType : function(setbooktype){
		this.booktypes.setValue(setbooktype);
		 
	},
	setLoadData : function(record){
		this.getForm().loadRecord(record);
		this.currentRecord = record;
		
	},
	setFromView : function(visible){
		 
	},
	setFormEdit : function(visible){
		 
	},
	initComponent: function( ) {
		var main = this;
		
		var today = new Date();
		/*var offset = 7;//bangkok 
		utc = today.getTime() + (today.getTimezoneOffset() * 60000);
		nd = new Date(utc + (3600000*offset)); //nd.toLocaleString()*/
		
		year = Ext.Date.format(today, 'Y');
		year = parseInt(year, 10) +543;
		
		year = parseInt(year, 10) +1; //next 1 year 
		
		main.bookId = new Ext.form.field.Hidden({
			name : 'book_id',
			anchor:'100%',
			value : ''
		});
		
		main.booktypes= new Ext.form.field.ComboBox({
			fieldLabel: 'ประเภททะเบียน',
			name : 'book_type', 
		    store: books.listBookType,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'id'	,
		    value : main.setbooktype,
		    editable: false	,
		    anchor: '100%',
		    listeners:{
		         scope: this,
		         'select': function (  field,   value,   options ){
		         	 
		         	 
		         }
		    }
		});
		
		main.number = new Ext.form.field.Text({
			name: 'book_number',
			fieldLabel :'เลขทะเบียน',
			anchor: '100%'			
		});
		
		main.at = new Ext.form.field.Text({
			name: 'book_at',
			fieldLabel :'ที่',
			anchor: '100%'			
		});
		
		main.reciveDate = new Ext.form.field.Date({
			fieldLabel: 'ลงวันที่',
			anchor: '50%',
	        name: 'recive_date',
	        value: new Date(),  
	        format: 'd/m/Y'
		});
		
		main.from = new Ext.form.field.Text({
			name: 'book_from',
			fieldLabel :'จาก',
			anchor: '100%'			
		});
		
		main.to = new Ext.form.field.Text({
			name: 'book_to',
			fieldLabel :'ถึง',
			anchor: '100%'			
		});
		
		main.detail = new Ext.form.field.TextArea({
			grow      : true,
	        name      : 'book_detail',
	        fieldLabel: 'เรื่อง',
	        anchor    : '100%'				
		});
		
		main.operations = new Ext.form.field.TextArea({
			grow      : true,
	        name      : 'book_operations',
	        fieldLabel: 'การปฏิบัติงาน',
	        anchor    : '100%'				
		});
		main.remark = new Ext.form.field.TextArea({
			grow      : true,
	        name      : 'book_remark',
	        fieldLabel: 'หมายเหตุ',
	        anchor    : '100%'				
		});
		
		main.fileUpload = new Ext.form.field.File({
			name: 'book_file',
	        fieldLabel: 'ไฟล์',
	        
	        msgTarget: 'side',
	        
	        anchor: '100%',
	        buttonText: 'เลือกไฟล์'
			
		});
		
		
		
		 
		main.save = new Ext.Button({
			text     : 'บันทึก',
			width : 120,
			listeners: {
		        click: function() {
		            //this == the button, as we are in the local scope
		           // this.setText('I was clicked!');
		           main.getForm().submit({
		                url: '/books/addbooks',
		                waitMsg: 'Please waiting...',
		                success: function(fp1, o) {
		                	//alert("success");
		                	//o.result.message
		                	//debugger;
		                	Ext.Msg.alert('บันทึก', 'บันทึกเสร็จเรียบร้อย.' );
		                	main.getForm().reset();
		                	if( main.fromWin != null ){
								main.fromWin.hide();
							}
							if(main.fromMain != null){
								main.fromMain.loadDataSearch();
							}
							//projects.listProjectStore.reload();
				       	}
			       }); 
			     }  
		       
		    }
					
		});
		
		main.close = new Ext.Button({
			text : 'ปิด',
			width : 120,
			listeners : {
				click : function (){
					if( main.fromWin != null ){
						 
						main.fromWin.hide();
						
					}
				}
			}
		});
		
		main.deleteBook = new Ext.Button({
			text : 'ลบข้อมูล',
			width : 120,
			listeners : {
				click : function(){
					Ext.MessageBox.confirm('Confirm', 'ต้องการจะลบรายการนี้หรือไม่?', function result(btn){
						if(btn == 'yes'){
							main.getForm().submit({
				                url: '/books/deleteBook',
				                waitMsg: 'Please waiting...',
				                success: function(fp1, o) {
				                	Ext.Msg.alert('ลบ', 'ลบรายการเสร็จเรียบร้อย.' );
				                	main.getForm().reset();
				                	if( main.fromWin != null ){
										main.fromWin.hide();
									}
									
				                	if(main.storeBook){
				                		main.storeBook.remove(main.currentRecord);
				                	}
									//projects.listProjectStore.remove(main.currentRecord);
									main.currentRecord = null;
									//debugger;
						       	}
					       }); 
						}
					} );
				}
			}
		});
		
		Ext.apply(this, {
			bodyPadding: 10,
			 
			items : [ main.bookId,
			          main.booktypes,
			          main.number,
			          main.at,
			          main.reciveDate,
			          main.from,
			          main.to,
			          main.detail,
			          main.operations,
			          main.remark,
			          main.fileUpload
			        ],
			
			dockedItems :[{
				xtype :'toolbar',
				dock : 'bottom',
				ui : 'footer',
				layout : {
					pack : 'center'
				},
				items : [
				         main.deleteBook ,'->','->', main.save ,main.close
				]
			}]	 
		});
		books.addBooks.superclass.initComponent.apply(this, arguments);
	}
	
	 
});