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
 
from comcenter.model import MaintenanceType, Division;

import logging;
import sys;
log = logging.getLogger(__name__);
__all__ = ['MaintenanceController']


class MaintenanceController(BaseController):
    
    @expose('comcenter.templates.maintain.index')
    def index(self):
        print "Index maintenance";
        """Handle the front-page."""
        set_lang("th"); 
        session['lang'] = "th";
        session.save();
        userid = "";
        if request.identity:
            userid = request.identity['repoze.who.userid']
            print "user : " + str(userid);
        return dict(page='index')
    
    @expose()
    def createMaintain(self, **kw):
        print kw;
        
        pass;
    
    @expose('json')
    def listDivision(self ,**kw):
        
        self.listType = Division.listAll();
        self.list = [];
        self.list.append({'id':'0','name':'*'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.division_id,'name':value.description}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    @expose('json')
    def listMaintenaceType(self ,**kw):
        
        self.listType = MaintenanceType.listAll();
        self.list = [];
        self.list.append({'id':'0','name':'*'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.mtn_type_id,'name':value.description}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    
        
        
        