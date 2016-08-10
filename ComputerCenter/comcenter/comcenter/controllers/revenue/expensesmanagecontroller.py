from tg import expose, flash, require, url, request, redirect,session
from pylons.i18n import ugettext as _, lazy_ugettext as l_
from tg.i18n import set_lang,get_lang
from tgext.admin.tgadminconfig import TGAdminConfig
from tgext.admin.controller import AdminController
from repoze.what import predicates

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

import logging;
import sys;
log = logging.getLogger(__name__);
__all__ = ['ExpensesManageController']

 
class ExpensesManageController(BaseController):
    
    def __init__(self):
        self.util = Utility();
        
    
    @expose('comcenter.templates.revenue.index')
    def index(self):
        print "Index maintenance";
        """Handle the front-page."""
        set_lang("th"); 
        session['lang'] = "th";
        session.save();
        userid = "";
        if request.identity:
            userid = request.identity['repoze.who.userid']
        else:
            redirect('/revenue/summary');
            
        
        log.info("revenue");
            #print "user : " + str(userid);
        return dict(page='revenue');
    
    
    @expose('json')
    def listDetailAll(self,**kw):
        self.listType = ExpensesList.listAll();
        self.list = [];
        self.list.append({'id':'0','name':'*'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.expenses_list_id,'name':value.expenses_list_name}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    @expose('json')
    def listSubDetailAll(self,**kw):
        groupId = self.util.isValue(kw.get('groupId'));
        self.listType = [];
        if(groupId):
            self.listType = ExpensesSubList.listByGroup( groupId );
        else:
            self.listType = ExpensesSubList.listAll();
        self.list = [];
        self.list.append({'id':'0','name':'*','other':'0'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.expenses_sub_list_id,'name':value.expenses_sub_list_name,'other':value.expenses_sub_list_other}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    
    @expose('json')
    def showAllExpenses(self,**kw):
        fiscal_year = self.util.isValue(kw.get('fiscalyear'));
        expenses_list = self.util.isValue(kw.get('expenses_list'));
        expenses_sub_list = self.util.isValue(kw.get('expenses_sub_list'));
        
        self.listRevenue = Expenses.search(fiscal_year,expenses_list,expenses_sub_list);
        self.list = [];
        if(self.listRevenue):
            for value in self.listRevenue:
                self.list.append({ 'expenses_id':value.expenses_id ,
                                    'expenses_list':value.expenses_list_id,
                                    'expenses_sub_list':value.expenses_sub_list_id,
                                    'fiscal_year':value.fiscal_year,
                                    'estimate':value.estimate,
                                    'detail':value.detail,
                                    'income_other':value.income_other,
                                    'expenses_list_name':value.expenses_list.expenses_list_name,
                                    'expenses_sub_list_name':value.expenses_sub_list.expenses_sub_list_name 
                                    });
        return dict(root = self.list,total=str(len(self.list)));
    
    @expose('json')
    def showGraphExpenses(self,**kw):
        fiscal_year = self.util.isValue(kw.get('fiscalyear'));
        expenses_list = self.util.isValue(kw.get('expenses_list')); 
        self.list = [];
        log.info("revenue_list : " + str (expenses_list));
        if expenses_list is None:
            expenses_list = '%';
        try:
            if fiscal_year :
                self.list = [];
                lists = Expenses.queryGraphByFiscalYear(fiscal_year,expenses_list);
                for row in lists:
                    self.list.append( { 
                                        'expenses_list_name':row['expenses_list_name'],
                                        'sum_estimate':row['sum_estimate'] 
                                        });
        
        except Exception, exception:
            log.info("error : " + str(exception));


        
        return dict(root = self.list,total=str(len(self.list)));
    
    @expose('json')
    def listGroupExpenses(self,**kw):
        fiscal_year = self.util.isValue(kw.get('fiscalyear'));
        expenses_list = self.util.isValue(kw.get('expenses_list')); 
        self.list = [];
        log.info("revenue_list : " + str (expenses_list));
        if expenses_list is None:
            expenses_list = '%';
        try:
            if fiscal_year :
                self.lists = Expenses.queryGroupByFiscalYear(fiscal_year,expenses_list);
                for row in self.lists:
                    self.list.append( { 
                                        'group':row['expenses_list_name'],
                                        'subgroup':row['expenses_sub_list_name'],
                                        'estimate':row['estimate'],
                                        'fiscal_year':row['fiscal_year'],
                                        'expenses_list_id' :row['expenses_list_id'],
                                        'expenses_sub_list_id':row['expenses_sub_list_id']
                                        });
        
        except Exception, exception:
            log.info("error : " + str(exception));


        
        return dict(root = self.list,total=str(len(self.list)));
    
    @expose('json')
    def createExpenses(self,**kw):
        
        expensesId = self.util.isValue(kw.get('expenses_id'));
        
        
        self.message ="success";
        self.success =True;
        try:
            if(expensesId):
                log.info("update value");
                self.expenses = Expenses.getById(expensesId);
                 
                self.expenses.expenses_list_id = kw.get('expenses_list');      
                
                self.expenses.expenses_sub_list_id = kw.get('expenses_sub_list');
                self.expenses.fiscal_year = kw.get('fiscal_year');
                self.expenses.estimate = kw.get('estimate');
                self.expenses.detail = kw.get('detail');
                self.expenses.income_other= kw.get('income_other');
                 
                 
                #self.project.update();
            else:
                log.info("save value"); 
                
                self.expenses =  Expenses();
                self.expenses.expenses_list_id = kw.get('expenses_list');    
                self.expenses.expenses_sub_list_id = kw.get('expenses_sub_list');
                self.expenses.fiscal_year = kw.get('fiscal_year');
                self.expenses.estimate = kw.get('estimate');
                self.expenses.detail = kw.get('detail');
                self.expenses.income_other= kw.get('income_other');
                
                self.expenses.save();
        except Exception, exception:
            log.info("error : " + str(exception));
            self.message ="fail";
            self.success = False;
                
        return dict(success=self.success, message = self.message);