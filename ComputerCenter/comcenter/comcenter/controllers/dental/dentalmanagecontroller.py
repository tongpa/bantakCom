from tg import expose, flash, require, url, request, redirect,session, response
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
import simplejson as json;
log = logging.getLogger(__name__);
__all__ = ['DentalManageController']


class DentalManageController(BaseController):
    
    def __init__(self):
        self.util = Utility();
    
    @expose('comcenter.templates.dental.map')
    def map(self):
        return dict(page='dental');
    @expose('comcenter.templates.dental.index')
    def index(self):
        print "Index revenue";
        """Handle the front-page."""
        set_lang("th"); 
        session['lang'] = "th";
        session.save();
        userid = "";
        if request.identity:
            userid = request.identity['repoze.who.userid']
      #  else:
      #      redirect('/revenue/summary');
            
        
        log.info("dental");
            #print "user : " + str(userid);
        return dict(page='dental');
    
    
    @expose('json')
    def listSchool(self,**kw):
        self.listType = School.listPrimarySchool();
        self.list = [];
       # self.list.append({'id':'0','name':'*'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.school_id,'name':value.school_name}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    
    @expose('json')
    def listChildDevCenter(self,**kw):
        self.listType = ChildDevCenter.listAll();
        self.list = [];
       # self.list.append({'id':'0','name':'*'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.child_dev_center_id,'name':value.child_dev_name}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    @expose('json')
    def listSeniorClub(self,**kw):
        self.listType = SeniorClub.listAll();
        self.list = [];
       # self.list.append({'id':'0','name':'*'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.senior_club_id,'name':value.senior_club_name}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    @expose('json')
    def listDentalSchoolKpiGroup(self,**kw):
        self.listType = DentalSchoolKpiGroup.listAll();
        self.list = [];
       # self.list.append({'id':'0','name':'*'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.dental_school_kpi_group_id,'name':value.detail}); 
        return dict(root = self.list,total=str(len(self.list)));
   
    @expose('json')
    def listDentalSchoolKpi(self,**kw):
        
        kpigroup = self.util.isValue(kw.get('kpigroup'));
        schoollist =  self.util.isValue(kw.get('schoollist'));
        fiscalyear =  self.util.isValue(kw.get('fiscalyear'));
        log.info('kpigroup : ' + str(kpigroup));
        log.info('schoollist : ' + str(schoollist));
        log.info('fiscalyear : ' + str(fiscalyear));
        
        self.listType = DentalSchoolService.serviceShowBySchoolandGroupKPI(str(schoollist),str(fiscalyear),str(kpigroup));
        self.list = [];
       # self.list.append({'id':'0','name':'*'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.dental_school_kpi_id,
                                  'name':value.detail,
                                  'value':value.value,
                                  'serviceid': value.dental_school_service_id,
                                  'kpigroup':self.util.ifNull(value.dental_school_kpi_group_id, kpigroup),
                                  'schoollist':self.util.ifNull(value.school_id, schoollist),
                                  'fiscalyear':fiscalyear}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    
    @expose('json')
    def listDentalSeniorKpi(self,**kw):
        
         
        seniorclub =  self.util.isValue(kw.get('seniorclub'));
        fiscalyear =  self.util.isValue(kw.get('fiscalyear'));
        
        log.info('seniorclub : ' + str(seniorclub));
        log.info('fiscalyear : ' + str(fiscalyear));
        
        self.listType = DentalSeniorClubService.serviceShowByClub(str(seniorclub),str(fiscalyear) );
        self.list = [];
       # self.list.append({'id':'0','name':'*'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.dental_senior_club_kpi_id,
                                  'name':value.detail,
                                  'value':value.value,
                                  'serviceid': value.dental_senior_club_service_id,
                                  'seniorclub':self.util.ifNull(value.senior_club_id, seniorclub),                                   
                                  'fiscalyear':fiscalyear}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    @expose('json')
    def listDentalChildDevKpi(self,**kw):
        
         
        childdev =  self.util.isValue(kw.get('childdev'));
        fiscalyear =  self.util.isValue(kw.get('fiscalyear'));
        
        log.info('childdev : ' + str(childdev));
        log.info('fiscalyear : ' + str(fiscalyear));
        
        self.listType = DentalChildDevCenterService.serviceShowByChildDevCenter(str(childdev),str(fiscalyear) );
        self.list = [];
       # self.list.append({'id':'0','name':'*'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.dental_child_dev_center_kpi_id,
                                  'name':value.detail,
                                  'value':value.value,
                                  'serviceid': value.dental_child_dev_center_service_id,
                                  'childdev':self.util.ifNull(value.child_dev_center_id, childdev),                                   
                                  'fiscalyear':fiscalyear}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    @expose('json')
    def showDentalSeniorClubKpi(self,**kw):
        fiscalyear =  self.util.isValue(kw.get('fiscalyear'));
        log.info('fiscalyear : ' + str(fiscalyear));
        
        self.listType = DentalSeniorClubService.serviceShowAllKPIBySenior( str(fiscalyear) );
        self.list = [];
        if(self.listType):
            
            kpi1 = [];
            kpi2 = [];
            kpi3 = []; 
            
            for value in self.listType:
                kpi1.append(value.kpi1);
                kpi2.append(value.kpi2);
                kpi3.append(value.kpi3);  
                
                self.list.append({ 'id': value.senior_club_id,
                                   'name' : value.senior_club_name,                                   
                                   'kpi1' :  value.kpi1   ,                                   
                                   'kpi2' :   value.kpi2 ,                                   
                                   'kpi3' :   value.kpi3 ,                                    
                                   'sortkpi1': 0,                                   
                                   'sortkpi2': 0 ,                                   
                                   'sortkpi3': 0  
                                   });
                               
            kpi1.sort();
            kpi2.sort();
            kpi3.sort();
             
            maxkpi1 = max(kpi1);
            maxkpi2 =  max(kpi2);
            maxkpi3 =  max(kpi3);
            
            
            for value in self.list:
                value['sortkpi1'] =  "%.2f" % round( (value['kpi1'] * 100) / maxkpi1 ,2) ;
                value['sortkpi2'] =  "%.2f" % round( (value['kpi2'] * 100) / maxkpi2 ,2) ;
                value['sortkpi3'] =  "%.2f" % round( (value['kpi3'] * 100) / maxkpi3 ,2) ;
               
                value['kpi1'] = "%.2f" % round(  value['kpi1']  ,2) ;
                value['kpi2'] = "%.2f" % round(  value['kpi2']  ,2) ;
                value['kpi3'] = "%.2f" % round(  value['kpi3']  ,2) ;
                 
            
             
                                  
        return dict(root = self.list,total=str(len(self.list)));
    
        
    @expose('json')
    def showDentalSchoolKpi(self,**kw):
        fiscalyear =  self.util.isValue(kw.get('fiscalyear'));
        log.info('fiscalyear : ' + str(fiscalyear));
        
        self.listType = DentalSchoolService.serviceShoAllKPIBySchool( str(fiscalyear) );
        self.list = [];
        if(self.listType):
            
            kpi1 = [];
            kpi2 = [];
            kpi3 = [];
            kpi4 = [];
            
            for value in self.listType:
                kpi1.append(value.kpi1);
                kpi2.append(value.kpi2);
                kpi3.append(value.kpi3);
                kpi4.append(value.kpi4);
                
                #kpi1.append({'dev_center_id':value.child_dev_center_id,'a' : value.kpi1,'sorted':0});
                #kpi2.append({'dev_center_id':value.child_dev_center_id, 'a' : value.kpi2,'sorted':0});
                
                self.list.append({ 'id': value.school_id,
                                   'name' : value.school_name,                                   
                                   'kpi1' :  value.kpi1   ,                                   
                                   'kpi2' :   value.kpi2 ,                                   
                                   'kpi3' :   value.kpi3 ,
                                   'kpi4' :   value.kpi4 ,
                                   'sortkpi1': 0,                                   
                                   'sortkpi2': 0 ,                                   
                                   'sortkpi3': 0 ,                                   
                                   'sortkpi4': 0  
                                   });
                               
            kpi1.sort();
            kpi2.sort();
            kpi3.sort();
            kpi4.sort();
            maxkpi1 = max(kpi1);
            maxkpi2 =  max(kpi2);
            maxkpi3 =  max(kpi3);
            maxkpi4 =  max(kpi4);
            
            for value in self.list:
                value['sortkpi1'] =  "%.2f" % round( (value['kpi1'] * 100) / maxkpi1 ,2) ;
                value['sortkpi2'] =  "%.2f" % round( (value['kpi2'] * 100) / maxkpi2 ,2) ;
                value['sortkpi3'] =  "%.2f" % round( (value['kpi3'] * 100) / maxkpi3 ,2) ;
                
               # log.info(value['sortkpi3']);
                
                 
             
                
                if  float(value['sortkpi3'])  == float(0.00):
                    
                    value['sortkpi3'] =  100;
                
                value['sortkpi4'] =  "%.2f" % round( (value['kpi4'] * 100) / maxkpi4 ,2) ;
                value['kpi1'] = "%.2f" % round(  value['kpi1']  ,2) ;
                value['kpi2'] = "%.2f" % round(  value['kpi2']  ,2) ;
                value['kpi3'] = "%.2f" % round(  value['kpi3']  ,2) ;
                value['kpi4'] = "%.2f" % round(  value['kpi4']  ,2) ;
            
             
                                  
        return dict(root = self.list,total=str(len(self.list)));
        
    
    @expose('json')
    def showDentalChildDevKpi(self,**kw):
        fiscalyear =  self.util.isValue(kw.get('fiscalyear'));
        
         
        log.info('fiscalyear : ' + str(fiscalyear));
        
        self.listType = DentalChildDevCenterService.serviceShoAllKPIByChildDevCenter( str(fiscalyear) );
        self.list = [];
       # self.list.append({'id':'0','name':'*'});
        if(self.listType):
            
            kpi1 = [];
            kpi2 = [];
            for value in self.listType:
                kpi1.append(value.kpi1);
                kpi2.append(value.kpi2);
                
                #kpi1.append({'dev_center_id':value.child_dev_center_id,'a' : value.kpi1,'sorted':0});
                #kpi2.append({'dev_center_id':value.child_dev_center_id, 'a' : value.kpi2,'sorted':0});
                
                self.list.append({ 'id': value.child_dev_center_id,
                                   'name' : value.child_dev_name,                                   
                                   'kpi1' :  value.kpi1   ,                                   
                                   'kpi2' :   value.kpi2 ,                                   
                                   'sortkpi1': 0,                                   
                                   'sortkpi2': 0  
                                   });
                               
            kpi1.sort();
            kpi2.sort();
            maxkpi1 = max(kpi1);
            maxkpi2 =  max(kpi2);
            
            for value in self.list:
                value['sortkpi1'] =  "%.2f" % round( (value['kpi1'] * 100) / maxkpi1 ,2) ;
                value['sortkpi2'] =  "%.2f" % round( (value['kpi2'] * 100) / maxkpi2 ,2) ;
                value['kpi1'] = "%.2f" % round(  value['kpi1']  ,2) ;
                value['kpi2'] = "%.2f" % round(  value['kpi2']  ,2) ;
            """
            for i in range(len(kpi1)):
                kpi1[i]['sorted'] = i; 
                for value in self.list:
                    if kpi1[i]['dev_center_id'] == value['id']:
                        value['sortkpi1'] = i;
                        break;
            
            for i in range(len(kpi2)):
                kpi2[i]['sorted'] = i;  
                for value in self.list:
                    if kpi2[i]['dev_center_id'] == value['id']:
                        value['sortkpi2'] = i;
                        break;      
            """ 
             
                                  
        return dict(root = self.list,total=str(len(self.list)));
    
    @expose('json')
    def saveDentalSchoolService(self,_dc,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        log.info(kw);
        log.info("+++++++");
        log.info(" " + str(request.method) ); #POST
        log.info(" " + str(request.params['data']) );
         
        

        return dict(success = True,kw=kw,data=[]);
    
    @expose('json')
    def updateDentalSchoolService(self,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        log.info(kw);
        #log.info( request.headers);
        
        data = request.body;
        fields = json.loads(data);
        
        values = fields.get('data');
        services = [];
        if 'serviceid' in values:
            log.info("1 record");
            services.append(values);
        else:
            log.info("more records");
            services = values;
            
        for value in services:
            serviceid = value.get('serviceid');
            if(serviceid):
                dentalService = DentalSchoolService.getById(serviceid);
                dentalService.value = value.get('value');
                log.info("update success: " + str(serviceid));
            else:
                
                dentalService = DentalSchoolService();
                dentalService.school_id = value.get('schoollist');
                dentalService.dental_school_kpi_id = value.get('id');
                dentalService.fiscal_year = value.get('fiscalyear');
                dentalService.value = value.get('value');
                dentalService.school_class_id = 2;
                dentalService.save();
                log.info("save success: "  );
        
        response.headers['Content-Type'] = 'text/html';       
        return  json.dumps(dict(success = True,message="update success" ,data = values));
        #return dict(success = True,message="update success" ,data = values);
        
    @expose('json')
    def updateDentalSeniorService(self,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        log.info(kw);
        #log.info( request.headers);
        
        data = request.body;
        fields = json.loads(data);
        
        values = fields.get('data');
        services = [];
        if 'serviceid' in values:
            log.info("1 record");
            services.append(values);
        else:
            log.info("more records");
            services = values;
            
        for value in services:
            serviceid = value.get('serviceid');
            if(serviceid):
                dentalService = DentalSeniorClubService.getById(serviceid);
                dentalService.value = value.get('value');
                log.info("update success: " + str(serviceid));
            else:
                
                dentalService = DentalSeniorClubService();
                dentalService.senior_club_id  =  value.get('seniorclub');
                dentalService.dental_senior_club_kpi_id = value.get('id');
                dentalService.fiscal_year  = value.get('fiscalyear');
                dentalService.value =   value.get('value');
                
              
                dentalService.save();
                log.info("save success: "  );
        
        response.headers['Content-Type'] = 'text/html';       
        return  json.dumps(dict(success = True,message="update success" ,data = values));
    
    
    