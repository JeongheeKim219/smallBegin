package com.project.smallbeginjava11.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface IniMapper {
    void insertIni(Map<String, Object> params);
    Map<String, Object> selectDateListCodeOrMonthListCode(Map<String, Object> map);

}
