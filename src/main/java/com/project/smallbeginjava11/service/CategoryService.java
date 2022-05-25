package com.project.smallbeginjava11.service;

import java.util.List;

import com.project.smallbeginjava11.DTO.Category;

public interface CategoryService {
    List<Category> getAllCategory();
    Category selectCategory(String code);
}
