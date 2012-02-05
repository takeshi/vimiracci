package vimiracci.controller;

import javax.inject.Inject;
import javax.jdo.annotations.Transactional;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import vimiracci.model.SampleDto;

import com.googlecode.objectify.Objectify;

@RequestMapping("/test")
@Controller
public class TestController {

	@Inject
	Objectify objectify;

	@Transactional
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST)
	public String get(@ModelAttribute SampleDto dto) {
		System.out.println(dto.getFile().getOriginalFilename());
		return "hello";
	}
}
