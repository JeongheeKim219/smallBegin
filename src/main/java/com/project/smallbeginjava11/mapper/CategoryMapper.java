package com.project.smallbeginjava11.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.smallbeginjava11.DTO.Category;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface CategoryMapper {
    List<Category> getAllCategory();
    Category selectCategory(String code);
}
