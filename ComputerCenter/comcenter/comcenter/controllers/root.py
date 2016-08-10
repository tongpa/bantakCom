# -*- coding: utf-8 -*-
"""Main Controller"""

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
from comcenter.controllers.hosxp.statisticsmanagecontroller import StatisticOnlineController;

from comcenter.controllers.setupcontroller import SetupController;
from comcenter.controllers.maintain.maintenancecontroller import MaintenanceController;
from comcenter.controllers.project.projectmanagecontroller import ProjectManageController;
from comcenter.controllers.reservation.reservationmanagecontroller import  ReservationManageController;
from comcenter.controllers.revenue.revenuemanagecontroller import RevenueManageController;
from comcenter.controllers.expenditure.expendituremanagcontroller import ExpenditureManageController;
from comcenter.controllers.dental.dentalmanagecontroller import DentalManageController;
from comcenter.controllers.riskmanagent.riskmanagecontroller import RiskManageController;
from comcenter.controllers.revenue.expensesmanagecontroller import ExpensesManageController;
from comcenter.controllers.bookinout.bookmanagecontroller import BookManageController;

import logging;
import sys;
log = logging.getLogger(__name__);
__all__ = ['RootController']


class RootController(BaseController):
    """
    The root controller for the comcenter application.

    All the other controllers and WSGI applications should be mounted on this
    controller. For example::

        panel = ControlPanelController()
        another_app = AnotherWSGIApplication()

    Keep in mind that WSGI applications shouldn't be mounted directly: They
    must be wrapped around with :class:`tg.controllers.WSGIAppController`.

    """
    
    secc = SecureController()

    #admin = AdminController(model, DBSession, config_type=TGAdminConfig)

    error = ErrorController()
    
    download = DownloadController();
    reportonline = ReportOnlineController();
    statisticonline = StatisticOnlineController();
    
    maintenance = MaintenanceController();
    setup = SetupController();
    project = ProjectManageController();
    reservation = ReservationManageController();
    revenue = RevenueManageController();
    expend = ExpenditureManageController();
    dental = DentalManageController();
    risk = RiskManageController();
    expenses = ExpensesManageController();
    
    books = BookManageController();
    
    @expose('comcenter.templates.index')
    def index(self):
        """Handle the front-page."""
        set_lang("th"); 
        session['lang'] = "th";
        session.save();
        
        return dict(page='index')

    

    @expose('comcenter.templates.environ')
    def environ(self):
        """This method showcases TG's access to the wsgi environment."""
        return dict(environment=request.environ)

      
    @expose('comcenter.templates.index')
    @require(predicates.has_permission('manage', msg=l_('Only for managers')))
    def manage_permission_only(self, **kw):
        """Illustrate how a page for managers only works."""
        return dict(page='managers stuff')

    @expose('comcenter.templates.index')
    @require(predicates.is_user('editor', msg=l_('Only for the editor')))
    def editor_user_only(self, **kw):
        """Illustrate how a page exclusive for the editor works."""
        return dict(page='editor stuff')

    @expose('comcenter.templates.login')
    def login(self, came_from=url('/')):
        """Start the user login."""
        login_counter = request.environ['repoze.who.logins']
        if login_counter > 0:
            flash(_('Wrong credentials'), 'warning')
        return dict(page='login', login_counter=str(login_counter),
                    came_from=came_from)

    @expose()
    def post_login(self, came_from='/'):
        """
        Redirect the user to the initially requested page on successful
        authentication or redirect her back to the login page if login failed.

        """
        if not request.identity:
            login_counter = request.environ['repoze.who.logins'] + 1
            redirect('/login', came_from=came_from, __logins=login_counter)
        userid = request.identity['repoze.who.userid']
        flash(_('Welcome back, %s!') % userid)
        redirect(came_from)

    @expose()
    def post_logout(self, came_from=url('/')):
        """
        Redirect the user to the initially requested page on logout and say
        goodbye as well.

        """
        flash(_('We hope to see you soon!'))
        redirect(came_from)
        
    @expose('comcenter.templates.index')
    def datacenter(self, **kw):
        
        return dict(page='datacenter');
    
    @expose()
    def createuser(self):
        model.User.createUser();
