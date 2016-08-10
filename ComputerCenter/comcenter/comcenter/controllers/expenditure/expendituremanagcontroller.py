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
__all__ = ['ExpenditureManageController']


class ExpenditureManageController(BaseController):
    
    def __init__(self):
        self.util = Utility();
        
    
    @expose('comcenter.templates.expend.index')
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
            redirect('/expend/summary');
            
        
        log.info("revenue");
            #print "user : " + str(userid);
        return dict(page='expend');
    
    
    @expose('comcenter.templates.expend.summary')
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
        return dict(page='expend')