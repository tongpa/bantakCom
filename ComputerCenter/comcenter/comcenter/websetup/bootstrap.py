# -*- coding: utf-8 -*-
"""Setup the comcenter application"""

import logging
from tg import config
from comcenter import model
from comcenter.model.maintain import *;
import transaction


def bootstrap(command, conf, vars):
    """Place any commands to setup comcenter here"""

    # <websetup.bootstrap.before.auth
    from sqlalchemy.exc import IntegrityError
    try:
        """ 
        u = model.User()
        u.user_name = u'manager'
        u.display_name = u'Example manager'
        u.email_address = u'manager@somedomain.com'
        u.password = u'managepass'
    
        model.DBSession.add(u)
    
        g = model.Group()
        g.group_name = u'managers'
        g.display_name = u'Managers Group'
    
        g.users.append(u)
    
        model.DBSession.add(g)
    
        p = model.Permission()
        p.permission_name = u'manage'
        p.description = u'This permission give an administrative right to the bearer'
        p.groups.append(g)
    
        model.DBSession.add(p)
    
        u1 = model.User()
        u1.user_name = u'editor'
        u1.display_name = u'Example editor'
        u1.email_address = u'editor@somedomain.com'
        u1.password = u'editpass'
    
        model.DBSession.add(u1)
        model.DBSession.flush()
        
        """
        """ 
        type = MaintenanceType();
        type.description = 'คอมพิวเตอร์';
        type.save();
        
        type = MaintenanceType();
        type.description = 'โปรแกรม';
        type.save();
        
        type = MaintenanceType();
        type.description = 'ข้อมูล';
        type.save();
        
        type = MaintenanceType();
        type.description = 'เครือข่าย';
        type.save();
        
        type = MaintenanceType();
        type.description = 'โทรศัพท์';
        type.save();
        
        type = MaintenanceType();
        type.description = 'โทรทัศน์';
        type.save();
 

        #risk
        riskLevel = model.RiskLevel();
        riskLevel.initData();
        
        riskProgramDetail = model.RiskProgramDetail();
        riskProgramDetail.initData();
        
        riskStatus = model.RiskStatus();
        riskStatus.initData();
        
        riskSection = model.RiskSection();
        riskSection.initData();
        
        
        riskTeam = model.RiskTeam();
        riskTeam.initData();
       
        
       
   
        #book
        book = model.BookType();
        book.initData();
        
        transaction.commit()
         """  
        #pass;
    except IntegrityError:
        print 'Warning, there was a problem adding your auth data, it may have already been added:'
        import traceback
        print traceback.format_exc()
        transaction.abort()
        print 'Continuing with bootstrapping...'
        

    # <websetup.bootstrap.after.auth>
