# coding=utf8
from tg import expose, flash, require, url, request, redirect,session, response
from pylons.i18n import ugettext as _, lazy_ugettext as l_
from tg.i18n import set_lang,get_lang
from tgext.admin.tgadminconfig import TGAdminConfig
from tgext.admin.controller import AdminController
#from repoze.what import predicates

from comcenter.lib.base import BaseController
from comcenter.model import DBSession, metadata
from comcenter import model
from comcenter.controllers.secure import SecureController

from comcenter.controllers.error import ErrorController
from comcenter.model import *;
from comcenter.controllers.util.utility import *;
from comcenter.controllers.util.exportexcel.risktoexcel import *;

import logging;
import sys;
log = logging.getLogger(__name__);
__all__ = ['ComputerManageController']


class ComputerManageController(BaseController):
    
    def __init__(self):
        self.util = Utility();
    
     
    
    @expose('comcenter.templates.computer.index')
    def index(self):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        print "Index maintenance";
        """Handle the front-page."""
        set_lang("th"); 
        session['lang'] = "th";
        session.save();
        userid = "";
        sectionid ="";
        level = "1"; #Admin;  0 user;
        if request.identity:
            userid = request.identity['repoze.who.userid'];
            
            section = UserRiskSection.getByUserName(userid);
            if(section):
                sectionid = section.risk_section_id;
                section = RiskSection.listBySectionbyId(sectionid);
                if(section):
                    userid = section.description;
                    level = "0";
                
            print "section : " + str(sectionid);
        else:
            #redirect('/computer/add');
            pass;
        
        log.info("computer");
        #print "user : " + str(userid);
             
            
        return dict(page='computer',user=str(userid),sectionid=str(sectionid),level=level);
    
    
    @expose('json')
    def listComputerTypes(self ,**kw):
         
         
        self.listLevel = ComputerTypes.listAll();
        
         
        self.listDataRiskLevel = [];
       # self.listDataRiskLevel.append({'id':'0','name':'*'});
        if(self.listLevel):
            for value in self.listLevel:
                self.listDataRiskLevel.append({'id':value.computer_types_id,'name':value.description  }); 
        return dict(root = self.listDataRiskLevel,total=str(len(self.listDataRiskLevel)));
    
    @expose('json')
    def listCardType(self,**kw):
        self.listLevel = CardTypes.listAll();
        
         
        self.listDataRiskLevel = [];
       # self.listDataRiskLevel.append({'id':'0','name':'*'});
        if(self.listLevel):
            for value in self.listLevel:
                self.listDataRiskLevel.append({'id':value.card_types_id,'name':value.description  }); 
        return dict(root = self.listDataRiskLevel,total=str(len(self.listDataRiskLevel)));
    
    
    @expose('json')
    def saveComputer(self,**kw):
        
        
        computers_id =self.util.isValue( kw.get('computers_id') ) ;
        computer_name = self.util.isValue(kw.get('computer_name'));
        risk_section_id =self.util.isValue( kw.get('risk_section_id') );       
        
        computer_types_id=self.util.isValue( kw.get('computer_types_id'));
        
        
        description  = self.util.isValue(kw.get('description'));
        location  =self.util.isValue( kw.get('location'));
        active  =self.util.isValue( kw.get('active'));
        
        
        return dict(root='');
        
        
         