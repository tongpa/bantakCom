# coding=utf8
from tg import expose, flash, require, url, request, redirect,session, response
from pylons.i18n import ugettext as _, lazy_ugettext as l_
from tg.i18n import set_lang,get_lang
from tgext.admin.tgadminconfig import TGAdminConfig
from tgext.admin.controller import AdminController
from repoze.what import predicates

from comcenter.lib.base import BaseController
from comcenter.model import DBSession2, metadata2
from comcenter import model
from comcenter.controllers.secure import SecureController

from comcenter.controllers.error import ErrorController
 

from comcenter.controllers.setupcontroller import SetupController;

from comcenter.model import *;
from comcenter.controllers.util.utility import *;

import logging;
import sys;
import simplejson as json;
log = logging.getLogger(__name__);
__all__ = ['StatisticOnlineController']


class StatisticOnlineController(BaseController):
    
    def __init__(self):
        self.util = Utility();
    
    @expose('comcenter.templates.hosxp.statisticonline')
    def index(self):
        """Handle the front-page."""
        return dict(page='statisticonline')
    
    @expose('comcenter.templates.hosxp.visitinyears')
    def report1(self,**kw):
        return dict(page='statisticonline');
    
    @expose('comcenter.templates.hosxp.patientinyears')
    def report2(self,**kw):
        return dict(page='statisticonline');
    
    @expose('comcenter.templates.hosxp.patientsexinyears')
    def report3(self,**kw):
        return dict(page='statisticonline');
    
    @expose('json')
    def visitinyear(self,**kw):
        year = self.util.isValue(kw.get('year'));
        year = self.util.buddhistToAD(year);
        self.visit = VisitTransection.queryVisitInYear(str(year));
        self.list = [];
        for i in range(1,13):
            self.list.append({'id':i,'name': self.util.getMonthThai(i) ,'data':0,'year':year});
        for v in self.visit:
            month = self.util.monthInYM(v.ym);
            va =  self.list[month -1 ];
            self.list.pop(month-1);
            self.list.insert(month-1, {'id':month,'name': self.util.getMonthThai(month) ,'data':v.count_vn,'year':year});
        return dict(root = self.list,total=str(len(self.list))); 
    
    @expose('json')
    def patientinyear(self,**kw):
        year = self.util.isValue(kw.get('year'));
        year = self.util.buddhistToAD(year);
        self.visit = VisitTransection.queryPatientInYear(str(year));
        self.list = [];
        for i in range(1,13):
            self.list.append({'id':i,'name': self.util.getMonthThai(i) ,'data':0,'year':year});
        for v in self.visit:
            month = self.util.monthInYM(v.ym);
            va =  self.list[month -1 ];
            self.list.pop(month-1);
            self.list.insert(month-1, {'id':month,'name': self.util.getMonthThai(month) ,'data':v.count_hn,'year':year});
        return dict(root = self.list,total=str(len(self.list))); 
    
    @expose('json')
    def patientsexinyear(self,**kw):
        year = self.util.isValue(kw.get('year'));
        year = self.util.buddhistToAD(year);
        self.visit = VisitTransection.queryPatientSexInYear(str(year));
        self.list = [];
        for i in range(1,13):
            self.list.append({'id':i,'name': self.util.getMonthThai(i) ,'ชาย': 0,'หญิง': 0 , 'men':0,'women':0,'year':year});
        for v in self.visit:
            month = self.util.monthInYM(v.ym);
            va =  self.list[month -1 ];
            self.list.pop(month-1);
            self.list.insert(month-1, {'id':month,'name': self.util.getMonthThai(month) ,'ชาย': v.men,'หญิง': v.women,'men':v.men ,'women':v.women,'year':year});
        return dict(root = self.list,total=str(len(self.list))); 
    
    
        