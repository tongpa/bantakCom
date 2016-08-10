
from tg import expose, flash, require, url, request, redirect,session
from pylons.i18n import ugettext as _, lazy_ugettext as l_
from tg.i18n import set_lang,get_lang
from tgext.admin.tgadminconfig import TGAdminConfig
from tgext.admin.controller import AdminController
from repoze.what import predicates
from repoze.what.predicates import has_permission
from comcenter.lib.base import BaseController
from comcenter.model import DBSession, metadata
from comcenter import model
from comcenter.controllers.secure import SecureController

from comcenter.controllers.error import ErrorController

import logging;
import sys;
log = logging.getLogger(__name__);

__all__ = ['SetupController']

class SetupController(BaseController):
    
    allow_only = has_permission('manage',
                                msg=l_('Only for people with the "manage" permission'))
    
    @expose('comcenter.templates.setup')
    def index(self):
        """Handle the front-page."""
        if not request.identity:
            redirect('/login')
             
        return dict(page='setup')