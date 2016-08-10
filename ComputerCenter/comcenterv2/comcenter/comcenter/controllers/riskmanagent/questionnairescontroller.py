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
__all__ = ['QuestionairesController']


class QuestionairesController(BaseController):
    def __init__(self):
        self.util = Utility();
        self.export = RiskToExcel();
        self.defaultyear = 2557;
    
    @expose('comcenter.templates.risk.questionaires')
    def index(self):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        print "Index maintenance";
        """Handle the front-page."""
              
            
        return dict(page='risk');
    
    @expose('comcenter.templates.risk.questgroup')
    def qgroup(self):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        print "Index maintenance";
        """Handle the front-page."""
              
            
        return dict(page='risk');
    
    @expose('json')
    def queryBySumLevelBy(self ,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        """Handle the front-page."""
        print "queryBySumLevelBy";
        col1= kw.get("column1");
        col2= kw.get("column2");
        print col2;
        
        list = [];
        list = Questionnaires.queryBySumLevelBy(column1=col1,column2=col2);
        print "size : " + str(len(list));
        return dict(root = list,total=str(len(list)));
       
    
    @expose('json')
    def queryByAvgBy(self,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        
        print "queryByAvgBy";
        col1 = kw.get("column1");
        col2 = kw.get("column2");
        
        list = [];
        list = Questionnaires.queryByAvgBy(column1 = col1 , column2= col2);
        print "size : " + str(len(list));
        return dict(root = list,total=str(len(list)));
    
    @expose('json')
    def queryByMedianGroup(self ,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        """Handle the front-page."""
        print "queryBySumLevelBy";
        list = [];
        list = Questionnaires.queryByMedianGroup(group=1);
        print "size : " + str(len(list));
        return dict(root = list,total=str(len(list)));
       
