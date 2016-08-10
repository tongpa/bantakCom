
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

__all__ = ['ReportOnlineController']


class ReportOnlineController(BaseController):
    
    @expose('comcenter.templates.reportonline')
    def index(self):
        """Handle the front-page."""
        return dict(page='reportonline')