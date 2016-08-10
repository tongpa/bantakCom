
from tg import expose, flash, require, url, request, redirect
from pylons.i18n import ugettext as _, lazy_ugettext as l_
from tgext.admin.tgadminconfig import TGAdminConfig
from tgext.admin.controller import AdminController
from repoze.what import predicates

from comcenter.lib.base import BaseController
from comcenter.model import DBSession, metadata
from comcenter import model
from comcenter.controllers.secure import SecureController

from comcenter.controllers.error import ErrorController
import urllib2 ;
__all__ = ['DownloadController']


class DownloadController(BaseController):
    
    @expose('comcenter.templates.download')
    def index(self):
        """Handle the front-page."""
        return dict(page='download')
    
    @expose('comcenter.templates.download.software')
    def software(self):
        
        for req in request.environ:
            if isinstance(req,basestring):
                print req;
                print request.environ[req];
                #print str(req) + " --  " + request.environ[req] ;
        #request.envirn;
        
        return dict(page='download');