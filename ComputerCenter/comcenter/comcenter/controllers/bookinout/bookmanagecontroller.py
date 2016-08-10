from tg import expose, flash, require, url, request, redirect,session,response,config
from pylons.i18n import ugettext as _, lazy_ugettext as l_
from tg.i18n import set_lang,get_lang
from tgext.admin.tgadminconfig import TGAdminConfig
from tgext.admin.controller import AdminController
from repoze.what import predicates
from datetime import datetime

from comcenter.lib.base import BaseController
from comcenter.model import DBSession, metadata
from comcenter import model
from comcenter.controllers.secure import SecureController

from comcenter.controllers.error import ErrorController
from comcenter.controllers.downloadcontroller import DownloadController;
from comcenter.controllers.reportonlinecontroller import ReportOnlineController;
from comcenter.controllers.statisticonlinecontroller import StatisticOnlineController;

from comcenter.controllers.setupcontroller import SetupController;

from comcenter.model import *;
from comcenter.controllers.util.utility import *;
from comcenter.controllers.util.exportexcel.bookstoexcel import *;
from comcenter.controllers.util.savefile.savebookfile import *;
import logging;
import sys;
log = logging.getLogger(__name__);
__all__ = ['BookManageController']

class BookManageController(BaseController):
    
    def __init__(self):
        self.util = Utility();
        self.exportToExcel = BooksToExcel();
        self.saveBookFile = SaveBookFile();
         
    @expose('comcenter.templates.books.bookin')
    def index(self):
        print "Index maintenance";
        """Handle the front-page."""
        set_lang("th"); 
        session['lang'] = "th";
        session.save();
        userid = "";
        #if request.identity:
        #    userid = request.identity['repoze.who.userid']
        #else:
        #    redirect('/');
        
        log.info("books");
            #print "user : " + str(userid);
        return dict(page='books');
    
    @expose('json')
    def listBookType(self ,**kw):
        
        self.listType = BookType.listAll();
        self.list = [];
        #self.list.append({'id':'0','name':'*'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.book_type_id,'name':value.book_type_name}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    @expose('json')
    def deleteBook(self,**kw):
        print "deleteProject";
        #print kw;
        self.success = True;
        self.message ="success";
        
        bookId = self.util.isValue(kw.get('book_id'));
        
        try:
            if(bookId):
                self.book = Book.getById(bookId);
                if(self.book):
                    #self.book.remove();
                    self.book.activate = '0';
                else:
                    log.info("error : remove : "+ str(bookId) );
                    self.message ="fail";
                    self.success = False;
            else :
                log.info("error : remove : "+ str(bookId) );
                self.message ="fail";
                self.success = False;
        except Exception, exception:
            log.info("error : " + str(exception));
            self.message ="fail";
            self.success = False;
        
        return dict(success=self.success, message = self.message); 
    
    @expose('json')
    def listBooks(self,**kw):
        self.list = [];
        reload(sys);
        sys.setdefaultencoding("utf-8");
        print kw.get('startDate');
        print kw.get('stopDate');
        print kw.get('bookType');
        print kw.get('bookSearch');
        print kw.get('page');
        print kw.get('start');
        print kw.get('limit');
        
         
        
        self.startDate = self.util.convertStringToDate(kw.get('startDate'));  
        self.stopDate = self.util.convertStringToDate(kw.get('stopDate'));  
        self.bookType = self.util.isValue(kw.get('bookType'));
        
        self.page   =   self.util.isValue(kw.get('page'))  ;
        self.start   =   self.util.isValue(kw.get('start'))  ;
        self.limit   =   self.util.isValue(kw.get('limit'))  ;
        self.bookSearch =   self.util.isValue(kw.get('bookSearch'))  ;
        if(self.bookSearch):
            self.bookSearch = '%'+ self.bookSearch + '%';
        else:
            self.bookSearch = '%%';
        
        self.tempBookType = session.get('bookType');
        
        print "bookType : " + str(self.bookType  );
        print "tempBookType : " + str(self.tempBookType  );
        print "result : " + str(self.bookType != self.tempBookType);
        if(self.bookType != self.tempBookType):
            print "---------------------: booktype not equ";
            pass;
            
        if(self.bookType):
            session['startDate'] = self.startDate;
            session['stopDate'] = self.stopDate;
            session['bookType'] = self.bookType;
            session['bookSearch'] = self.bookSearch;
             
            session.save();
        else:
            self.startDate = session.get('startDate');
            self.stopDate = session.get('stopDate');
            self.bookType = session.get('bookType');
            self.bookSearch = session.get('bookSearch');
            
            
       
        self.offset = int(self.limit)*int(self.page);
        self.total , self.books = Book.showProgramClinicReport(self.startDate,self.stopDate,self.bookType,self.bookSearch,self.start,self.limit);
        
        if(self.books):
            for bookobj in self.books:
                
                self.bookFile = BookFile.getByBookId(bookobj.book_id);
                
                self.listBookFile = [];
                if(self.bookFile):
                    for bookf in self.bookFile:
                        self.listBookFile.append({
                                                  'book_file_id' : bookf.book_file_id,
                                                  'orig_file_name' : bookf.orig_file_name,
                                                  'new_file_name' : bookf.new_file_name 
                                                  });
                    
                self.list.append({
                                  'book_id': bookobj.book_id,
                                  'book_number': bookobj.book_number,
                                  'book_at': bookobj.book_at,
                                  'book_recive': bookobj.book_recive,
                                  'book_from': bookobj.book_from,
                                  'book_to': bookobj.book_to,
                                  'book_detail': bookobj.book_detail,
                                  'book_operations': bookobj.book_operations,
                                  'book_remark': bookobj.book_remark,
                                  'book_type': bookobj.book_type_id,  
                                  'book_type_name': bookobj.book_type.book_type_name,
                                  'book_file' : self.listBookFile
                                  });
        
        
        return dict(root = self.list,total=str( self.total));
    
    @expose(content_type="application/ms-excel")
    def exportBooksToExcel(self,**kw):
        self.list = [];
        reload(sys);
        sys.setdefaultencoding("utf-8");
        print kw.get('startDate');
        print kw.get('stopDate');
        print kw.get('bookType');
        print kw.get('bookSearch');
        print "----------------------";
        
        self.startDate = self.util.convertStringToDate(kw.get('startDate'));  
        self.stopDate = self.util.convertStringToDate(kw.get('stopDate'));  
        self.bookType = self.util.isValue(kw.get('bookType'));
        self.bookSearch =   self.util.isValue(kw.get('bookSearch'))  ;
        if(self.bookSearch):
            self.bookSearch = '%'+ self.bookSearch + '%';
        else:
            self.bookSearch = '%%';
        
        self.books = Book.showProgramClinicReport(self.startDate,self.stopDate,self.bookType,self.bookSearch);
        
        if(self.books):
            for bookobj in self.books:
                self.list.append({
                                  'book_id': bookobj.book_id,
                                  'book_number': bookobj.book_number,
                                  'book_at': bookobj.book_at,
                                  'book_recive': bookobj.book_recive,
                                  'book_from': bookobj.book_from,
                                  'book_to': bookobj.book_to,
                                  'book_detail': bookobj.book_detail,
                                  'book_operations': bookobj.book_operations,
                                  'book_remark': bookobj.book_remark,
                                  'book_type': bookobj.book_type_id,  
                                  'book_type_name': bookobj.book_type.book_type_name
                                  });
        
        pathfile = self.exportToExcel.exportToExcel(self.list);    
        print pathfile;
        response.content_type = 'application/ms-excel'
        response.headers["Content-Disposition"] = "attachment;filename=book.xls"
         
        file = open(pathfile,'rb');
        read_data = file.read();
      
        return read_data;
        
        
    
    @expose('json')
    def addbooks(self,**kw):
         
        print kw.get('book_id'); 
        print kw.get('book_type');
        print kw.get('book_number');
        print kw.get('book_at');
        print kw.get('recive_date');
        print kw.get('book_from');
        print kw.get('book_to');
        print kw.get('book_detail');
        print kw.get('book_operations');
        print kw.get('book_remark');
        print kw.get('book_file');
        
        book_file = kw.get('book_file');#request.POST['book_file']
        #upload = book_file.file.read();
        
        #print book_file.filename; 
        #print upload;
        
        book_pathfile = config.get('book.pathfile');

        print book_pathfile;
        print os.path.dirname(os.path.abspath(__file__)); 

        
        
        
        bookId = self.util.isValue(kw.get('book_id'));
        
        self.book = Book();
        if(bookId):
            log.info("update book at : " + str(bookId));
            
            self.book = Book.getById(bookId);
            
            self.book.book_number = kw.get('book_number');
            self.book.book_at  =  kw.get('book_at');
            self.book.book_recive  =  self.util.convertStringToDate(kw.get('recive_date'));  
            self.book.book_from  = kw.get('book_from');
            self.book.book_to  = kw.get('book_to');
            self.book.book_detail  =  kw.get('book_detail');
            self.book.book_operations  =  kw.get('book_operations');
            self.book.book_remark  =  kw.get('book_remark');
            self.book.book_type_id  =  kw.get('book_type');
            self.book.update_date = datetime.now();
            self.book.save();
        else:
            log.info("create new book "  );
            self.book.book_number = kw.get('book_number');
            self.book.book_at  =  kw.get('book_at');
            self.book.book_recive  =  self.util.convertStringToDate(kw.get('recive_date'));  
            self.book.book_from  = kw.get('book_from');
            self.book.book_to  = kw.get('book_to');
            self.book.book_detail  =  kw.get('book_detail');
            self.book.book_operations  =  kw.get('book_operations');
            self.book.book_remark  =  kw.get('book_remark');
            self.book.book_type_id  =  kw.get('book_type');
            self.book.activate = '1';
            self.book.save();
        
        print "book id : " + str(self.book.book_id); 
        print "book_file ; " + str(book_file);
        if book_file != "":
            print "boook file ";
            self.newFileName = self.saveBookFile.save(book_file, book_pathfile,kw.get('book_type') );
            if(self.newFileName ):
                self.bookfile = BookFile();
                self.bookfile.book_id = self.book.book_id;
                self.bookfile.orig_file_name = book_file.filename;
                self.bookfile.new_file_name  = self.newFileName;
                self.bookfile.save();
        else:
            print "not book file";
            
    @expose(content_type="application/ms-excel")
    def stats(self):
        from xlrd import open_workbook
        from xlwt import easyxf
        from xlutils.copy import copy

        rb = open_workbook('D:\\project\\comcenter\\comcenter\\simple.xls', formatting_info=True)
        wb = copy(rb)
        response.content_type = 'application/ms-excel'
        response.headers["Content-Disposition"] = "attachment;filename=report.xls"
        #response.content_type = 'text/csv'
        #response.headerlist.append(('Content-Disposition','attachment;filename=stats.csv'))
        file = open('D:\\project\\comcenter\\comcenter\\simple.xls','rb');
        read_data = file.read();
      
        return read_data;
         
        