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
__all__ = ['RevenueManageController']


class RevenueManageController(BaseController):
    
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
    
    
    @expose('comcenter.templates.revenue.summary')
    def summary(self):
        print "Index maintenance";
        """Handle the front-page."""
        set_lang("th"); 
        session['lang'] = "th";
        session.save();
        userid = "";
        if request.identity:
            userid = request.identity['repoze.who.userid']
            #print "user : " + str(userid);
        return dict(page='revenue')
    
    @expose('json')
    def listDetailAll(self,**kw):
        self.listType = RevenueList.listAll();
        self.list = [];
        self.list.append({'id':'0','name':'*'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.revenue_list_id,'name':value.revenue_list_name}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    @expose('json')
    def listSubDetailAll(self,**kw):
        groupId = self.util.isValue(kw.get('groupId'));
        self.listType = [];
        if(groupId):
            self.listType = RevenueSubList.listByGroup( groupId );
        else:
            self.listType = RevenueSubList.listAll();
        self.list = [];
        self.list.append({'id':'0','name':'*','other':'0'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.revenue_sub_list_id,'name':value.revenue_sub_list_name,'other':value.revenue_sub_list_other}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    
    @expose('json')
    def showAllRevenue(self,**kw):
        fiscal_year = self.util.isValue(kw.get('fiscalyear'));
        revenue_list = self.util.isValue(kw.get('revenue_list'));
        revenue_sub_list = self.util.isValue(kw.get('revenue_sub_list'));
        
        self.listRevenue = Revenue.search(fiscal_year,revenue_list,revenue_sub_list);
        self.list = [];
        if(self.listRevenue):
            for value in self.listRevenue:
                self.list.append({ 'revenue_id':value.revenue_id ,
                                    'revenue_list':value.revenue_list_id,
                                    'revenue_sub_list':value.revenue_sub_list_id,
                                    'fiscal_year':value.fiscal_year,
                                    'estimate':value.estimate,
                                    'detail':value.detail,
                                    'income_other':value.income_other,
                                    'revenue_list_name':value.revenue_list.revenue_list_name,
                                    'revenue_sub_list_name':value.revenue_sub_list.revenue_sub_list_name 
                                    });
        return dict(root = self.list,total=str(len(self.list)));
        
    
    @expose('json')
    def listGroupRevenue(self,**kw):
        fiscal_year = self.util.isValue(kw.get('fiscalyear'));
        revenue_list = self.util.isValue(kw.get('revenue_list')); 
        self.list = [];
        log.info("revenue_list : " + str (revenue_list));
        if revenue_list is None:
            revenue_list = '%';
        try:
            lists =[];
            if fiscal_year :
                lists = Revenue.queryGroupByFiscalYear(fiscal_year,revenue_list);
                self.list = [];
                 
                for row in lists:
                    self.list.append( { 
                                        'group':row['revenue_list_name'],
                                        'subgroup':row['revenue_sub_list_name'],
                                        'estimate':row['estimate'],
                                        'fiscal_year':row['fiscal_year'],
                                        'revenue_list_id' :row['revenue_list_id'],
                                        'revenue_sub_list_id':row['revenue_sub_list_id']
                                        });
                     
                                        
        
        except Exception, exception:
            log.info("error : " + str(exception));


        
        return dict(root = self.list,total=str(len(self.list)));
    
    
    @expose('json')
    def showGraphRevenue(self,**kw):
        fiscal_year = self.util.isValue(kw.get('fiscalyear'));
        revenue_list = self.util.isValue(kw.get('revenue_list')); 
        self.list = [];
        log.info("revenue_list : " + str (revenue_list));
        if revenue_list is None:
            revenue_list = '%';
        try:
            if fiscal_year :
                 
                self.lists = Revenue.queryGraphByFiscalYear(fiscal_year,revenue_list);
                for row in self.lists:
                    self.list.append( { 
                                        'revenue_list_name':row['revenue_list_name'],
                                        'sum_estimate':row['sum_estimate'] 
                                        });
            
        except Exception, exception:
            log.info("error : " + str(exception));


        
        return dict(root = self.list,total=str(len(self.list)));
        
    @expose('json')
    def createRevenue(self,**kw):
        
        revenueId = self.util.isValue(kw.get('revenue_id'));
        
        
        self.message ="success";
        self.success =True;
        try:
            if(revenueId):
                log.info("update value");
                self.revenue = Revenue.getById(revenueId);
                 
                self.revenue.revenue_list_id = kw.get('revenue_list');      
                
                self.revenue.revenue_sub_list_id = kw.get('revenue_sub_list');
                self.revenue.fiscal_year = kw.get('fiscal_year');
                self.revenue.estimate = kw.get('estimate');
                self.revenue.detail = kw.get('detail');
                self.revenue.income_other= kw.get('income_other');
                 
                 
                #self.project.update();
            else:
                log.info("save value"); 
                
                self.revenue =  Revenue();
                self.revenue.revenue_list_id = kw.get('revenue_list');    
                self.revenue.revenue_sub_list_id = kw.get('revenue_sub_list');
                self.revenue.fiscal_year = kw.get('fiscal_year');
                self.revenue.estimate = kw.get('estimate');
                self.revenue.detail = kw.get('detail');
                self.revenue.income_other= kw.get('income_other');
                
                self.revenue.save();
        except Exception, exception:
            log.info("error : " + str(exception));
            self.message ="fail";
            self.success = False;
                
        return dict(success=self.success, message = self.message);