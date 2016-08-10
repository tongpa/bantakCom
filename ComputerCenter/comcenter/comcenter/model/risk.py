# -*- coding: utf-8 -*-
import os
from datetime import datetime
import sys
try:
    from hashlib import sha1
except ImportError:
    sys.exit('ImportError: No module named hashlib\n'
             'If you are on python2.4 this library is not part of python. '
             'Please install it. Example: easy_install hashlib')

from sqlalchemy import Table, ForeignKey, Column
from sqlalchemy.types import Unicode, Integer, DateTime, String, Text
from sqlalchemy.orm import relation, synonym
from sqlalchemy import *;
from sqlalchemy import schema as saschema 
from comcenter.model import DeclarativeBase, metadata, DBSession
from sqlalchemy.sql.expression import *;
import logging;
import sys;
log = logging.getLogger(__name__);

__all__ = ['RiskLevel', 'RiskProgramGroup', 'RiskProgramDetail','RiskStatus', 'RiskSection','RiskTeamType','RiskTeam',
           'RiskManagement','RiskResponsible'];

class RiskLevel(DeclarativeBase):
    __tablename__ = 'risk_level';
    risk_level_id = Column(Integer, autoincrement=True, primary_key=True);
    description = Column(String(255), unique=True, nullable=False);
    is_clinical = Column(Integer,   nullable=False,  default=0   );
    is_physical = Column(Integer,   nullable=False,  default=0   );
    effective = Column(   Text, nullable=True);
    def __init__(self):
        self.risk_level_id = None;
        self.description = None;
        self.is_clinical = 0;
        self.is_physical = 0;

    def initData(self):
        self.data = RiskLevel();
        self.data.description = 'A';
        self.data.save();
        
        self.data = RiskLevel();
        self.data.description = 'B';
        self.data.save();
        
        self.data = RiskLevel();
        self.data.description = 'C';
        self.data.save();
        
        self.data = RiskLevel();
        self.data.description = 'D';
        self.data.save();
        
        self.data = RiskLevel();
        self.data.description = 'E';
        self.data.save();
        
        self.data = RiskLevel();
        self.data.description = 'F';
        self.data.save();
        
        self.data = RiskLevel();
        self.data.description = 'G';
        self.data.save();
        
        self.data = RiskLevel();
        self.data.description = 'H';
        self.data.save();
        
        self.data = RiskLevel();
        self.data.description = 'I';
        self.data.save();
        
    def save(self):
        DBSession.add(self); 
        DBSession.flush() ;
    
    def update(self):
        DBSession.update(self);
        
    def remove(self):
        DBSession.delete(self);
        DBSession.flush() ;
        
    @classmethod
    def listAll(cls):
        return DBSession.query(cls).order_by(cls.description).all();
    
    @classmethod
    def listRiskByClinical(cls):
        return DBSession.query(cls).filter(  cls.is_clinical == 1 ).order_by(cls.description).all();
   
    @classmethod
    def listRiskByPhysical(cls):
        return DBSession.query(cls).filter(  cls.is_physical == 1 ).order_by(cls.description).all();
        
        
class RiskProgramGroup(DeclarativeBase):
    __tablename__ = 'risk_program_group';
    risk_program_group_id = Column(Integer, autoincrement=True, primary_key=True);
    description = Column(String(255), unique=True, nullable=False);
    
    def __init__(self):
        self.risk_program_group_id = None;
        self.description = None;

     
        
    def save(self):
        DBSession.add(self); 
        DBSession.flush() ;
    
    def update(self):
        DBSession.update(self);
        
    def remove(self):
        DBSession.delete(self);
        DBSession.flush() ;
    
    @classmethod
    def listAll(cls):
        return DBSession.query(cls).order_by(cls.risk_program_group_id).all(); 
        
class RiskProgramDetail(DeclarativeBase):
    __tablename__ = 'risk_program_detail';
    risk_program_detail_id = Column(Integer, autoincrement=True, primary_key=True);
    description = Column(String(255), unique=True, nullable=False);
    risk_program_group_id = Column(   Integer,ForeignKey('risk_program_group.risk_program_group_id'), nullable=False, index=True) ;
    risk_program_group  = relation('RiskProgramGroup', backref='riskprogramdetail');
    
    def __init__(self):
        self.risk_program_detail_id = None;
        self.risk_program_group_id = None;
        self.description = None;
    
    def initData(self):
        self.riskProgramGroup = RiskProgramGroup();
        self.riskProgramGroup.description = 'โปรแกรมทางคลินิก';
        self.riskProgramGroup.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'ภาวะแทรกซ้อน';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'ความผิดพลาดจากการให้บริการ';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'อื่นๆ';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'IC/ปัจจัยที่ก่อให้เกิดการติดเชื้อ';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'ความคลาดเคลื่อนทางยา';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'ความคลาดเคลื่อนทางเวชระเบียน';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'ระบบ  Hosxp software';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'เครื่องมือเวชภัณฑ์ที่เกิ่ยวกับผู้ป่วย';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.riskProgramGroup = RiskProgramGroup();
        self.riskProgramGroup.description = 'โปรแกรมทางกายภาพ';
        self.riskProgramGroup.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'ESB';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'รักษาความปลอกภัย';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'บุคคล';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'OC, Safety';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'เครื่องมือ อุปกรณ์อื่นๆ';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'สิ่งแวดล้อมและอาคารสถานที่';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'สาธารณูปโภค';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'อัคคีภัย';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'การเงิน';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
        self.data = RiskProgramDetail();
        self.data.description= 'ในชุมชน';
        self.data.risk_program_group_id = self.riskProgramGroup.risk_program_group_id;
        self.data.save();
        
    def save(self):
        DBSession.add(self); 
        DBSession.flush() ;
    
    def update(self):
        DBSession.update(self);
        
    def remove(self):
        DBSession.delete(self);
        DBSession.flush() ;
        
    @classmethod
    def listAllByGroup(cls,group_id):
        return DBSession.query(cls).filter(  cls.risk_program_group_id == str(group_id) ).order_by(cls.risk_program_detail_id).all(); 
        
class RiskStatus(DeclarativeBase):
    __tablename__ = 'risk_status';
    risk_status_id = Column(Integer, autoincrement=True, primary_key=True);
    description = Column(String(255), unique=True, nullable=False);
    
    def __init__(self):
        self.risk_status_id = None;
        self.description = None;
    
    def initData(self):
        self.data = RiskStatus();
        self.data.description = 'รอพิจารณา';
        self.data.save();
        
        self.data = RiskStatus();
        self.data.description = 'รับรายงาน';
        self.data.save();        
        
        self.data = RiskStatus();
        self.data.description = 'นำส่งหน่วยงาน';
        self.data.save();    
        
        self.data = RiskStatus();
        self.data.description = 'แก้ไขและตอบกลับ';
        self.data.save();
        
        self.data = RiskStatus();
        self.data.description = 'สมบูรณ์';
        self.data.save();
    
    def save(self):
        DBSession.add(self); 
        DBSession.flush() ;
    
    def update(self):
        DBSession.update(self);
        
    def remove(self):
        DBSession.delete(self);
        DBSession.flush() ;
        
    @classmethod
    def listAll(cls):
        return DBSession.query(cls).order_by(cls.risk_status_id).all(); 
        
class RiskSection(DeclarativeBase):
    __tablename__ = 'risk_section';
    risk_section_id = Column(Integer, autoincrement=True, primary_key=True);
    description = Column(String(255), unique=True, nullable=False);
    
    def __init__(self):
        self.risk_section_id = None;
        self.description = None;
    
    def initData(self):
        self.value = ['OPD','ER','Ward หญิง', 'Ward ชาย', 'LR', 'OR/Anes', 'เภสัชกรรม+pct round', 'ชันสูตร', 'รังสีวิทยา', 
                      'ทันตกรรม', 'เวชปฎิบัติครอบครัว', 'กายภาพ', 'แพทย์แผยไทย', 'เวชระเบียน', 'Supply', 'ซักฟอก', 'โรงครัว', 
                      'บริหารฯ+การเงิน+ยานฯ+ยาม', 'ประกันสุขภาพ', 'สุขาภิบาลและสิ่งแวดล้อม', 'งานสุขภาพจิต', 'ปชส+ศูนย์ตรวจสุขภาพ', 'การพยาบาลผู้สูงอายุ', 
                      'ส่งเสริมการเรียนรู้', 'โรงผลิตสมุนไพร', 'การพยาบาลเด็ก', 'HHC', 'ENV round', 'audit เวชระเบียน', 'แพทย์/ทบทวน PCT/COPD'];
        for v in self.value:
            self.data = RiskSection();
            self.data.description = v;
            self.data.save();
    
    def save(self):
        DBSession.add(self); 
        DBSession.flush() ;
    
    def update(self):
        DBSession.update(self);
        
    def remove(self):
        DBSession.delete(self);
        DBSession.flush() ;
        
    @classmethod
    def listAll(cls):
        return DBSession.query(cls).order_by(cls.risk_section_id).all();   
class RiskTeamType(DeclarativeBase):
    __tablename__ = 'risk_team_type';
    risk_team_type_id = Column(Integer, autoincrement=True, primary_key=True);
    description = Column(String(255), unique=True, nullable=False);
    
    def __init__(self):
        self.risk_team_type_id = None;
        self.description = None;
        
    def save(self):
        DBSession.add(self); 
        DBSession.flush() ;
    
    def update(self):
        DBSession.update(self);
        
    def remove(self):
        DBSession.delete(self);
        DBSession.flush() ;    
        
class RiskTeam(DeclarativeBase):
    __tablename__ = 'risk_team';
    risk_team_id = Column(Integer, autoincrement=True, primary_key=True);
    description = Column(String(255), unique=True, nullable=False);
    risk_team_type_id = Column(   Integer,ForeignKey('risk_team_type.risk_team_type_id'), nullable=False, index=True) ;
    risk_team_type  = relation('RiskTeamType', backref='riskteam');
    
    def __init__(self):
        self.risk_team_id = None;
        self.description = None;
    
    def initData(self):
        self.value = ['OPD','ER','Ward หญิง', 'Ward ชาย', 'LR', 'OR/Anes', 'เภสัชกรรม', 'ชันสูตร', 'รังสีวิทยา', 
                      'ทันตกรรม', 'เวชปฎิบัติครอบครัว', 'กายภาพ', 'แพทย์แผยไทย', 'เวชระเบียน', 'Supply', 'ซักฟอก', 'โรงครัว', 
                      'บริหารฯ+การเงิน+ยานฯ+ยาม', 'ประกันสุขภาพ', 'สุขาภิบาลและสิ่งแวดล้อม', 'งานสุขภาพจิต', 'ปชส+ศูนย์ตรวจสุขภาพ+IT', 'การพยาบาลผู้สูงอายุ', 
                      'งานส่งเสริมการเรียนรู้', 'โรงผลิตสมุนไพร', 'การพยาบาลเด็ก+ศูนย์เด็ก', 'PCU'];
        
        self.value1 = ['PCT', 'SSD', 'IC', 'ENV', 'HRM', 'NUR', 'IM', 'MED/พยาบาลเวชฯ', 'Ptc', 'ลูกเกิดรอด/สายใยรัก', '5 ส.', 'HHC', 'ศูนย์เครื่องมือแพทย์', 'RM', 'คปสอ.'];
        
        self.teamType = RiskTeamType();
        self.teamType.description = 'หน่วยงาน';
        self.teamType.save();
        
        
        for v in self.value:
            self.data = RiskTeam();
            self.data.description = v;
            self.data.risk_team_type_id =self.teamType.risk_team_type_id; 
            self.data.save();
            
        self.teamType = RiskTeamType();
        self.teamType.description = 'ทีมคร่อม';
        self.teamType.save();
        
        
        for v in self.value1:
            self.data = RiskTeam();
            self.data.description = v;
            self.data.risk_team_type_id =self.teamType.risk_team_type_id; 
            self.data.save();
            
        
    def save(self):
        DBSession.add(self); 
        DBSession.flush() ;
    
    def update(self):
        DBSession.update(self);
        
    def remove(self):
        DBSession.delete(self);
        DBSession.flush() ;    
    
    @classmethod
    def listTeam(cls,team_type=None):
        if(team_type):
            return DBSession.query(cls).filter(  cls.risk_team_type_id == str(team_type)).order_by(cls.risk_team_id).all();
        
        return DBSession.query(cls).order_by(cls.risk_team_id).all();
    
class RiskManagement(DeclarativeBase):
    __tablename__ = 'risk_management';
    risk_management_id = Column(Integer, autoincrement=True, primary_key=True);
    detail = Column(   Text, nullable=False);
    
    risk_level_id  = Column(   Integer,ForeignKey('risk_level.risk_level_id'), nullable=False, index=True) ;
    risk_level   = relation('RiskLevel', backref='riskmanagement');
    
    risk_section_id = Column(   Integer,ForeignKey('risk_section.risk_section_id'), nullable=False, index=True) ;
    risk_section = relation('RiskSection', backref='riskmanagement');
    
    risk_program_detail_id = Column(   Integer,ForeignKey('risk_program_detail.risk_program_detail_id'), nullable=False, index=True) ;
    risk_program_detail = relation('RiskProgramDetail', backref='riskmanagement');
    
    risk_status_id = Column(   Integer,ForeignKey('risk_status.risk_status_id'), nullable=False, index=True) ;
    risk_status = relation('RiskStatus', backref='riskmanagement');
    
    report_date =  Column(DateTime, nullable=False, default=datetime.now);
    create_date =  Column(DateTime, nullable=False, default=datetime.now);
    active =  Column(String(1) , nullable=False,default =1);
    
    def __init__(self):
        self.risk_management_id = None;
        self.detail = None;
        self.risk_level_id = 0;
        self.risk_section_id = 0;
        self.risk_program_detail_id = 0;
        self.risk_status_id = 0;
        self.report_date =  datetime.now();
        self.create_date =  datetime.now();
        self.active = '1';
        
    def save(self):
        DBSession.add(self); 
        DBSession.flush() ;
    
    def update(self):
        DBSession.update(self);
        
    def remove(self):
        DBSession.delete(self);
        DBSession.flush() ;   
    @classmethod
    def getById(cls,id):
        return DBSession.query(cls) .get(str(id)); 
    @classmethod    
    def showRiskManage(cls,startDate, stopDate, riskSection, riskProgramGroup, riskStatus,riskProgramDetail,riskId):
        
        sql =" and  1=1 ";
        if(startDate ):
            sql = sql + "and risk_management.report_date >= '" + startDate + "'";
        if(stopDate):
            sql = sql + "and risk_management.report_date <= '" + stopDate + "'";
        if(riskSection):
            sql = sql + " and risk_management.risk_section_id = "+ riskSection;
        if(riskProgramGroup):
            sql = sql + " and risk_program_group.risk_program_group_id = "+ riskProgramGroup;
        if(riskStatus):
            sql = sql + " and risk_management.risk_status_id = "+ riskStatus;
        if(riskProgramDetail):
            sql = sql + " and risk_management.risk_program_detail_id = "+ riskProgramDetail;
        
        if(riskId):
            sql = sql + " and risk_management.risk_management_id = "+ riskId;
        
        
        sql = text("""select risk_management.risk_management_id,risk_management.detail, risk_management.risk_level_id,risk_management.risk_section_id,
                        risk_management.risk_status_id, risk_management.report_date, risk_management.create_date,
                        risk_level.description as risk_level ,risk_section.description as risk_section, risk_program_detail.description as risk_program_detail,
                        risk_program_group.description as risk_program_group, risk_program_detail.risk_program_detail_id, risk_program_group.risk_program_group_id,risk_status.description as risk_status
                        from risk_management INNER JOIN risk_level on risk_management.risk_level_id = risk_level.risk_level_id
                                INNER JOIN risk_section on risk_management.risk_section_id = risk_section.risk_section_id
                                INNER JOIN risk_program_detail on risk_management.risk_program_detail_id = risk_program_detail.risk_program_detail_id
                                INNER JOIN risk_program_group on risk_program_group.risk_program_group_id = risk_program_detail.risk_program_group_id
                                INNER JOIN risk_status on risk_management.risk_status_id = risk_status.risk_status_id
                        where risk_management.active = 1 """ + sql );
        
        result = DBSession.execute(sql);
        
        list = [];
        for row in result:
            
            section_team = RiskResponsible.getSectionTeamArray('1', row['risk_management_id']);
            crom_team =  RiskResponsible.getSectionTeamArray('2', row['risk_management_id']);
            list.append({ 'risk_management_id':row['risk_management_id'], 
                          'detail' :row['detail'] ,
                           'risk_level_id' :row['risk_level_id'] ,
                          'risk_section_id' :row['risk_section_id'] ,
                          'risk_status_id' :row['risk_status_id'],
                          'risk_program_group_id' : row['risk_program_group_id'],
                          'report_date' :row['report_date'],
                          'create_date' :row['create_date'],
                          'risk_level' :row['risk_level'],
                          'risk_section' :row['risk_section'],
                          'risk_program_detail' :row['risk_program_detail'],  
                          'risk_program_group' :row['risk_program_group'],  
                          'risk_program_detail_id':row['risk_program_detail_id'],
                          'risk_status' :row['risk_status']  ,
                          'crom_team' : crom_team,
                          'section_team' : section_team 
                        });
           
        return list; 
    
    @classmethod    
    def showSumSectionReport(cls,startDate, stopDate):
        sql = "";
        list = [];
        if(startDate and stopDate):
            sql = " and risk_management.report_date BETWEEN '" + startDate + "' and '" + stopDate + "'";
        
        
            sql = text("""select risk_section.description ,COUNT(risk_management.risk_management_id) as count
                            from risk_management LEFT JOIN risk_section on risk_management.risk_section_id = risk_section.risk_section_id
                            where risk_management.active =1
                                """ + sql +"""
                            GROUP BY
                                risk_section.description """);
            result = DBSession.execute(sql);
            
            for row in result:
                list.append({ 'section':row['description'], 'count':row['count']});
            
            return list;
        
    @classmethod
    def showProgramClinicReport(cls,startDate, stopDate,pro_type):
        sql = "";
        list = [];
        if(startDate and stopDate and pro_type):
           
            sql = "and risk_management.report_date BETWEEN '" + startDate + "' and '" + stopDate + "'";
        
            sql = text("""select 
                            risk_program_detail.description,
                        
                            IFNULL(program.A,0) as A,
                            IFNULL(program.B,0) as B,
                            IFNULL(program.C,0) as C,
                            IFNULL(program.D,0) as D,
                            IFNULL(program.E,0) as E,
                            IFNULL(program.F,0) as F,
                            IFNULL(program.G,0) as G,
                            IFNULL(program.H,0) as H,
                            IFNULL(program.I,0) as I
                        FROM
                        risk_program_detail left join (
                        select 
                         risk_program_detail.risk_program_detail_id,
                         risk_program_detail.description ,
                         sum(case when  risk_level.description = 'A' then 1 ELSE 0 end) as A,
                         sum(case when  risk_level.description = 'B' then 1 ELSE 0 end) as B,
                         sum(case when  risk_level.description = 'C' then 1 ELSE 0 end) as C,
                         sum(case when  risk_level.description = 'D' then 1 ELSE 0 end) as D,
                         sum(case when  risk_level.description = 'E' then 1 ELSE 0 end) as E,
                         sum(case when  risk_level.description = 'F' then 1 ELSE 0 end) as F,
                         sum(case when  risk_level.description = 'G' then 1 ELSE 0 end) as G,
                         sum(case when  risk_level.description = 'H' then 1 ELSE 0 end) as H,
                         sum(case when  risk_level.description = 'I' then 1 ELSE 0 end) as I
                        from 
                            -- risk_program_detail LEFT JOIN risk_management on risk_management.risk_program_detail_id = risk_program_detail.risk_program_detail_id
                            risk_management INNER JOIN risk_program_detail on risk_management.risk_program_detail_id = risk_program_detail.risk_program_detail_id
                            LEFT JOIN risk_level on risk_level.risk_level_id = risk_management.risk_level_id
                        where 
                            risk_program_detail.risk_program_group_id = """+str(pro_type) +"""
                            """+ sql+ """
                        GROUP BY
                             risk_program_detail.risk_program_detail_id
                        ) program on risk_program_detail.risk_program_detail_id =  program.risk_program_detail_id
                        where 
                            risk_program_detail.risk_program_group_id = """+str(pro_type) +"""
                        GROUP BY 
                            risk_program_detail.description
                        order by
                            risk_program_detail.risk_program_detail_id
                          """);
            result = DBSession.execute(sql);
            total = 0;
            for row in result:
                total = 0;
                total = row['A'] + row['B']+row['C']+row['D']+row['E']+row['F']+row['G']+row['H']+row['I'];
                list.append({ 'description':row['description'], 'A':row['a'], 'B':row['B'], 'C':row['C'], 
                                        'D':row['D'], 'E':row['E'], 'F':row['F'], 'G':row['G'], 
                                        'G':row['G'], 'H':row['H'] , 'I':row['I'],"total":total});
            
            return list;
        
    @classmethod
    def listRiskPriority10(cls,startDate, stopDate):
        sql = "";
        list = [];
        if(startDate and stopDate):
           
            sql = "and risk_management.report_date BETWEEN '" + startDate + "' and '" + stopDate + "'";
        
            sql = text("""select 
                            risk_management.detail,
                            risk_level.description as level,
                            risk_program_detail.description as pro,
                            risk_section.description as reporter
                        from risk_management 
                            INNER JOIN risk_level on risk_management.risk_level_id = risk_level.risk_level_id
                            INNER JOIN risk_program_detail on risk_management.risk_program_detail_id = risk_program_detail.risk_program_detail_id
                            INNER JOIN risk_section on risk_management.risk_section_id = risk_section.risk_section_id
                        WHERE    
                            risk_management.active = 1
                            """ + sql + """
                        ORDER BY
                            risk_level.description DESC
                        limit 10;

                          """);
            result = DBSession.execute(sql);
            total = 0;
            row_record = 1;
            for row in result:
                list.append({'row':row_record, 'detail':row['detail'], 'level':row['level'], 'pro':row['pro'], 'reporter':row['reporter'] });
                row_record = row_record +1;
            return list;
        
    @classmethod
    def listSectionReport(cls,startDate, stopDate) :
        sql = "";
        list = [];
        if(startDate and stopDate):
           
            sql = "and risk_management.report_date BETWEEN '" + startDate + "' and '" + stopDate + "'";
        
            sql = text("""select 
                            risk_section.description,
                            IFNULL(section_month.month1,0) as month1,
                            IFNULL(section_month.month2,0) as month2,
                            IFNULL(section_month.month3,0) as month3,
                            IFNULL(section_month.month4,0) as month4,
                            IFNULL(section_month.month5,0) as month5,
                            IFNULL(section_month.month6,0) as month6,
                            IFNULL(section_month.month7,0) as month7,
                            IFNULL(section_month.month8,0) as month8,
                            IFNULL(section_month.month9,0) as month9,
                            IFNULL(section_month.month10,0) as month10,
                            IFNULL(section_month.month11,0) as month11,
                            IFNULL(section_month.month12,0) as month12
                        FROM
                            risk_section LEFT JOIN (
                                select
                                    risk_section.risk_section_id as section_id,
                                    sum(case when  MONTH( risk_management.report_date ) = 1 then 1 else 0 end) as month1,
                                    sum(case when  MONTH( risk_management.report_date ) = 2 then 1 else 0 end )as month2,
                                    sum(case when  MONTH( risk_management.report_date ) = 3 then 1 else 0 end) as month3,
                                    sum(case when  MONTH( risk_management.report_date ) = 4 then 1 else 0 end) as month4,
                                    sum(case when  MONTH( risk_management.report_date ) = 5 then 1 else 0 end) as month5,
                                    sum(case when  MONTH( risk_management.report_date ) = 6 then 1 else 0 end) as month6,
                                    sum(case when  MONTH( risk_management.report_date ) = 7 then 1 else 0 end) as month7,
                                    sum(case when  MONTH( risk_management.report_date ) = 8 then 1 else 0 end) as month8,
                                    sum(case when  MONTH( risk_management.report_date ) = 9 then 1 else 0 end) as month9,
                                    sum(case when  MONTH( risk_management.report_date ) = 10 then 1 else 0 end) as month10,
                                    sum(case when  MONTH( risk_management.report_date ) = 11 then 1 else 0 end) as month11,
                                    sum(case when  MONTH( risk_management.report_date ) = 12 then 1 else 0 end) as month12
                                from 
                                    risk_management 
                                    INNER JOIN risk_section on risk_management.risk_section_id = risk_section.risk_section_id
                                WHERE
                                    risk_management.active = 1
                                    """ + sql + """
                                GROUP BY 
                                    risk_section.risk_section_id
                         ) section_month on  risk_section.risk_section_id = section_month.section_id
                        ORDER BY
                            risk_section.risk_section_id


                          """);
            result = DBSession.execute(sql);
            total = 0;
            row_record = 1;
            total =0
            for row in result:
                
                total = row['month1'] + row['month2'] + row['month3'] + row['month4'] +  row['month5'] + row['month6'] + row['month7'] + row['month8']+  row['month9'] + row['month10'] + row['month11'] + row['month12'];
                list.append({'row':row_record, 'description':row['description'], 
                               'month1':row['month1'],'month2':row['month2'],
                               'month3':row['month3'],'month4':row['month4'],
                               'month5':row['month5'],'month6':row['month6'],
                               'month7':row['month7'],'month8':row['month8'],
                               'month9':row['month9'],'month10':row['month10'],
                               'month11':row['month11'],'month12':row['month12'],'total':total});
                row_record = row_record +1;
            return list;
            
    @classmethod
    def listSectionReported(cls,startDate, stopDate) :
        sql = "";
        list = [];
        if(startDate and stopDate):
           
            sql = " risk_responsible.create_date BETWEEN '" + startDate + "' and '" + stopDate + "'";
        
            sql = text("""
                        select 
                            risk_team.risk_team_id,
                            risk_team.description ,
                            sum(case when LENGTH( TRIM( risk_responsible.detail) ) then 1 else 0 end ) as reported,
                            sum(case when LENGTH( TRIM( risk_responsible.detail) ) then 0 else 1 end ) as not_reported
                        
                        from 
                            risk_responsible
                            inner join risk_team on risk_responsible.risk_team_id = risk_team.risk_team_id
                        WHERE    
                                """ + sql + """
                        GROUP BY
                            risk_team.risk_team_id,
                            risk_team.description
                          """);
            result = DBSession.execute(sql);
            total =0;
            for row in result:
                total = row['reported'] + row['not_reported'] ;
                list.append({  'risk_team_id':row['risk_team_id'], 
                               'description':row['description'],'reported':row['reported'],
                               'not_reported':row['not_reported'],'total':total });
                 
            return list;
        
    
from sqlalchemy.ext.declarative import declarative_base 
Base = declarative_base() 
class MyTest (Base):
    __tablename__ = 'my_test';
    __table_args__  = ( saschema.UniqueConstraint("entitytype","key"), {} ) 
    id         = saschema.Column(Integer, primary_key=True)
    key        = saschema.Column(Unicode(16))
    entitytype = saschema.Column(String(32)) 

class RiskResponsible(DeclarativeBase):
    __tablename__ = 'risk_responsible';
    
    risk_responsible_id = Column(Integer, autoincrement=True, primary_key=True);
    detail = Column(   Text, nullable=False);
    
    risk_management_id = Column(   Integer,ForeignKey('risk_management.risk_management_id'), nullable=False, index=True) ;
    risk_management = relation('RiskManagement', backref='riskresponsible');
    
    risk_team_id = Column(   Integer,ForeignKey('risk_team.risk_team_id'), nullable=False, index=True) ;
    risk_team = relation('RiskTeam', backref='riskresponsible');
    
    report_date =  Column(DateTime, nullable=False, default=datetime.now);
    create_date =  Column(DateTime, nullable=False, default=datetime.now);
     
    def __init__(self):
        self.risk_responsible_id = None;
        self.detail = None;
        self.risk_management_id = 0;
        self.risk_team_id = 0;
    
        self.report_date =  datetime.now();
        self.create_date =  datetime.now();
    
        
    def save(self):
        DBSession.add(self); 
        DBSession.flush() ;
    
    def update(self):
        DBSession.update(self);
        
    def remove(self):
        DBSession.delete(self);
        DBSession.flush() ;   
    
    @classmethod
    def getById(cls,id):
        return DBSession.query(cls) .get(id); 
        
    @classmethod
    def saveByTeam(cls,teams=None,risk_management = None):
        
        if(teams is not None and risk_management is not None):
            listteam = teams.split(',');
            for team in listteam:
                response = RiskResponsible.getTeamByTeamTypeAndRiskManage(team,risk_management);
                 
                if(len(response) == 0):
                    riskresponse = RiskResponsible();
                    riskresponse.risk_management_id = risk_management;
                    riskresponse.risk_team_id = team;
                    riskresponse.create_date =  datetime.now();
                    riskresponse.detail = "";
                    riskresponse.save();
        pass;
    
    @classmethod
    def listByTeamsAndRiskManage(cls,listteam=None,risk_management=None):
        
        return DBSession.query(cls).filter(  and_(cls.risk_team_id.in_(listteam), cls.risk_management_id == str(risk_management) )   ).order_by(cls.risk_team_id).all();
    @classmethod
    def getTeamByTeamTypeAndRiskManage(cls,risk_team=None, risk_management=None):
        return DBSession.query(cls).filter(  and_(cls.risk_team_id == str(risk_team), cls.risk_management_id == str(risk_management) )   ).order_by(cls.risk_team_id).all();
        
    @classmethod
    def getSectionTeamArray(cls ,team_type=None, risk_management=None):
        list = [];
        if(team_type is not None and risk_management is not None):
            
            
            sql = "risk_team.risk_team_type_id ="+str(team_type)+" and  risk_responsible.risk_management_id = "+str(risk_management);
        
            sql = text("""select risk_responsible.risk_team_id
                from risk_responsible INNER JOIN risk_team on risk_responsible.risk_team_id = risk_team.risk_team_id
                WHERE """+sql);
        
        
            result = DBSession.execute(sql);
    
        
            for row in result:
                list.append(row['risk_team_id']);
           
        
        return list;
    
    @classmethod
    def updateDetailByTeamAndRisk(cls,team=None,risk_management =None,detail=None):
        
        if(team and risk_management):
            responsed = DBSession.query(cls).filter(  and_(cls.risk_team_id == str(team), cls.risk_management_id == str(risk_management) )   ).order_by(cls.risk_team_id).first();
            responsed.detail = str(detail);
         
        pass;