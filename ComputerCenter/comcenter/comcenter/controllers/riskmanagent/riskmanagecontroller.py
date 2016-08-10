# coding=utf8
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
from comcenter.model import *;
from comcenter.controllers.util.utility import *;

import logging;
import sys;
log = logging.getLogger(__name__);
__all__ = ['RiskManageController']


class RiskManageController(BaseController):
    def __init__(self):
        self.util = Utility();
    
    @expose('comcenter.templates.risk.index')
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
            redirect('/risk/add');
        
        log.info("risk");
        #print "user : " + str(userid);
             
            
        return dict(page='risk',user=str(userid));
    
    @expose('comcenter.templates.risk.add')
    def add(self):
        set_lang("th");
        session['lang'] = "th";
        session.save();
        log.info("risk");
        return dict(page='risk');
    
    @expose('comcenter.templates.risk.mainreport')
    def mainreport(self):
        set_lang("th");
        session['lang'] = "th";
        session.save();
        log.info("risk");
        return dict(page='risk');
    
    @expose('comcenter.templates.risk.report1')
    def report1(self,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        set_lang("th");
        session['lang'] = "th";
        session.save();
        
        year = self.util.isValue(kw.get('year'));
        
        month = self.util.isValue(kw.get('month'));
        
        log.info("risk");
        listMonth =[];
        listMonth.append({'id':'1','value':'มกราคม'});
        listMonth.append({'id':'2','value':'กุมภาพันธ์'});
        listMonth.append({'id':'3','value':'มีนาคม'});
        listMonth.append({'id':'4','value':'เมษายน'});
        listMonth.append({'id':'5','value':'พฤษภาคม'});
        listMonth.append({'id':'6','value':'มิถุนายน'});
        listMonth.append({'id':'7','value':'กรกฎาคม'});
        listMonth.append({'id':'8','value':'สิงหาคม'});
        listMonth.append({'id':'9','value':'กันยายน'});
        listMonth.append({'id':'10','value':'ตุลาคม'});
        listMonth.append({'id':'11','value':'พฤศจิกายน'});
        listMonth.append({'id':'12','value':'ธันวาคม'});
        
        log.info(year);
        if year is None:
            year = 2558;
            
        listYear = self.util.getRangeYear(year);
        print listYear;
        
        section = None;
        pro_clinic = None;
        pro_physic = None;
        priority10 =None;
        if (month and year):
            print month;
            print year;
            date = '1/'+str(month)+'/'+str(int(year)-543);
            startDate = util.convertStringToDate(date);
            stopDate = util.last_day_of_month(startDate);
            
            startDate = startDate.strftime("%Y-%m-%d");
            stopDate = stopDate.strftime("%Y-%m-%d");
             
        
            section = RiskManagement.showSumSectionReport(startDate,stopDate);
            pro_clinic = RiskManagement.showProgramClinicReport(startDate,stopDate,1);
            pro_physic = RiskManagement.showProgramClinicReport(startDate,stopDate,2);
            priority10 = RiskManagement.listRiskPriority10(startDate,stopDate);
         
        return dict(page='risk',util=self.util,year=year,month=month,listMonth=listMonth,listYear = listYear,section=section,pro_clinic=pro_clinic ,pro_physic=pro_physic,priority10=priority10);
    
    @expose('comcenter.templates.risk.report2')
    def report2(self,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        set_lang("th");
        session['lang'] = "th";
        session.save();
        
        year = self.util.isValue(kw.get('year'));
        
        log.info(year);
        if year is None:
            year = 2558;
            
        listYear = self.util.getRangeYear(year);
                
        section=[];
        if(year):
            startDate = str(int(year)-543 -1) + '-10-01';
            stopDate = str(int(year)-543) + '-09-30';
            log.info(startDate);
            section = RiskManagement.listSectionReport(startDate,stopDate);
        
        return dict(page='risk',util=self.util,year=year,listYear = listYear,section = section);
    
     
    
    @expose('comcenter.templates.risk.report3')
    def report3(self,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        set_lang("th");
        session['lang'] = "th";
        session.save();
        
        year = self.util.isValue(kw.get('year'));
        
         
        log.info(year);
        if year is None:
            year = 2558;
            
        listYear = self.util.getRangeYear(year);
         
                
        section=[];
        self.listSectionTeam = [];
        if(year):
             
            self.riskSectionTeam = RiskTeam.listTeam(1);
            
            row=1;
            for sectionTeam in self.riskSectionTeam:
                self.listSectionTeam.append({'row':row,'risk_team_id':sectionTeam.risk_team_id ,
                                             'description':sectionTeam.description,
                                             'reported1':0,'total1':0,'reported2':0,'total2':0,
                                             'reported3':0,'total3':0,'reported4':0,'total4':0,
                                             'reported5':0,'total5':0,'reported6':0,'total6':0,
                                             'reported7':0,'total7':0,'reported8':0,'total8':0,
                                             'reported9':0,'total9':0,'reported10':0,'total10':0,
                                             'reported11':0,'total11':0,'reported12':0,'total12':0 ,
                                             'total_reported':0 ,'total':0});
                row = row+1;
                                        
            
            log.info("leng : " + str(len(self.listSectionTeam)));                            
            for month in range(10,13) :
                
                date = '1/'+str(month)+'/'+str(int(year)-543 -1);
                log.info("start : " + date);
                startDate = util.convertStringToDate(date);
                stopDate = util.last_day_of_month(startDate);
                
                startDate = startDate.strftime("%Y-%m-%d");
                stopDate = stopDate.strftime("%Y-%m-%d");
                 
                section = RiskManagement.listSectionReported(startDate,stopDate);
                
                
                for sec in section:
                    for secTeam in self.listSectionTeam:
                        if(str(sec.get('risk_team_id')) == str(secTeam.get('risk_team_id'))):
                            log.info("same11111111");
                            secTeam['reported'+str(month) ] = sec.get('reported')  ;
                            secTeam['total'+ str(month)]   = sec.get('total')   ;
                            break;
                        
            for month in range(1,10) :
                
                date = '1/'+str(month)+'/'+str(int(year)-543 );
                log.info("start : " + date);
                startDate = util.convertStringToDate(date);
                stopDate = util.last_day_of_month(startDate);
                
                startDate = startDate.strftime("%Y-%m-%d");
                stopDate = stopDate.strftime("%Y-%m-%d");
                 
                section = RiskManagement.listSectionReported(startDate,stopDate);
                
                
                for sec in section:
                    for secTeam in self.listSectionTeam:
                        if(str(sec.get('risk_team_id')) == str(secTeam.get('risk_team_id'))):
                            log.info("same11111111");
                            secTeam['reported'+str(month) ] = sec.get('reported')  ;
                            secTeam['total'+ str(month)]   = sec.get('total')   ;
                            break; 
                             
            
            for secTeam in self.listSectionTeam:
                    secTeam['total_reported']= int(secTeam['reported1'])+int(secTeam['reported2'])+int(secTeam['reported3'])+int(secTeam['reported4'])+int(secTeam['reported5'])+int(secTeam['reported6'])+int(secTeam['reported7'])+int(secTeam['reported8'])+int(secTeam['reported9'])+int(secTeam['reported10'])+int(secTeam['reported11'])+int(secTeam['reported12']);
                    secTeam['total']= int(secTeam['total1'])+int(secTeam['total2'])+int(secTeam['total3'])+int(secTeam['total4'])+int(secTeam['total5'])+int(secTeam['total6'])+int(secTeam['total7'])+int(secTeam['total8'])+int(secTeam['total9'])+int(secTeam['total10'])+int(secTeam['total11'])+int(secTeam['total12']);
            
             
        
        return dict(page='risk',util=self.util,year=year,listYear = listYear,section = self.listSectionTeam);
    
    @expose('comcenter.templates.risk.report4')
    def report4(self,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        set_lang("th");
        session['lang'] = "th";
        session.save();
        
        year = self.util.isValue(kw.get('year'));
        
        log.info(year);
        if year is None:
            year = 2558;
            
        listYear = self.util.getRangeYear(year);
                
        section=[];
        self.listSectionTeam = [];
        if(year):
            
            self.riskSectionTeam = RiskTeam.listTeam(2);
            
            row=1;
            for sectionTeam in self.riskSectionTeam:
                self.listSectionTeam.append({'row':row,'risk_team_id':sectionTeam.risk_team_id ,
                                             'description':sectionTeam.description,
                                             'reported1':0,'total1':0,'reported2':0,'total2':0,
                                             'reported3':0,'total3':0,'reported4':0,'total4':0,
                                             'reported5':0,'total5':0,'reported6':0,'total6':0,
                                             'reported7':0,'total7':0,'reported8':0,'total8':0,
                                             'reported9':0,'total9':0,'reported10':0,'total10':0,
                                             'reported11':0,'total11':0,'reported12':0,'total12':0 ,
                                             'total_reported':0 ,'total':0});
                row = row+1;
                                        
            
            log.info("leng : " + str(len(self.listSectionTeam)));                            
            for month in range(10,13) :
                
                date = '1/'+str(month)+'/'+str(int(year)-543 - 1);
                log.info("start : " + date);
                startDate = util.convertStringToDate(date);
                stopDate = util.last_day_of_month(startDate);
                
                startDate = startDate.strftime("%Y-%m-%d");
                stopDate = stopDate.strftime("%Y-%m-%d");
                 
                section = RiskManagement.listSectionReported(startDate,stopDate);
                
                
                for sec in section:
                    for secTeam in self.listSectionTeam:
                        if(str(sec.get('risk_team_id')) == str(secTeam.get('risk_team_id'))):
                            log.info("same11111111");
                            secTeam['reported'+str(month) ] = sec.get('reported')  ;
                            secTeam['total'+ str(month)]   = sec.get('total')   ;
                            break;
                        
            for month in range(1,10) :
                
                date = '1/'+str(month)+'/'+str(int(year)-543);
                log.info("start : " + date);
                startDate = util.convertStringToDate(date);
                stopDate = util.last_day_of_month(startDate);
                
                startDate = startDate.strftime("%Y-%m-%d");
                stopDate = stopDate.strftime("%Y-%m-%d");
                 
                section = RiskManagement.listSectionReported(startDate,stopDate);
                
                
                for sec in section:
                    for secTeam in self.listSectionTeam:
                        if(str(sec.get('risk_team_id')) == str(secTeam.get('risk_team_id'))):
                            log.info("same11111111");
                            secTeam['reported'+str(month) ] = sec.get('reported')  ;
                            secTeam['total'+ str(month)]   = sec.get('total')   ;
                            break; 
                             
            
            for secTeam in self.listSectionTeam:
                    secTeam['total_reported']= int(secTeam['reported1'])+int(secTeam['reported2'])+int(secTeam['reported3'])+int(secTeam['reported4'])+int(secTeam['reported5'])+int(secTeam['reported6'])+int(secTeam['reported7'])+int(secTeam['reported8'])+int(secTeam['reported9'])+int(secTeam['reported10'])+int(secTeam['reported11'])+int(secTeam['reported12']);
                    secTeam['total']= int(secTeam['total1'])+int(secTeam['total2'])+int(secTeam['total3'])+int(secTeam['total4'])+int(secTeam['total5'])+int(secTeam['total6'])+int(secTeam['total7'])+int(secTeam['total8'])+int(secTeam['total9'])+int(secTeam['total10'])+int(secTeam['total11'])+int(secTeam['total12']);
            
             
        
        return dict(page='risk',util=self.util,year=year,listYear = listYear,section = self.listSectionTeam);
    
    
    @expose('comcenter.templates.risk.report')
    def reportsearch(self, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        log.info(kw);
        year = self.util.isValue(kw.get('year'));
        month = self.util.isValue(kw.get('month'));
        
        return dict(page='risk',year=year,month=month);
    
    @expose('json')
    def getUser(self,**kw):
        if request.identity:
            userid = request.identity['repoze.who.userid'];
        else:
            userid = None;
        list  = {'id':userid,'name':userid};
        return dict(root = list );
    
    @expose('json')
    def listRiskLevel(self ,**kw):
         
        self.risk_program_group_id = self.util.isValue(kw.get('risk_program_group_id')); 
        
        
        if(self.risk_program_group_id == '2'):
            self.listLevel = RiskLevel.listRiskByClinical();
        else:
            self.listLevel = RiskLevel.listRiskByPhysical();
            
        self.listDataRiskLevel = [];
        self.listDataRiskLevel.append({'id':'0','name':'*'});
        if(self.listLevel):
            for value in self.listLevel:
                self.listDataRiskLevel.append({'id':value.risk_level_id,'name':value.description +" " + self.util.valueNull(value.effective) }); 
        return dict(root = self.listDataRiskLevel,total=str(len(self.listDataRiskLevel)));
    
    @expose('json')
    def listTeamRespose(self,**kw):
        self.team_type = self.util.isValue(kw.get('team_type')); 
        self.riskTeam = RiskTeam.listTeam(self.team_type);
        self.list = [];
        if(self.riskTeam):
            for value in self.riskTeam:
                self.list.append({'id':value.risk_team_id,'name':value.description}); 
        return dict(root = self.list,total=str(len(self.list)));
    @expose('json')
    def listRiskStatus(self,**kw):
        self.listType = RiskStatus.listAll();
        self.list = [];
        self.list.append({'id':'0','name':'*'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.risk_status_id,'name':value.description}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    @expose('json')
    def listSection(self ,**kw):
        self.listType = RiskSection.listAll();
        self.list = [];
        self.list.append({'id':'0','name':'*'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.risk_section_id,'name':value.description}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    
    @expose('json')
    def listProgramGroup(self ,**kw):
        self.listType = RiskProgramGroup.listAll();
        self.list = [];
        self.list.append({'id':'0','name':'*'});
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.risk_program_group_id,'name':value.description}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    @expose('json')
    def listProgramDetail (self, **kw):
        self.list = [];
        self.list.append({'id':'0','name':'*'});
        groupId = self.util.isValue(kw.get('risk_program_group_id'));
        self.listType = RiskProgramDetail.listAllByGroup(groupId);
        if(self.listType):
            for value in self.listType:
                self.list.append({'id':value.risk_program_detail_id,'name':value.description}); 
        return dict(root = self.list,total=str(len(self.list)));
    
    @expose('json')
    def showRiskManage(self,**kw):
        self.startDate = self.util.spitStringDate(kw.get('startDate'));
        self.stopDate = self.util.spitStringDate(kw.get('stopDate'));
        self.riskSection = self.util.isValue(kw.get('riskSection'));
        self.riskProgramGroup = self.util.isValue(kw.get('riskProgramGroup'));
        self.riskStatus = self.util.isValue(kw.get('riskStatus'));
        self.riskProgramDetail= self.util.isValue(kw.get('riskProgramDetail'));
        self.riskId= self.util.isValue(kw.get('riskJobId'));
        
        log.info(self.startDate);
        log.info(self.stopDate);
        log.info(self.riskSection);
        log.info(self.riskProgramGroup);
        log.info(self.riskStatus);
        log.info(self.riskProgramDetail);
        log.info(self.riskId);
        
        
        self.list = RiskManagement.showRiskManage(self.startDate, self.stopDate, self.riskSection, self.riskProgramGroup, self.riskStatus,self.riskProgramDetail ,self.riskId );
        
        return dict(root = self.list,total=str(len(self.list)));
    @expose('json')
    def createRisk(self, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.message ="sucess";
        self.success = True;
        try:
            log.info("create risk");
            log.info(kw);
            #kw.get('risk_management_id');
            self.risk_level = kw.get('risk_level_id');
            self.risk_program = kw.get('risk_program');
            self.risk_section = kw.get('risk_section_id');
            self.detail = kw.get('detail');
            self.report_date = self.util.convertStringToDate(kw.get('report_date')) ;
            self.risk_program_detail = kw.get('risk_program_detail');
            self.risk_management_id = self.util.isValue(kw.get('risk_management_id'));
             
            if(self.risk_management_id ):
                
                self.risk_status = self.util.isValue(kw.get('risk_status_id'));
                
                self.crom_team = self.util.isValue(kw.get('crom_team'));
                self.section_team = self.util.isValue(kw.get('section_team'));
                
                
                self.risk = RiskManagement.getById(self.risk_management_id);
                self.risk.detail = self.detail;
                self.risk.risk_level_id = self.risk_level;
                self.risk.risk_section_id = self.risk_section;
                self.risk.risk_program_detail_id = self.risk_program_detail;
                
                if(self.risk.risk_status_id == 1):
                    self.risk.risk_status_id = 2 ;
                #self.risk.risk_status_id = 1;
                #self.risk.report_date =  self.report_date;
                log.info("=====save=====");
                RiskResponsible.saveByTeam(self.crom_team, self.risk.risk_management_id);
                RiskResponsible.saveByTeam(self.section_team, self.risk.risk_management_id);
                
                log.info(self.crom_team);
            else:
                self.risk = RiskManagement();
                self.risk.detail = self.detail;
                self.risk.risk_level_id = self.risk_level;
                self.risk.risk_section_id = self.risk_section;
                self.risk.risk_program_detail_id = self.risk_program_detail;
                self.risk.risk_status_id = 1;
                self.risk.report_date =  self.report_date;
                self.risk.save();
         
        except Exception, exception:
            log.info("error : " + str(exception));
            self.message ="fail";
            self.success = False;
            
        return dict(success=self.success, message = self.message);
    
    @expose('json')
    def sendTeam(self,**kw):
        self.message ="sucess";
        self.success = True;
        try:
            log.info("create risk");
            log.info(kw);
            #kw.get('risk_management_id');
            self.risk_level = kw.get('risk_level_id');
            self.risk_program = kw.get('risk_program');
            self.risk_section = kw.get('risk_section_id');
            self.detail = kw.get('detail');
            self.report_date = self.util.convertStringToDate(kw.get('report_date')) ;
            self.risk_program_detail = kw.get('risk_program_detail');
            self.risk_management_id = self.util.isValue(kw.get('risk_management_id'));
             
             
                
            self.risk_status = self.util.isValue(kw.get('risk_status_id'));
            
            self.crom_team = self.util.isValue(kw.get('crom_team'));
            self.section_team = self.util.isValue(kw.get('section_team'));
            
            
            self.risk = RiskManagement.getById(self.risk_management_id);
            self.risk.detail = self.detail;
            self.risk.risk_level_id = self.risk_level;
            self.risk.risk_section_id = self.risk_section;
            self.risk.risk_program_detail_id = self.risk_program_detail;
            
            if(self.risk.risk_status_id <3):
                self.risk.risk_status_id = 3; 
            
             
            #self.risk.risk_status_id = 1;
            #self.risk.report_date =  self.report_date;
            log.info("=====save=====");
            RiskResponsible.saveByTeam(self.crom_team, self.risk.risk_management_id);
            RiskResponsible.saveByTeam(self.section_team, self.risk.risk_management_id);
            log.info(self.crom_team);
             
         
        except Exception, exception:
            log.info("error : " + str(exception));
            self.message ="fail";
            self.success = False;
            
        return dict(success=self.success, message = self.message);
    
    @expose('json')
    def findRiskResponsible(self, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.listresponse = [];
        #self.risk_team = self.util.isValue(kw.get('risk_team')); 
        self.risk_team = self.util.getArrayComma(kw.get('risk_team'));
        self.risk_namager = self.util.isValue(kw.get('risk_namager'));
        self.riskResponse = RiskResponsible.listByTeamsAndRiskManage(self.risk_team,self.risk_namager );
        if(self.riskResponse):
            for value in self.riskResponse:
                self.listresponse.append({'id':value.risk_team_id,'name':value.risk_team.description,'detail':value.detail}); 
                 
        return dict(root = self.listresponse,total=str(len(self.listresponse)));
    
    @expose('json')
    def findRiskResponsible_old(self, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        
        self.risk_team = self.util.isValue(kw.get('risk_team')); 
        self.risk_namager = self.util.isValue(kw.get('risk_namager'));
        name= self.util.isValue(kw.get('name'));
        self.riskResponse = RiskResponsible.getTeamByTeamTypeAndRiskManage(self.risk_team,self.risk_namager );
        self.list = [];
        if(self.riskResponse):
            for value in self.riskResponse:
                self.list.append({'id':value.risk_team_id,'name':name,'detail':value.detail}); 
        return dict(root = self.list,total=str(len(self.list)));
     
    @expose('json')
    def replayRisk(self,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.message ="sucess";
        self.success = True; 
        try:
            #self.risk_level = kw.get('risk_level_id');
            #self.risk_program = kw.get('risk_program');
            #self.risk_section = kw.get('risk_section_id');
            #self.detail = kw.get('detail');
            #self.report_date = self.util.convertStringToDate(kw.get('report_date')) ;
            #self.risk_program_detail = kw.get('risk_program_detail');
            self.risk_management_id = self.util.isValue(kw.get('risk_management_id'));
             
            if(self.risk_management_id ):
                
                self.risk_status = self.util.isValue(kw.get('risk_status_id'));
                
                self.crom_team = self.util.isValue(kw.get('crom_team'));
                self.section_team = self.util.isValue(kw.get('section_team'));
                
                
                #self.risk = RiskManagement.getById(self.risk_management_id);
                reply_success = False;
                log.info("-------update crom_team");
                if(self.crom_team):
                    listteam = self.crom_team.split(',');
                    
                    for team in listteam:
                        details = self.util.isValue(kw.get('details'+str(team))); 
                        if(details):          
                            reply_success = True;         
                            RiskResponsible.updateDetailByTeamAndRisk(team, self.risk_management_id, details);
                         
                            log.info("update : " + team);
                log.info("-------update section_team");
                if(self.section_team):
                    listteam = self.section_team.split(',');
                    for team in listteam:
                        details = self.util.isValue(kw.get('details'+str(team)));
                        if(details):      
                            reply_success = True;              
                            RiskResponsible.updateDetailByTeamAndRisk(team, self.risk_management_id, details);
                            log.info("update : " + team);
                         
                        
                if(reply_success == True):
                    self.risk = RiskManagement.getById(self.risk_management_id);
                    if(self.risk.risk_status_id == 3):
                        self.risk.risk_status_id = 4;
                #log.info(self.crom_team);
                
        except Exception, exception:
            log.info("error : " + str(exception));
            self.message ="fail";
            self.success = False;
            
        return dict(success=self.success, message = self.message);
