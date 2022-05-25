package com.project.smallbeginjava11.serviceImpl;

import com.project.smallbeginjava11.DTO.Category;
import com.project.smallbeginjava11.mapper.CategoryMapper;
import com.project.smallbeginjava11.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryMapper categoryMapper;

    @Override
    public List<Category> getAllCategory(){
        return categoryMapper.getAllCategory();
    }

    @Override
    public Category selectCategory(String code){
        return categoryMapper.selectCategory(code);
    }
}