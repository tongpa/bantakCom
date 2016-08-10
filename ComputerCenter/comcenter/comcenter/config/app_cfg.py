# -*- coding: utf-8 -*-
"""
Global configuration file for TG2-specific settings in comcenter.

This file complements development/deployment.ini.

Please note that **all the argument values are strings**. If you want to
convert them into boolean, for example, you should use the
:func:`paste.deploy.converters.asbool` function, as in::
    
    from paste.deploy.converters import asbool
    setting = asbool(global_conf.get('the_setting'))
 
"""

from tg.configuration import AppConfig, config

from pylons import config as pylons_config


import comcenter
from comcenter import model
from comcenter.lib import app_globals, helpers 

class MultiDBAppConfig(AppConfig):
    def setup_sqlalchemy(self):
        from sqlalchemy import engine_from_config;
        engine1 = engine_from_config(pylons_config,'sqlalchemy.first.');
        engine2 = engine_from_config(pylons_config,'sqlalchemy.second.');
        
        config['pylons.app_globals'].sa_engine = engine1;
        config['pylons.app_globals'].sa_engine_first = engine1;
        config['pylons.app_globals'].sa_engine_second = engine2;
        model.init_model(engine1, engine2);
        

base_config = MultiDBAppConfig();

#base_config = AppConfig()
base_config.renderers = []

base_config.package = comcenter

#Enable json in expose
base_config.renderers.append('json')
#Set the default renderer
base_config.default_renderer = 'genshi'
base_config.renderers.append('genshi')
# if you want raw speed and have installed chameleon.genshi
# you should try to use this renderer instead.
# warning: for the moment chameleon does not handle i18n translations
#base_config.renderers.append('chameleon_genshi')
#Configure the base SQLALchemy Setup
base_config.use_sqlalchemy = True
base_config.model = comcenter.model
base_config.DBSession = comcenter.model.DBSession
# Configure the authentication backend

# YOU MUST CHANGE THIS VALUE IN PRODUCTION TO SECURE YOUR APP 
base_config.sa_auth.cookie_secret = "ChangeME" 

base_config.auth_backend = 'sqlalchemy'
base_config.sa_auth.dbsession = model.DBSession
# what is the class you want to use to search for users in the database
base_config.sa_auth.user_class = model.User
# what is the class you want to use to search for groups in the database
base_config.sa_auth.group_class = model.Group
# what is the class you want to use to search for permissions in the database
base_config.sa_auth.permission_class = model.Permission

# override this if you would like to provide a different who plugin for
# managing login and logout of your application
base_config.sa_auth.form_plugin = None

# override this if you are using a different charset for the login form
base_config.sa_auth.charset = 'utf-8'

# You may optionally define a page where you want users to be redirected to
# on login:
base_config.sa_auth.post_login_url = '/post_login'

# You may optionally define a page where you want users to be redirected to
# on logout:
base_config.sa_auth.post_logout_url = '/post_logout'
